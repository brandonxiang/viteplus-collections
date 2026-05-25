import { describe, expect, it } from 'vite-plus/test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

type TemplateEntry = {
  name: string;
  description: string;
  template: string;
};

type CatalogPackage = {
  name: string;
  description: string;
  files: string[];
  keywords: string[];
  homepage: string;
  bugs: {
    url: string;
  };
  repository: {
    type: string;
    url: string;
  };
  createConfig: {
    templates: TemplateEntry[];
  };
};

type TemplatePackage = {
  name: string;
  packageManager: string;
  scripts: Record<string, string>;
};

const rootDir = process.cwd();

const readJson = <T>(filePath: string): T => JSON.parse(readFileSync(filePath, 'utf8')) as T;

const extractDocumentedVpRunScripts = (readme: string) =>
  Array.from(readme.matchAll(/\bvp run ([\w:-]+)/g), (match) => match[1]);

const listFiles = (dirPath: string): string[] =>
  readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'build') {
      return [];
    }

    const entryPath = path.join(dirPath, entry.name);

    return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
  });

const testFilePattern = /\.(test|spec)\.(ts|tsx)$/;
const markdownLinkPattern = /(?<!!)\[[^\]]+\]\(([^)]+)\)/g;

const isExternalOrSpecialLink = (href: string) =>
  /^(https?:|mailto:|#)/.test(href) || href.includes('<') || href.includes('>');

const stripAnchor = (href: string) => href.split('#')[0];

describe('template catalog', () => {
  const rootPackage = readJson<CatalogPackage>(path.join(rootDir, 'package.json'));
  const templateEntries = rootPackage.createConfig.templates;

  it('publishes discoverable package metadata', () => {
    expect(rootPackage.name).toBe('@brandonxiang/create');
    expect(rootPackage.description).toContain('Vite+ template catalog');
    expect(rootPackage.keywords).toEqual(
      expect.arrayContaining(['vite-plus', 'template', 'react', 'antd', 'fastify']),
    );
    expect(rootPackage.homepage).toBe(
      'https://github.com/brandonxiang/viteplus-collections#readme',
    );
    expect(rootPackage.bugs.url).toBe(
      'https://github.com/brandonxiang/viteplus-collections/issues',
    );
    expect(rootPackage.repository).toEqual({
      type: 'git',
      url: 'git+https://github.com/brandonxiang/viteplus-collections.git',
    });
  });

  it('publishes the catalog assets, docs, and templates', () => {
    expect(rootPackage.files).toEqual(
      expect.arrayContaining(['assets', 'docs', 'README.md', 'templates']),
    );
    expect(existsSync(path.join(rootDir, 'docs', 'README.md'))).toBe(true);
    expect(existsSync(path.join(rootDir, 'docs', 'starter-playbook.md'))).toBe(true);
    expect(existsSync(path.join(rootDir, 'docs', 'recipes.md'))).toBe(true);
    expect(existsSync(path.join(rootDir, 'docs', 'template-contract.md'))).toBe(true);
    expect(existsSync(path.join(rootDir, 'docs', 'release-checklist.md'))).toBe(true);
    expect(existsSync(path.join(rootDir, 'docs', 'ecosystem-roadmap.md'))).toBe(true);
    expect(existsSync(path.join(rootDir, 'docs', 'troubleshooting.md'))).toBe(true);
    expect(existsSync(path.join(rootDir, 'docs', 'template-capabilities.md'))).toBe(true);
    expect(existsSync(path.join(rootDir, '.github', 'workflows', 'catalog-ci.yml'))).toBe(true);
  });

  it('links beginner and maintainer documentation from catalog docs', () => {
    const readme = readFileSync(path.join(rootDir, 'README.md'), 'utf8');
    const docsIndex = readFileSync(path.join(rootDir, 'docs', 'README.md'), 'utf8');
    const playbook = readFileSync(path.join(rootDir, 'docs', 'starter-playbook.md'), 'utf8');
    const capabilities = readFileSync(
      path.join(rootDir, 'docs', 'template-capabilities.md'),
      'utf8',
    );
    const recipes = readFileSync(path.join(rootDir, 'docs', 'recipes.md'), 'utf8');
    const troubleshooting = readFileSync(path.join(rootDir, 'docs', 'troubleshooting.md'), 'utf8');
    const templateContract = readFileSync(
      path.join(rootDir, 'docs', 'template-contract.md'),
      'utf8',
    );
    const roadmap = readFileSync(path.join(rootDir, 'docs', 'ecosystem-roadmap.md'), 'utf8');

    expect(readme).toContain('./docs/README.md');
    expect(readme).toContain('./docs/starter-playbook.md');
    expect(readme).toContain('./docs/recipes.md');
    expect(readme).toContain('./docs/template-contract.md');
    expect(readme).toContain('./docs/release-checklist.md');
    expect(readme).toContain('./docs/ecosystem-roadmap.md');
    expect(readme).toContain('./docs/troubleshooting.md');
    expect(readme).toContain('./docs/template-capabilities.md');
    expect(docsIndex).toContain('./starter-playbook.md');
    expect(docsIndex).toContain('./template-capabilities.md');
    expect(docsIndex).toContain('./recipes.md');
    expect(docsIndex).toContain('./troubleshooting.md');
    expect(docsIndex).toContain('./template-contract.md');
    expect(docsIndex).toContain('./release-checklist.md');
    expect(docsIndex).toContain('./ecosystem-roadmap.md');
    expect(playbook).toContain('./recipes.md');
    expect(playbook).toContain('./template-capabilities.md');
    expect(playbook).toContain('./template-contract.md');
    expect(playbook).toContain('./ecosystem-roadmap.md');
    expect(recipes).toContain('./template-contract.md');
    expect(templateContract).toContain('./release-checklist.md');
    expect(templateContract).toContain('./ecosystem-roadmap.md');
    expect(roadmap).toContain('viteplus-antd-pro');
    expect(roadmap).toContain('viteplus-fastify-prisma');
    expect(capabilities).toContain('viteplus-antd');
    expect(capabilities).toContain('viteplus-antd-ssr');
    expect(capabilities).toContain('viteplus-antd-mobile');
    expect(capabilities).toContain('viteplus-fastify');
    expect(troubleshooting).toContain('vp env doctor');
    expect(troubleshooting).toContain('viteplus-fastify');
  });

  it('keeps local markdown links resolvable', () => {
    const markdownFiles = listFiles(rootDir).filter((filePath) => filePath.endsWith('.md'));

    markdownFiles.forEach((filePath) => {
      const markdown = readFileSync(filePath, 'utf8');
      const links = Array.from(markdown.matchAll(markdownLinkPattern), (match) => match[1]);

      links.forEach((href) => {
        if (isExternalOrSpecialLink(href)) {
          return;
        }

        const target = stripAnchor(href);

        if (!target) {
          return;
        }

        const targetPath = path.resolve(path.dirname(filePath), target);
        expect(existsSync(targetPath), `${filePath} links to missing ${href}`).toBe(true);
      });
    });
  });

  it('runs the catalog gate in GitHub Actions', () => {
    const workflow = readFileSync(
      path.join(rootDir, '.github', 'workflows', 'catalog-ci.yml'),
      'utf8',
    );

    expect(workflow).toContain('pull_request:');
    expect(workflow).toContain('branches:');
    expect(workflow).toContain('npm install -g vite-plus');
    expect(workflow).toContain('vp install');
    expect(workflow).toContain('vp check');
    expect(workflow).toContain('vp test');
    expect(workflow).toContain('vp pm pack');
  });

  it('keeps createConfig aligned with template directories', () => {
    const manifestNames = templateEntries.map((entry) => entry.name).sort();
    const directoryNames = readdirSync(path.join(rootDir, 'templates'), {
      withFileTypes: true,
    })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();

    expect(manifestNames).toEqual(directoryNames);
  });

  it.each(templateEntries)('has a complete starter contract for $name', (entry) => {
    expect(entry.description.length).toBeGreaterThan(20);
    expect(entry.template).toBe(`./templates/${entry.name}`);

    const templateDir = path.join(rootDir, entry.template);
    const packageJsonPath = path.join(templateDir, 'package.json');
    const readmePath = path.join(templateDir, 'README.md');

    expect(existsSync(packageJsonPath)).toBe(true);
    expect(existsSync(path.join(templateDir, 'pnpm-lock.yaml'))).toBe(true);
    expect(existsSync(readmePath)).toBe(true);
    expect(existsSync(path.join(templateDir, 'AGENTS.md'))).toBe(true);
    expect(existsSync(path.join(templateDir, 'tsconfig.json'))).toBe(true);
    expect(existsSync(path.join(templateDir, 'vite.config.ts'))).toBe(true);

    const templatePackage = readJson<TemplatePackage>(packageJsonPath);
    expect(templatePackage.name).toBe(entry.name);
    expect(templatePackage.packageManager).toMatch(/^pnpm@\d+\.\d+\.\d+$/);
  });

  it.each(templateEntries)('exposes the baseline Vite+ scripts for $name', (entry) => {
    const templatePackage = readJson<TemplatePackage>(
      path.join(rootDir, entry.template, 'package.json'),
    );

    expect(templatePackage.scripts).toEqual(
      expect.objectContaining({
        dev: expect.stringContaining('vp'),
        build: expect.stringContaining('vp'),
        check: 'vp check',
        test: expect.stringContaining('vp test'),
        prepare: 'vp config',
      }),
    );
  });

  it.each(templateEntries)('ships template-level tests for $name', (entry) => {
    const testFiles = listFiles(path.join(rootDir, entry.template)).filter((filePath) =>
      testFilePattern.test(filePath),
    );

    expect(testFiles.length).toBeGreaterThan(0);
  });

  it.each(templateEntries)('documents the first-run workflow for $name', (entry) => {
    const readme = readFileSync(path.join(rootDir, entry.template, 'README.md'), 'utf8');

    expect(readme).toContain(`vp create @brandonxiang:${entry.name}`);
    expect(readme).toContain('vp install');
    expect(readme).toMatch(/\bvp (build|run build|exec react-router build)\b/);
    expect(readme).toContain('vp check');
    expect(readme).toContain('vp test');
    expect(readme).toContain(
      'https://github.com/brandonxiang/viteplus-collections/blob/main/docs/recipes.md',
    );
    expect(readme).toContain(
      'https://github.com/brandonxiang/viteplus-collections/blob/main/docs/troubleshooting.md',
    );
  });

  it.each(templateEntries)('guides agents toward the starter recipes for $name', (entry) => {
    const agents = readFileSync(path.join(rootDir, entry.template, 'AGENTS.md'), 'utf8');

    expect(agents).toContain('Starter Extension Notes');
    expect(agents).toContain('vp install');
    expect(agents).toContain('vp check');
    expect(agents).toContain('vp test');
    expect(agents).toContain(
      'https://github.com/brandonxiang/viteplus-collections/blob/main/docs/recipes.md',
    );
    expect(agents).toContain(
      'https://github.com/brandonxiang/viteplus-collections/blob/main/docs/troubleshooting.md',
    );
  });

  it.each(templateEntries)('documents only existing package scripts for $name', (entry) => {
    const templateDir = path.join(rootDir, entry.template);
    const readme = readFileSync(path.join(templateDir, 'README.md'), 'utf8');
    const templatePackage = readJson<TemplatePackage>(path.join(templateDir, 'package.json'));
    const documentedScripts = extractDocumentedVpRunScripts(readme);

    documentedScripts.forEach((scriptName) => {
      expect(
        templatePackage.scripts,
        `${entry.name} README documents missing script ${scriptName}`,
      ).toHaveProperty(scriptName);
    });
  });
});
