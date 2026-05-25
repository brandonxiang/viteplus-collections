# Template Contract

Use this contract when adding or changing a starter. The catalog should stay predictable for beginners and easy to verify for maintainers.

## Required Files

Every directory under `templates/` must include:

- `package.json`
- `pnpm-lock.yaml`
- `README.md`
- `AGENTS.md`
- `tsconfig.json`
- `vite.config.ts`

The template name in `package.json` must match the directory name and the root `createConfig.templates[*].name` entry. Each template must also define a `packageManager` field pinned to a `pnpm@x.y.z` version so generated installs are reproducible.

## Required Scripts

Every template must expose these scripts:

| Script    | Requirement                                                                      |
| --------- | -------------------------------------------------------------------------------- |
| `dev`     | Starts the template in development mode through Vite+ or a Vite+-managed command |
| `build`   | Produces production output through Vite+ or the template's Vite+ build pipeline  |
| `check`   | Runs `vp check`                                                                  |
| `test`    | Runs `vp test` or `vp test run`                                                  |
| `prepare` | Runs `vp config`                                                                 |

If a README documents `vp run <script>`, that `<script>` must exist in the same template's `package.json`.

## README Requirements

Every template README must include:

- The direct create command: `vp create @brandonxiang:<template-name> my-app`
- `vp install`
- The template's build command, such as `vp build`, `vp run build`, or `vp exec react-router build`
- `vp check`
- `vp test`
- A link to the shared starter recipes: <https://github.com/brandonxiang/viteplus-collections/blob/main/docs/recipes.md>

Generated projects do not include the catalog root docs, so template README files should use the GitHub URL for shared recipes.

## Validation

Run these commands before publishing or opening a PR:

```bash
vp install
vp check
vp test
vp pm pack
```

GitHub Actions runs this catalog gate on pull requests and pushes to `main`.

`vp test` verifies the catalog manifest, template directory contract, lockfiles, package manager pins, required scripts, template-level test files, README first-run commands, README build commands, README recipe links, and README `vp run <script>` references.

For release-specific preflight and post-publish checks, use the [release checklist](./release-checklist.md).

For prioritizing new starters, recipes, and smoke checks, use the [ecosystem roadmap](./ecosystem-roadmap.md).

## When to Add a Template

Prefer a recipe before a template. Add a new template only when users need to copy multiple files or make repeated cross-cutting changes to reach a common starting point.

Good candidates:

- Authenticated Ant Design admin shell with permission routes and CRUD examples
- Fastify API starter with a chosen database layer and migration workflow
- Deployment-specific starter when the runtime layout is materially different

Weak candidates:

- A single page variant
- A different color theme
- A route or endpoint that fits in `docs/recipes.md`
