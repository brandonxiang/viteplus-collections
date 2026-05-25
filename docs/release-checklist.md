# Release Checklist

Use this checklist before publishing `@brandonxiang/create`. It verifies both the catalog package and the starter experience a beginner will receive.

## Before Publishing

1. Install workspace dependencies:

   ```bash
   vp install
   ```

2. Run the catalog quality gate:

   ```bash
   vp check
   vp test
   ```

3. Confirm GitHub Actions passes for the branch or pull request. The workflow runs:

   ```bash
   vp install
   vp check
   vp test
   vp pm pack
   ```

4. Pack the package and inspect the output:

   ```bash
   vp pm pack
   ```

   Confirm the tarball contents include:
   - `README.md`
   - `assets/`
   - `docs/`
   - `templates/`
   - `package.json` with `createConfig.templates`

5. Delete the local tarball after inspection if you are not publishing from it.

## Template Spot Checks

When a template implementation changes, run its own checks from that template directory:

```bash
cd templates/viteplus-antd
vp install
vp check
vp test
vp build
```

Use the same pattern for the changed template. For `viteplus-fastify`, use the documented Fastify commands when checking dev or production runtime behavior:

```bash
vp run dev
vp run build
vp run start
```

## After Publishing

Verify the published catalog manifest:

```bash
vp create @brandonxiang --no-interactive
```

Then scaffold one direct template path that changed:

```bash
vp create @brandonxiang:viteplus-antd my-admin-smoke
cd my-admin-smoke
vp install
vp check
vp test
```

If the changed template is a server or SSR starter, also run its documented build command.

## Failure Policy

Do not publish if any of these checks fail:

- `vp check`
- `vp test`
- `vp pm pack`
- GitHub Actions catalog CI
- A changed template's own `vp check`, `vp test`, or build command
- Published manifest verification through `vp create @brandonxiang --no-interactive`

Fix the template, README, or catalog manifest first. The starter catalog is only useful if the generated first-run path is reliable.
