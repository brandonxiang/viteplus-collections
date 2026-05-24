/// <reference types="vite/client" />

import './styles.css';

type HealthResponse = {
  status: string;
  timestamp: number;
  uptime: number;
};

type HackerNewsHit = {
  objectID: string;
  title?: string;
  url?: string;
  author?: string;
  points?: number;
  num_comments?: number;
  created_at?: string;
};

type HackerNewsResponse = {
  hits: HackerNewsHit[];
};

type Story = {
  id: string;
  title: string;
  url: string;
  source: string;
  author: string;
  points: number;
  comments: number;
  createdAt: string;
};

const app = document.querySelector<HTMLDivElement>('#app');

const fallbackStories: Story[] = [
  {
    id: 'fallback-1',
    title: 'Fastify Vite makes one-process full stack demos feel small again',
    url: 'https://fastify.dev',
    source: 'fastify.dev',
    author: 'fastify',
    points: 168,
    comments: 42,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'fallback-2',
    title: 'Vite 8 notes: fast builds, stricter edges, better framework hooks',
    url: 'https://vite.dev',
    source: 'vite.dev',
    author: 'vite',
    points: 121,
    comments: 27,
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
  },
  {
    id: 'fallback-3',
    title: 'Why small starter templates should still include production smoke tests',
    url: '/docs',
    source: 'local docs',
    author: 'starter',
    points: 89,
    comments: 11,
    createdAt: new Date(Date.now() - 7200_000).toISOString(),
  },
];

let stories: Story[] = fallbackStories;

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const sanitizeUrl = (url: string) => {
  if (url.startsWith('/')) return url;

  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol) ? parsedUrl.toString() : '/';
  } catch {
    return '/';
  }
};

const getHostname = (url: string) => {
  if (url.startsWith('/')) return 'local';

  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'news.ycombinator.com';
  }
};

const formatAge = (isoDate: string) => {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.max(1, Math.round(diff / 60_000));

  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  return `${Math.round(hours / 24)}d ago`;
};

const renderHealth = (health: HealthResponse) => `
  <span class="signal-dot" aria-hidden="true"></span>
  API ${escapeHtml(health.status)} · ${health.uptime.toFixed(1)}s uptime
`;

const loadHealth = async () => {
  const response = await fetch('/health');

  if (!response.ok) {
    throw new Error(`Health check failed with ${response.status}`);
  }

  return response.json() as Promise<HealthResponse>;
};

const toStory = (hit: HackerNewsHit): Story | null => {
  if (!hit.title) return null;

  const url = hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`;

  return {
    id: hit.objectID,
    title: hit.title,
    url,
    source: getHostname(url),
    author: hit.author || 'unknown',
    points: hit.points || 0,
    comments: hit.num_comments || 0,
    createdAt: hit.created_at || new Date().toISOString(),
  };
};

const loadStories = async () => {
  const response = await fetch(
    'https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=18',
  );

  if (!response.ok) {
    throw new Error(`Hacker News request failed with ${response.status}`);
  }

  const data = (await response.json()) as HackerNewsResponse;
  const hits = data.hits.map(toStory).filter((story): story is Story => Boolean(story));

  if (hits.length === 0) {
    throw new Error('No Hacker News stories returned');
  }

  return hits;
};

const renderStory = (story: Story, index: number) => `
  <article class="story-row">
    <div class="rank">${String(index + 1).padStart(2, '0')}</div>
    <div class="story-main">
      <a class="story-title" href="${escapeHtml(sanitizeUrl(story.url))}" target="_blank" rel="noreferrer">
        ${escapeHtml(story.title)}
      </a>
      <div class="story-meta">
        <span>${escapeHtml(story.source)}</span>
        <span>${escapeHtml(story.author)}</span>
        <span>${formatAge(story.createdAt)}</span>
      </div>
    </div>
    <div class="story-score">
      <strong>${story.points}</strong>
      <span>pts</span>
    </div>
    <div class="story-score">
      <strong>${story.comments}</strong>
      <span>comments</span>
    </div>
  </article>
`;

const renderStories = (query = '') => {
  const list = document.querySelector<HTMLDivElement>('#story-list');
  const count = document.querySelector<HTMLSpanElement>('#story-count');

  if (!list || !count) return;

  const normalizedQuery = query.trim().toLowerCase();
  const visibleStories = normalizedQuery
    ? stories.filter((story) =>
        [story.title, story.source, story.author].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        ),
      )
    : stories;

  count.textContent = `${visibleStories.length} stories`;
  list.innerHTML =
    visibleStories.length > 0
      ? visibleStories.map(renderStory).join('')
      : '<p class="empty-state">No matching stories in the current front page batch.</p>';
};

const bindSearch = () => {
  const search = document.querySelector<HTMLInputElement>('#story-search');
  search?.addEventListener('input', () => renderStories(search.value));
};

const renderShell = () => {
  if (!app) return;

  app.innerHTML = `
    <header class="topbar">
      <a class="brand" href="/" aria-label="Hacker News Brief home">
        <span class="brand-mark">Y</span>
        <span>HN Brief</span>
      </a>
      <nav class="utility-links" aria-label="Service links">
        <a href="/docs">API Docs</a>
        <a href="/health">Health</a>
      </nav>
    </header>

    <section class="hero">
      <div>
        <p class="eyebrow">Hacker News intelligence desk</p>
        <h1>Signals from builders, researchers, and operators.</h1>
        <p class="intro">
          A Fastify Vite demo that turns the root route into a live Hacker News reading surface,
          backed by local health checks and production API routes.
        </p>
      </div>
      <aside class="briefing-panel" aria-label="Service status">
        <span class="panel-label">Fastify runtime</span>
        <div id="health" class="runtime-state">Checking API...</div>
        <a href="/api/hello/world?name=HackerNews">Try local API</a>
      </aside>
    </section>

    <section class="control-strip" aria-label="Story controls">
      <div>
        <span class="panel-label">Latest front page</span>
        <strong id="story-count">18 stories</strong>
      </div>
      <label class="search-box">
        <span>Filter</span>
        <input id="story-search" type="search" placeholder="Search title, source, author" />
      </label>
    </section>

    <section class="news-shell" aria-label="Hacker News stories">
      <div class="news-heading">
        <span>Rank</span>
        <span>Story</span>
        <span>Points</span>
        <span>Talk</span>
      </div>
      <div id="story-list" class="story-list">
        <p class="empty-state">Loading Hacker News stories...</p>
      </div>
    </section>
  `;

  bindSearch();
};

const render = async () => {
  renderShell();

  const healthRoot = document.querySelector<HTMLDivElement>('#health');

  try {
    const [health, hnStories] = await Promise.all([loadHealth(), loadStories()]);
    stories = hnStories;
    if (healthRoot) healthRoot.innerHTML = renderHealth(health);
  } catch (error) {
    if (healthRoot) {
      healthRoot.textContent = error instanceof Error ? error.message : 'Live feed unavailable';
    }
  }

  renderStories();
};

await render();
