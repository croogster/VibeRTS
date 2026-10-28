# VibeRTS development assessment and roadmap

This is a planning and engineering guide, not a claim that the systems below
already exist. The first target should be a small, original, playable RTS, not
every unit and special case in a commercial game's expansion.

## Findings from troubleshooting

| Priority | Finding | Resolution or next action |
| --- | --- | --- |
| P0 | The production build failed because `index.html` did not exist. | Added a real entry point and a status page, explicitly not gameplay. |
| P0 | `npm run test` failed because there were no test files. | Added tests of the existing faction filtering, numeric tables, and data consistency. No empty-suite bypass. |
| P0 | The installed development dependency tree had six audit findings, including high and critical findings. | Replaced the old Vite/Vitest toolchain with compatible current versions and regenerated the lockfile. Re-audit regularly; a clean audit is time-specific. |
| P1 | Vite was configured with `host: true`, exposing the developer server to network interfaces. | Default development and preview servers now bind to loopback and use strict ports. |
| P1 | Interfaces and descriptive text were being mistaken for working game systems. | README and browser page distinguish reference data from executable behavior. |
| P1 | No simulation, unit/building registry, maps, renderer, input system, save service, or backend exists. | Build the first playable milestone below before adding more roster entries. |
| P1 | Franchise references and asset rights are unresolved. | Choose independent original content or a properly evaluated mod/licensing route before public release. |
| P2 | Git originally tracked only the one-line README; the initial scaffold files were untracked. | Review the complete change, stage intended files, and make a foundation commit. Nothing here automatically commits or pushes. |

There is no actual combat or pathfinding implementation to profile or debug yet.
The data tests cannot establish gameplay balance, feature completeness, network
security, or any supported unit-count/performance claim.

### Verification performed

- On Windows with Node 24.15.0 and npm 11.12.1, a clean `npm ci` followed by
  `npm run check` passed: 34 data tests, TypeScript plus the Vite production build,
  and an audit reporting zero known vulnerabilities at the time of the check.
- `npm run start` successfully launched the loopback development server.
- Ad hoc Playwright checks using installed Microsoft Edge exercised development
  and production preview servers through Vite's APIs on temporary loopback ports.
  Both returned HTTP 200, executed the data-summary module, reloaded successfully,
  and reported no uncaught application page errors. Desktop (1280 px) and narrow
  (390 px) layouts had no horizontal overflow; screenshots were inspected.
- Local documentation file links and `git diff --check` were checked.

The browser harness was temporary test tooling, not a committed end-to-end suite
or CI workflow. No public hosting deployment, gameplay test, multiplayer test,
save/resume test, performance benchmark, full accessibility audit, or asset-rights
approval was performed. Those require the corresponding systems and release work.

### Model and data issues to address when implementing

- **Unresolved identifiers:** commander modifiers and starting upgrades refer to
  blueprint IDs with no blueprint registry behind them. Once that registry exists,
  validate every reference, prerequisite, producer, and upgrade; reject cycles in
  tech prerequisites.
- **Descriptions are not executable rules:** for example, the Air Force draft
  describes a flat 20% aircraft discount, but its Aurora and Chinook multipliers
  are `0.82` and `0.85`. Its Raptor health multiplier is `1.25`, while the description
  refers to 20% armor. Decide which values are intended; generate descriptions
  from data where practical rather than maintaining competing sources of truth.
- **Some promises have no modeled rule:** the superweapon draft describes faster
  charging, but `GeneralDefinition` has no charge-time multiplier. Do not implement
  these through scattered commander-name conditionals. Model a rule when the
  corresponding system is built.
- **Entity state is very broad:** every entity currently carries aircraft,
  builder, transport, and faction-specific fields. Start with a small shared core
  and role-specific state as needed. Do not introduce a full ECS just to rename
  fields; refactor against actual simulation requirements.
- **TypeScript is not runtime validation:** external commands, saves, maps, and
  mod data need parsing, bounds, size limits, and reference checks.
- **The save type is incomplete for exact resumption:** it lacks an explicit
  simulation tick, seeded random-generator state, pending command state, AI
  planner state, and a rules/content version. Decide what must be persisted
  versus deterministically rebuilt, and prove equivalent continuation in tests.

## Milestones with exit criteria

Build one end-to-end playable slice before breadth. Both opponents can initially
use the same tiny roster; multiple asymmetric factions are not required to
validate the core game.

| Milestone | Scope | Exit criterion |
| --- | --- | --- |
| 0. Reproducible foundation | Local start, production build, tests, documented setup | A fresh Node 24 checkout installs with `npm ci`, passes `npm run check`, and displays the preview honestly. |
| 1. Controllable battlefield | One map, camera, selection, movement commands, static obstacles | A player can select a group and move it around obstacles without crossing blocked terrain or becoming permanently overlapped. |
| 2. Complete small match | One resource, builder, two combat units, a few buildings, economy, production, damage, simple AI, victory/defeat | A new player can finish a short match without developer-console intervention. |
| 3. Reliable saves | Versioned serializer, validation, IndexedDB storage, export/import, migrations | Save during construction and combat; reload and continue correctly. Corrupt or unsupported saves do not overwrite a known-good save. |
| 4. Measured single-player alpha | Fog of war, improved AI, original UI/assets, accessibility, stress scenarios | Pass defined correctness and performance budgets on recorded target devices; fix severe playtest issues. |
| 5. Two-player private alpha | Authoritative match server, simple lobby, commands, reconnects, filtered snapshots | Two separate browsers complete a match through latency/disconnect tests; invalid or unauthorized commands are rejected. |
| 6. Public service candidate | Hosting, identity, monitoring, backups, privacy/moderation, deployment and rollback | Load, security, restore, rights, and operating-cost reviews pass before public access. |

Keep aircraft, heroes, tunnels, superweapons, campaign scripting, and twelve
generals outside the first playable milestone. Each multiplies movement,
targeting, UI, save, AI, networking, balance, and test cases.

## Architecture to preserve the multiplayer option

### Separate simulation from presentation now

- Put game rules in a headless module with no DOM, Canvas, Web Audio, or wall-clock
  calls. Rendering reads state; it must not determine damage or resource income.
- Use a fixed simulation step. A starting design of 20 ticks/second gives a 50 ms
  tick budget; measure and revise it. Render independently with
  `requestAnimationFrame` and interpolate visual motion.
- Route player and AI intent through the same command API. A command expresses
  “move these owned units here,” not “set this unit's coordinates” or “grant money.”
- Use a seeded random source and stable iteration/order rules to make tests and
  replays reproducible. Fixed ticks alone do not guarantee cross-platform
  determinism.
- Keep blueprint data separate from live entity state. Keep presentation state
  such as camera position separate from authoritative match state.

### Recommended first network model: authoritative server

Clients submit commands. The server validates them, owns the world, simulates
matches, and sends each player the state they are permitted to see. Clients render
that state; they do not decide damage, cash, production, or match results.

| Approach | Benefit | Cost / risk |
| --- | --- | --- |
| Authoritative simulation with snapshots | One trusted outcome; can withhold fog-hidden state; easier browser/server debugging | Server CPU and bandwidth per match; interpolation and reconnect work |
| Deterministic lockstep | Command traffic can be small for large armies | Strict determinism, desync tooling, slow-player handling, and hidden-information exposure on clients |

Recommend the first approach for this project's initial multiplayer version.
Lockstep is a valid later architectural choice, not an optimization to bolt on
after unrelated client-only rules have spread through the renderer.

### Minimum multiplayer safety and operation requirements

1. Version the protocol. Parse a bounded schema for each message and cap message
   sizes, command frequency, units per command, queues, match size, and unit count.
2. Authenticate players and bind their identity to a match/slot server-side.
   Validate ownership, resources, prerequisites, legal targets, coordinates, and
   command sequence numbers. Reject duplicate/replayed or stale commands.
3. Send visibility-filtered snapshots. Hiding enemy objects only in the UI is not
   fog-of-war security if the browser already receives their positions.
4. Use HTTPS/WSS, explicit origin policy, token expiry, and authorization on every
   match action. An origin check is not a replacement for authentication.
5. Treat client saves as untrusted. Ranked outcomes and account progression must
   come from server-owned state and idempotent, validated result writes.
6. Design disconnect/rejoin: reconnect token, command acknowledgements, current
   authoritative snapshot, timeout policy, and a defined response to server loss.
7. Bound outgoing buffers and handle slow consumers. Superseded snapshots may be
   replaceable; silently losing accepted player commands is not acceptable.
8. Track active matches, tick time, event-loop lag, memory, bandwidth, disconnects,
   errors, and cost per match. Avoid secrets, private chat, and unnecessary personal
   data in logs.
9. Separate static client hosting from the long-lived match service. Start with
   one match host rather than microservices. Add durable account/result storage
   when required, with backups and a tested restore procedure.
10. Plan graceful deployment: stop allocating matches to draining hosts, let
    matches finish or checkpoint, and retain a compatible client/server build for
    rollback. A static site's rollback alone cannot fix an incompatible protocol.

WebSockets are a reasonable first transport, but a socket library does not supply
these rules. Autoscaling and a large account system should follow a working
two-player match, not precede it.

## Saving progress correctly

Separate **match saves** from **career progress**. The first resumes world state;
the second records completed missions, settings, or unlocks.

- Prefer IndexedDB for potentially large browser saves; keep small settings
  separate. Handle quota errors and unavailable storage explicitly.
- Browser storage is tied to the origin and browser profile. Clearing site data,
  private browsing, or changing domain can lose access to saves. Offer export and
  import before promising durable progress; local storage is not cloud backup.
- Store schema version, game/rules/content version, tick, random state, and all
  required simulation state. Rebuild only caches that are safe to reconstruct.
- Parse and validate imports before applying them. Limit file size, entity counts,
  numeric ranges, duplicate IDs, dangling references, and unsupported versions.
- Write through transactions and retain a known-good checkpoint. Test failed
  writes and migration failures rather than just the happy path.
- Test that “save, load, then advance N ticks” matches “advance N ticks without
  reloading” for the same commands and random state.

No persistence code is implemented in the scaffold yet.

## Testing and performance

The current suite checks existing reference data only. Add tests with each system:

| Level | Examples |
| --- | --- |
| Unit | Damage/armor math, cooldowns, ownership, spending, placement, prerequisite rules, target filtering |
| Simulation integration | Harvest-return loop; production and refunds; combat/death cleanup; blocked paths; destroyed targets; save/resume during active orders |
| Browser end-to-end | Start match, select/order/build, complete match, reload a save, keyboard controls, resize and zoom |
| Multiplayer integration | Two clients, unauthorized ownership, malformed/oversized/duplicate commands, reconnect, stale snapshots, match isolation |
| Performance / soak | Crowded chokepoints, large battles, repeated path requests, long sessions, save size, memory growth, slow consumers |
| Release smoke | Fresh install, deployed assets/subpaths, browser console, HTTPS/WSS, schema compatibility, rollback and backup restore |

Define a reproducible benchmark before calling anything “optimized”: map, units,
orders, seed, duration, hardware, browser, and build version. An initial candidate
is 200 ground units on one map for 30 minutes, with p95 simulation ticks below
50 ms at 20 Hz. This is a proposed budget, **not a measured supported capacity**.
Set a separate rendering target, such as a 16.7 ms frame budget for 60 fps on a
specified baseline device; low-end devices may need another target.

Profile before rewriting architecture. Likely RTS hotspots include:

- All-pairs targeting/collision: use a spatial index when measurements justify it.
- Pathfinding bursts: bound work per tick, cache where valid, and consider shared
  paths/flow fields for large groups.
- Navigation correctness: distinguish static blocked terrain, building footprints,
  dynamic occupancy, and local avoidance. A* alone does not solve unit separation.
- Allocation/rendering churn: avoid avoidable per-frame allocations, batch drawing,
  and cull off-screen work only where correctness permits.

Do not use average FPS as the only metric. Tail latency, stalled orders, stuck
units, visibility correctness, and steadily growing memory matter too.

## Practical SDLC for a small student project

1. **Discover and scope:** write a one-page design brief: intended player, core
   loop, controls, target device, art direction, and explicit non-goals.
2. **Plan:** maintain a small issue board: backlog, ready, doing, review, done.
   Limit work in progress. Each issue needs observable acceptance criteria and
   a test plan, not just “add combat.”
3. **Design:** record important choices in short architecture decision records:
   options, chosen rule, reason, and consequences. Start with simulation ownership,
   save compatibility, network authority, and content rights.
4. **Implement:** use short-lived feature branches and focused commits. Review
   generated/AI-written code as code you own; be able to explain its state changes.
5. **Verify:** require tests and build checks before merging. Add a CI workflow for
   `npm ci` and `npm run check` on Node 24; include Windows and Linux as the project
   grows. CI and browser automation are not configured in this scaffold yet.
6. **Playtest:** watch someone use the game without coaching. Record confusion,
   stuck paths, pacing, and feedback before expanding the roster.
7. **Release:** use private staging, a release checklist, tagged versions, compatible
   saves/protocols, asset credits, a known rollback, and a fixed hosting budget.
8. **Maintain:** triage defects, review dependencies, measure regressions, test
   backups, and revise the roadmap from evidence rather than feature count.

Definition of done for a gameplay feature: acceptance criteria met, tests added,
real browser behavior checked, save/network implications handled, performance
within budget, controls documented, and no unlicensed content introduced.

### Suggested introductory commit message

```text
chore: establish VibeRTS development foundation

- scaffold the browser project with TypeScript and Vite
- add draft RTS state models and faction reference data
- add a clearly labeled non-playable development preview
- test reference data and filtering with Vitest
- update development tooling and default servers to loopback
- document safe checks, static deployment, and the development roadmap

Gameplay, save/load, AI, and multiplayer are not implemented yet.
```

This describes the initial foundation, not a finished game. Review staged files
and the lockfile before committing. No commit, push, merge, or deployment is
performed just by documenting this message.

## Original branding, assets, and licensing

Choose the product route early:

- **Recommended for an independent portfolio/release:** original factions,
  characters, names, maps, UI/art direction, music, voices, and logo; use
  appropriately licensed third-party resources only with recorded provenance.
- **If the goal is an actual C&C mod:** evaluate EA's specific modding guidelines,
  the relevant source licenses, distribution requirements, and all other rights.
  Do not assume a standalone browser remake qualifies as an allowed mod.

EA's [general content policy](https://help.ea.com/en/articles/security-and-rules/ea-content-policy/)
restricts fan games and branding reuse. The separate
[C&C modding guidelines](https://www.ea.com/games/command-and-conquer/news/modding-faq)
provide a limited, revocable, non-commercial permission for qualifying mods,
require notices, and prohibit including C&C music files. A free or educational
project is not automatically exempt.

EA also publishes the
[Generals / Zero Hour source repository](https://github.com/electronicarts/CnC_Generals_Zero_Hour)
under GPL v3 with additional terms. It is useful to study, but that source release
is not a blanket license to redistribute the original game's artwork, audio,
trademarks, or third-party SDKs. Inspect the exact license before copying or
porting code; derivative-code obligations can affect your licensing choices.
Obtain qualified legal advice for an intended release when the scope is unclear.

Maintain an asset ledger before importing content:

| File / asset | Creator and source URL | License and version | Allowed use / modifications | Required credit | Proof retained | Release status |
| --- | --- | --- | --- | --- | --- | --- |
| Example only; no asset approved | Record creator and exact page | Record actual terms, not “free” | Check commercial use and derivatives | Copy required wording | Keep receipt/permission/license | Pending review |

“Found online,” owning the original game, adding a disclaimer, and crediting an
artist are not substitutes for permission. Check individual asset terms even on
asset-library sites. Avoid non-commercial-only assets if commercial release is a
future possibility. Choose a license for your own code separately from art/audio;
none has been selected for this project.

## Finding a game-development niche

Treat this project as a way to sample roles, not a requirement to master them all:

| Direction | Small demonstrable portfolio result |
| --- | --- |
| Gameplay / simulation engineering | A complete small match with understandable movement and combat rules, plus repeatable tests |
| Backend / networking | A two-browser authoritative match with command validation and tested reconnects |
| Tools / technical design | A map or unit-data editor with schema validation and a designer-friendly workflow |
| QA / performance engineering | Reproducible bug reports, stress scenarios, profiles, and measured before/after improvements |
| Production / design | A scoped milestone plan, observed playtest findings, and a shipped playable loop |

Start with gameplay/simulation plus basic testing. After the small match works,
try one networking task and one tooling or profiling task, then choose what you
enjoyed enough to go deeper. Keep a short devlog: problem, alternatives, decision,
test evidence, and what you learned.

A small original game that reliably starts, finishes, and resumes is a stronger
graduating portfolio piece than a large roster of unimplemented features.
