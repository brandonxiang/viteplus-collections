<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.

## Starter Extension Notes

- Use the template README for the first-run workflow.
- Use the shared starter recipes for copyable page and API examples: https://github.com/brandonxiang/viteplus-collections/blob/main/docs/recipes.md
- If setup, install, dev, test, or build fails, use the shared troubleshooting guide: https://github.com/brandonxiang/viteplus-collections/blob/main/docs/troubleshooting.md
- Keep generated project changes aligned with Vite+ commands: `vp install`, `vp check`, `vp test`, and the documented build command.

<!--VITE PLUS END-->
