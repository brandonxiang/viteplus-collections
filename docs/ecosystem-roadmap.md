# Ecosystem Roadmap

This roadmap turns the starter catalog into a small ecosystem. Prioritize work that makes a beginner's generated project easier to trust, extend, and ship.

## P0: Reliability Before More Templates

Do these before adding another starter:

| Item                       | Why it matters                                                 | Evidence of done                                                             |
| -------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Catalog contract tests     | Prevent manifest, README, and package script drift             | `vp test` fails when a template breaks the contract                          |
| Release checklist          | Keeps published packages and scaffold paths verifiable         | `docs/release-checklist.md` exists and is followed before publish            |
| Template-level spot checks | Proves changed templates still install, check, test, and build | Changed template runs `vp install`, `vp check`, `vp test`, and build command |
| Shared recipes             | Gives beginners copyable first extensions                      | `docs/recipes.md` covers Ant Design, mobile, and Fastify paths               |

## P1: Highest-Value Starter Additions

Add these when the current starters are stable:

| Addition                   | Shape                                                                                                     | Why                                                                              |
| -------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `viteplus-antd-pro`        | Ant Design admin shell with auth layout, permission routes, CRUD list/detail/edit examples, and mock data | Most beginners building Ant Design dashboards need the same app shell decisions  |
| `viteplus-fastify-prisma`  | Fastify API starter with Prisma, migrations, seed data, and typed repository examples                     | Gives database-first users a clearer path than the current optional Knex helpers |
| OpenAPI contract snapshots | Fastify tests that snapshot generated OpenAPI output                                                      | Catches API schema drift before docs and clients diverge                         |
| Browser smoke checks       | Lightweight Playwright checks for home page, route navigation, and Fastify health/docs links              | Proves generated apps render, not just type-check                                |

## P2: Shipping and Adoption

Add these after P1 has at least one stable starter:

| Addition               | Shape                                                                 | Why                                                                    |
| ---------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Deployment recipes     | Docker, PM2, systemd, and static hosting notes where relevant         | Helps beginners move from local starter to a running service           |
| Template screenshots   | Small images in root README and template README files                 | Makes the template picker easier to understand before scaffolding      |
| Example generated apps | Checked-in or linked smoke projects created from the package          | Provides confidence that published templates actually scaffold cleanly |
| Migration notes        | Notes for Vite+, Ant Design, React Router, and Fastify major upgrades | Keeps the ecosystem maintainable as dependencies move                  |

## Decision Rules

Use these rules when deciding whether to add something:

- Prefer a recipe when the change is one page, one route, one endpoint, or one deployment command.
- Prefer a new template when users must copy several files or make cross-cutting app structure decisions.
- Prefer a test when the issue is drift, breakage, or repeated release mistakes.
- Prefer docs when the issue is choosing, sequencing, or understanding tradeoffs.

## Current Recommendation

The next best technical investment is browser smoke checks for the existing templates. The next best product investment is `viteplus-antd-pro`, because it turns the Ant Design starter from a shell into a recognizable admin application path.
