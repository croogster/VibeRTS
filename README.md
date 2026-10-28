# VibeRTS

Independent browser RTS learning project. **EA has not endorsed and does not support this product.**

## Current status: scaffold, not a playable game

The goal is a browser-based, base-building real-time strategy game with resource
gathering, unit production, tactical combat, and resumable single-player matches.
Classic RTS games, including Command & Conquer: Generals – Zero Hour, are design
references, not a promise of a complete remake or permission to reuse their assets.

Earlier descriptions of finished gameplay were premature. The repository currently
contains:

| Area | Actual state |
| --- | --- |
| Browser application | A development-status page; no battlefield or game menu |
| Game models | TypeScript interfaces for entities, orders, maps, players, and saves |
| Reference data | Three faction drafts, twelve commander drafts, damage/armor and veterancy tables |
| Automated tests | Data integrity and faction-filtering tests, not gameplay tests |
| Movement, collision, combat, construction, economy, AI | Not implemented |
| Saving progress, loading matches, campaign | Types only; no storage or playable content |
| Multiplayer | No protocol, lobby, match server, or backend |
| Art, audio, maps, branding | No game asset pack; existing names and references need a rights/originality review |

**There is no game progress to save yet.** A `SaveGameSnapshot` interface is not a
save/load implementation. Successful tests and builds do not mean the game is
complete, balanced, optimized, or ready for public release.

See [the assessment and roadmap](docs/DEVELOPMENT.md) for priorities, multiplayer
architecture, testing milestones, asset licensing, and a student-friendly learning plan.

## Requirements

- **Node.js 24.x** and its bundled npm. `.nvmrc` records the intended Node major.
- A current browser with JavaScript enabled.
- A trusted local checkout of this repository.

Run commands from the folder containing `package.json`. These commands work in
Windows PowerShell as well as common macOS/Linux shells:

```sh
node --version
npm --version
npm ci
npm run start
```

Open **http://127.0.0.1:5173/**. You should see “Scaffold only · Not yet playable”
and a loaded reference-data summary. `npm run dev` is an alias for the same
development server. Stop it with **Ctrl+C** before starting another instance.

The development and preview servers bind to `127.0.0.1`, not your LAN. Their ports
are strict: a port conflict produces an error instead of silently selecting a
different URL. Stop your own earlier server or explicitly choose another port:

```sh
npm run start -- --port 5174
```

Do not use `--host 0.0.0.0`, router port forwarding, or a public tunnel for routine
testing. These developer servers are not a production multiplayer service.

## How to test safely

Use a feature branch or disposable local checkout, run as a normal user rather than
an administrator, and do not connect production accounts, credentials, or data.
Only install dependencies and run scripts from code you trust; an npm audit is
not a sandbox or a guarantee that code is safe.

```sh
npm ci
npm run check
```

`check` runs the real test suite, TypeScript checking plus the production build,
and a full dependency audit that fails on moderate-or-higher advisories. Audit
requires access to the npm registry. A registry/network failure is not a clean
security result.

Individual checks:

| Command | Purpose |
| --- | --- |
| `npm run test` | Run Vitest once; missing or failing tests are errors |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm run build` | Type-check and build static files into `dist/` |
| `npm audit` | Inspect all installed dependencies, including development tools |
| `npm run preview` | Serve the last production build locally at http://127.0.0.1:4173/ |

To inspect the production output:

```sh
npm run build
npm run preview
```

In a browser, check that:

1. The status page loads and explicitly says it is not playable.
2. The data summary reports 3 draft factions, 12 draft commander profiles, and
   77 damage/armor values.
3. Refreshing works and the browser console has no application errors.
4. Text remains readable at a narrow window width and at 200% zoom.

These are **scaffold smoke checks**. Movement, combat, save/load, and multiplayer
cannot be meaningfully tested until those systems exist. Future test requirements
are listed in [the development guide](docs/DEVELOPMENT.md#testing-and-performance).

Do not blindly run `npm audit fix --force`: review proposed version changes,
update the lockfile intentionally, and rerun tests and the build. Never commit
secrets. `.env` files are ignored, but anything exposed through a browser bundle
(including `VITE_*` variables) must be treated as public.

## Deploying the current browser preview

**This deploys a status page, not a multiplayer game.** Keep staging private until
the existing franchise references and your intended branding have been reviewed.
No public deployment or hosting account is created by the project scripts.

### 1. Validate locally

```sh
npm ci
npm run check
npm run preview
```

Inspect http://127.0.0.1:4173/ and stop the preview server with Ctrl+C. The deployable
artifact is the **contents of `dist/`**, not the repository or `node_modules/`.

### 2. Choose static hosting

For a manual deployment, use an HTTPS static host's directory-upload feature,
such as Netlify's manual deploy, and select `dist/`. This uploads the compiled
site; review it before making it public.

For a Git-connected host such as Netlify or Cloudflare Pages:

1. Review the code and asset rights before publishing, and push only to the
   repository/branch you intend to share.
2. Connect that repository to your hosting provider after reviewing its access.
3. Set the project root to the directory containing `package.json`.
4. Select **Node 24.x** in the build environment.
5. Set the build command to **`npm run check`** and output directory to **`dist`**.
   Ensure the host installs development dependencies using the committed lockfile
   (`npm ci`), since the compiler and bundler are development dependencies.
6. Do not add server secrets or API keys to the browser build.

`base: './'` makes the emitted asset URLs relative, including for a static
subdirectory deployment. GitHub Pages is also suitable for this static preview:
build with Node 24 in a Pages workflow and upload `dist/` as the Pages artifact.
No Pages workflow is included yet.

### 3. Verify and retain a rollback

- Check HTTPS, refresh, asset requests, and the data summary at the deployed URL.
- Test at the actual subdirectory URL if your host uses one.
- Keep the previous successful build/deployment available for rollback.
- Do not run `vite` or `vite preview` as your production web server.

Static hosting does **not** provide cloud saves, accounts, matchmaking, or a game
server. A future multiplayer backend needs separate hosting for long-lived
connections, server-side validation, persistence, monitoring, and backups.

## Project layout

```text
index.html               Browser entry point and honest project-status page
src/main.ts              Loads and summarizes draft reference data
src/style.css            Status-page styling
src/core/types.ts        Proposed simulation and save-state models
src/data/factions.ts     Draft commander and combat modifier tables
tests/factions.test.ts   Tests for the existing data and filtering function
vite.config.ts           Local-only servers and static-build settings
docs/DEVELOPMENT.md       Assessment, roadmap, SDLC, multiplayer, and rights notes
```

## Branding and licenses

The project name is a working title. Existing draft commander names, faction
references, and the package identifier are not a cleared original brand. No
license for franchise assets or trademarks is included, and no project-wide
open-source license has been selected.

For an independent release, prefer your own factions, characters, logo, maps,
art, music, and voices, or assets with explicitly compatible licenses. If you
intend to use the original game's resources instead, review
[EA's content policy](https://help.ea.com/en/articles/security-and-rules/ea-content-policy/)
and the separate
[C&C modding guidelines](https://www.ea.com/games/command-and-conquer/news/modding-faq).
A disclaimer, educational purpose, or free download alone is not permission for
a standalone browser remake. See the development guide before importing assets.
