/**
 * Minimal Supabase client built on plain `fetch`, with no external dependency.
 * This talks directly to Supabase's REST (PostgREST), Auth, and Storage APIs.
 *
 * Requires two environment variables (set in Vercel → Settings → Environment
 * Variables, and redeploy after adding them):
 *   VITE_SUPABASE_URL       e.g. https://xxxxxxxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY  the "anon public" key from Supabase → Settings → API
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const SESSION_KEY = 'portfolio_admin_session';

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function requireConfig() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    );
  }
  return { url: SUPABASE_URL, key: SUPABASE_ANON_KEY };
}

interface StoredSession {
  access_token: string;
  refresh_token: string;
  expires_at: number; // unix seconds
}

function getStoredSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as StoredSession) : null;
  } catch {
    return null;
  }
}

function setStoredSession(session: StoredSession | null) {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function isLoggedIn(): boolean {
  const s = getStoredSession();
  return Boolean(s && s.expires_at * 1000 > Date.now());
}

async function refreshSessionIfNeeded(): Promise<StoredSession | null> {
  const s = getStoredSession();
  if (!s) return null;
  // Refresh a bit before actual expiry
  if (s.expires_at * 1000 - Date.now() > 60_000) return s;

  const { url, key } = requireConfig();
  const res = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: { apikey: key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: s.refresh_token }),
  });
  if (!res.ok) {
    setStoredSession(null);
    return null;
  }
  const data = await res.json();
  const next: StoredSession = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Math.floor(Date.now() / 1000) + data.expires_in,
  };
  setStoredSession(next);
  return next;
}

export async function signIn(email: string, password: string): Promise<void> {
  const { url, key } = requireConfig();
  const res = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error_description || body.msg || 'Invalid email or password.');
  }
  const data = await res.json();
  setStoredSession({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Math.floor(Date.now() / 1000) + data.expires_in,
  });
}

export function signOut(): void {
  setStoredSession(null);
}

/** Authorization header to use for a write request: the signed-in user's token if present, otherwise the anon key (which RLS will reject for writes). */
async function authHeader(): Promise<string> {
  const { key } = requireConfig();
  const session = await refreshSessionIfNeeded();
  return `Bearer ${session ? session.access_token : key}`;
}

// ---- Project rows -----------------------------------------------------
// Re-uses the same Project/Category/CaseStudyData shapes the rest of the
// app already uses, so nothing downstream (Work.tsx, CaseStudy.tsx,
// ProjectGalleryModal.tsx) needs to change its type imports.

export type { Category, Project, CaseStudyData, GraphicsSubcategory } from '../data/projects';
export { GRAPHICS_SUBCATEGORIES } from '../data/projects';
import type { Category, Project, CaseStudyData } from '../data/projects';

/** Everything Project has, plus an optional hint for where it sorts in the grid. */
export interface ProjectDraft extends Partial<Project> {
  sortOrder?: number;
}

interface ProjectRow {
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  role: string | null;
  categories: string[];
  year: string | null;
  duration: string | null;
  tools: string[];
  image: string | null;
  image_bg: string | null;
  featured: boolean;
  wide: boolean;
  accent: string | null;
  gallery_view: boolean;
  case_study: CaseStudyData | null;
  sort_order: number;
  tags: string[] | null;
  sub_category: string | null;
}

function rowToProject(row: ProjectRow): Project {
  return {
    id: row.slug,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? '',
    description: row.description ?? '',
    role: row.role ?? '',
    categories: (row.categories ?? []) as Category[],
    year: row.year ?? '',
    duration: row.duration ?? '',
    tools: row.tools ?? [],
    image: row.image ?? '',
    imageBg: row.image_bg ?? '#111111',
    featured: row.featured,
    wide: row.wide,
    accent: row.accent ?? undefined,
    galleryView: row.gallery_view,
    caseStudy: row.case_study ?? undefined,
    tags: row.tags ?? [],
    subCategory: row.sub_category ?? undefined,
  };
}

function projectToRow(p: ProjectDraft) {
  const row: Record<string, unknown> = {};
  if (p.slug !== undefined) row.slug = p.slug;
  if (p.title !== undefined) row.title = p.title;
  if (p.subtitle !== undefined) row.subtitle = p.subtitle;
  if (p.description !== undefined) row.description = p.description;
  if (p.role !== undefined) row.role = p.role;
  if (p.categories !== undefined) row.categories = p.categories;
  if (p.year !== undefined) row.year = p.year;
  if (p.duration !== undefined) row.duration = p.duration;
  if (p.tools !== undefined) row.tools = p.tools;
  if (p.image !== undefined) row.image = p.image;
  if (p.imageBg !== undefined) row.image_bg = p.imageBg;
  if (p.featured !== undefined) row.featured = p.featured;
  if (p.wide !== undefined) row.wide = p.wide;
  if (p.accent !== undefined) row.accent = p.accent;
  if (p.galleryView !== undefined) row.gallery_view = p.galleryView;
  if (p.caseStudy !== undefined) row.case_study = p.caseStudy;
  if (p.sortOrder !== undefined) row.sort_order = p.sortOrder;
  if (p.tags !== undefined) row.tags = p.tags;
  if (p.subCategory !== undefined) row.sub_category = p.subCategory;
  return row;
}

export async function fetchProjects(): Promise<Project[]> {
  const { url, key } = requireConfig();
  const res = await fetch(`${url}/rest/v1/projects?select=*&order=sort_order.asc`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!res.ok) throw new Error('Could not load projects.');
  const rows = (await res.json()) as ProjectRow[];
  return rows.map(rowToProject);
}

export async function createProject(p: ProjectDraft): Promise<void> {
  const { url, key } = requireConfig();
  // New projects sort after every existing one (seeded projects start at 0-5)
  // unless the caller explicitly picked a position.
  const withOrder: ProjectDraft = { sortOrder: Date.now(), ...p };
  const res = await fetch(`${url}/rest/v1/projects`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: await authHeader(),
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(projectToRow(withOrder)),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || 'Could not create the project.');
  }
}

export async function updateProject(slug: string, p: ProjectDraft): Promise<void> {
  const { url, key } = requireConfig();
  const res = await fetch(`${url}/rest/v1/projects?slug=eq.${encodeURIComponent(slug)}`, {
    method: 'PATCH',
    headers: {
      apikey: key,
      Authorization: await authHeader(),
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(projectToRow(p)),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || 'Could not save changes.');
  }
}

export async function deleteProject(slug: string): Promise<void> {
  const { url, key } = requireConfig();
  const res = await fetch(`${url}/rest/v1/projects?slug=eq.${encodeURIComponent(slug)}`, {
    method: 'DELETE',
    headers: { apikey: key, Authorization: await authHeader() },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || 'Could not delete the project.');
  }
}

// ---- Image uploads ------------------------------------------------------

const BUCKET = 'project-images';

export async function uploadImage(file: File): Promise<string> {
  const { url, key } = requireConfig();
  const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${cleanName}`;

  const res = await fetch(`${url}/storage/v1/object/${BUCKET}/${path}`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: await authHeader(),
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || 'Image upload failed.');
  }
  return `${url}/storage/v1/object/public/${BUCKET}/${path}`;
}
