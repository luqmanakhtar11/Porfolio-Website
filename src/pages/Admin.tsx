import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import { Link } from 'react-router';
import {
  isSupabaseConfigured,
  isLoggedIn,
  signIn,
  signOut,
  createProject,
  updateProject,
  deleteProject,
  uploadImage,
  GRAPHICS_SUBCATEGORIES,
  type Category,
  type Project,
  type CaseStudyData,
} from '../lib/supabaseClient';
import { useProjects } from '../hooks/useProjects';

const TOP_CATEGORIES: Category[] = ['UI/UX & Product Design', 'Graphics & Marketing'];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function emptyCaseStudy(): CaseStudyData {
  return {
    challenge: '',
    approach: '',
    outcome: '',
    processSteps: [],
    processImages: [],
    finalImages: [],
    metrics: [],
    nextSlug: undefined,
  };
}

const MAX_TAGS = 10;

function emptyDraft(): Project {
  return {
    id: '',
    slug: '',
    title: '',
    subtitle: '',
    description: '',
    role: '',
    categories: [],
    year: new Date().getFullYear().toString(),
    duration: '',
    tools: [],
    image: '',
    imageBg: '#111111',
    featured: false,
    wide: false,
    accent: '#5B5BF0',
    galleryView: false,
    caseStudy: undefined,
    tags: [],
  };
}

/* ─── Shared field styles ─── */
const inputStyle: CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border)',
  background: 'var(--surface, #fff)',
  color: 'var(--fg)',
  fontFamily: 'var(--f-sans)',
  fontSize: '14px',
};
const labelStyle: CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontFamily: 'var(--f-mono)',
  color: 'var(--muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '6px',
};
const fieldWrap: CSSProperties = { marginBottom: '18px' };
const btnPrimary: CSSProperties = {
  padding: '10px 20px',
  borderRadius: '8px',
  border: 'none',
  background: 'var(--accent)',
  color: '#fff',
  fontFamily: 'var(--f-sans)',
  fontWeight: 600,
  fontSize: '14px',
  cursor: 'pointer',
};
const btnGhost: CSSProperties = {
  padding: '10px 20px',
  borderRadius: '8px',
  border: '1px solid var(--border)',
  background: 'transparent',
  color: 'var(--fg)',
  fontFamily: 'var(--f-sans)',
  fontSize: '14px',
  cursor: 'pointer',
};
const btnDanger: CSSProperties = {
  padding: '8px 14px',
  borderRadius: '8px',
  border: '1px solid #dc2626',
  background: 'transparent',
  color: '#dc2626',
  fontFamily: 'var(--f-sans)',
  fontSize: '13px',
  cursor: 'pointer',
};

/* ─── Image upload field (upload a file, or paste a URL directly) ─── */
function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={fieldWrap}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        {value && (
          <img
            src={value}
            alt=""
            style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)', flexShrink: 0 }}
          />
        )}
        <div style={{ flex: 1 }}>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste an image URL, or upload a file below"
            style={inputStyle}
          />
          <div style={{ marginTop: '8px' }}>
            <label style={{ ...btnGhost, display: 'inline-block', fontSize: '13px', padding: '7px 14px' }}>
              {uploading ? 'Uploading…' : 'Upload image'}
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                  e.target.value = '';
                }}
              />
            </label>
            {error && <span style={{ marginLeft: '10px', color: '#dc2626', fontSize: '12px' }}>{error}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Login screen ─── */
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signIn(email, password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        fontFamily: 'var(--f-sans)',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '340px',
          padding: '32px',
          borderRadius: '16px',
          border: '1px solid var(--border)',
          background: 'var(--surface, #fff)',
        }}
      >
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--fg)', marginBottom: '4px' }}>Admin sign-in</h1>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>
          Manage your portfolio projects.
        </p>
        <div style={fieldWrap}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            autoFocus
          />
        </div>
        <div style={fieldWrap}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>
        {error && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}
        <button type="submit" disabled={busy} style={{ ...btnPrimary, width: '100%' }}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <Link to="/" style={{ display: 'block', textAlign: 'center', marginTop: '18px', fontSize: '13px', color: 'var(--muted)' }}>
          ← Back to site
        </Link>
      </form>
    </div>
  );
}

/* ─── Project editor form ─── */
function ProjectEditor({
  initial,
  isNew,
  allSlugs,
  onCancel,
  onSaved,
}: {
  initial: Project;
  isNew: boolean;
  allSlugs: string[];
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [draft, setDraft] = useState<Project>(initial);
  const [toolsText, setToolsText] = useState(initial.tools.join(', '));
  const [tagsText, setTagsText] = useState((initial.tags ?? []).join(', '));
  const [galleryImages, setGalleryImages] = useState<{ src: string; caption: string }[]>(
    initial.caseStudy?.finalImages && initial.caseStudy.finalImages.length > 0
      ? initial.caseStudy.finalImages
      : []
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof Project>(key: K, value: Project[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function chooseCategory(c: Category) {
    setDraft((d) => ({
      ...d,
      categories: [c],
      // Switching away from Graphics & Marketing clears any sub-category pick.
      subCategory: c === 'Graphics & Marketing' ? d.subCategory : undefined,
    }));
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!draft.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (draft.categories.length === 0) {
      setError('Pick a category.');
      return;
    }
    if (draft.categories[0] === 'Graphics & Marketing' && !draft.subCategory) {
      setError('Pick a sub-category for Graphics & Marketing.');
      return;
    }
    let slug = draft.slug;
    if (isNew) {
      slug = slugify(draft.title);
      if (!slug) {
        setError('Could not generate a URL slug from that title — try adding some letters.');
        return;
      }
      if (allSlugs.includes(slug)) {
        setError(`A project with the URL "${slug}" already exists. Change the title slightly.`);
        return;
      }
    }

    const tools = toolsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const tags = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, MAX_TAGS);

    const cleanGalleryImages = galleryImages.filter((img) => img.src.trim());

    const payload: Project = {
      ...draft,
      slug,
      id: slug,
      tools,
      tags,
      // Every project opens as a simple image gallery, not a full case-study page.
      galleryView: true,
      caseStudy: {
        ...emptyCaseStudy(),
        finalImages: cleanGalleryImages,
      },
    };

    setSaving(true);
    try {
      if (isNew) {
        await createProject(payload);
      } else {
        await updateProject(initial.slug, payload);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} style={{ maxWidth: '640px' }}>
      <div style={fieldWrap}>
        <label style={labelStyle}>Title (required)</label>
        <input style={inputStyle} value={draft.title} onChange={(e) => set('title', e.target.value)} placeholder="Give your project a title" required />
        {isNew && draft.title && (
          <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px' }}>
            URL: /work/{slugify(draft.title) || '…'}
          </p>
        )}
      </div>

      <div style={fieldWrap}>
        <label style={labelStyle}>Tags (optional, up to {MAX_TAGS})</label>
        <input
          style={inputStyle}
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
          placeholder="Add up to 10 keywords to help people discover your project"
        />
      </div>

      <div style={fieldWrap}>
        <label style={labelStyle}>Category (required)</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {TOP_CATEGORIES.map((c) => {
            const selected = draft.categories[0] === c;
            return (
              <button
                type="button"
                key={c}
                onClick={() => chooseCategory(c)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontFamily: 'var(--f-sans)',
                  border: `1px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
                  background: selected ? 'var(--accent)' : 'transparent',
                  color: selected ? '#fff' : 'var(--fg)',
                  cursor: 'pointer',
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        {draft.categories[0] === 'Graphics & Marketing' && (
          <div style={{ marginTop: '14px' }}>
            <label style={labelStyle}>Sub-category (required)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {GRAPHICS_SUBCATEGORIES.map((sc) => {
                const selected = draft.subCategory === sc;
                return (
                  <button
                    type="button"
                    key={sc}
                    onClick={() => set('subCategory', sc)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '999px',
                      fontSize: '13px',
                      fontFamily: 'var(--f-sans)',
                      border: `1px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
                      background: selected ? 'var(--accent)' : 'transparent',
                      color: selected ? '#fff' : 'var(--fg)',
                      cursor: 'pointer',
                    }}
                  >
                    {sc}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div style={fieldWrap}>
        <label style={labelStyle}>Tools Used</label>
        <input
          style={inputStyle}
          value={toolsText}
          onChange={(e) => setToolsText(e.target.value)}
          placeholder="What software, hardware, or materials did you use?"
        />
      </div>

      <ImageField label="Cover image (shown in the homepage grid)" value={draft.image} onChange={(v) => set('image', v)} />

      <div style={fieldWrap}>
        <label style={labelStyle}>Gallery images (shown when someone clicks this project)</label>
        {galleryImages.map((img, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <ImageField
                label={`Image ${i + 1}`}
                value={img.src}
                onChange={(url) => {
                  const next = [...galleryImages];
                  next[i] = { ...next[i], src: url };
                  setGalleryImages(next);
                }}
              />
            </div>
            <button
              type="button"
              style={{ ...btnDanger, flexShrink: 0 }}
              onClick={() => setGalleryImages(galleryImages.filter((_, idx) => idx !== i))}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          style={{ ...btnGhost, fontSize: '13px', padding: '7px 14px' }}
          onClick={() => setGalleryImages([...galleryImages, { src: '', caption: '' }])}
        >
          + Add gallery image
        </button>
      </div>

      {error && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '12px' }}>
        <button type="submit" disabled={saving} style={btnPrimary}>
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
        <button type="button" style={btnGhost} onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ─── Main admin page ─── */
export default function Admin() {
  const [authed, setAuthed] = useState(isLoggedIn());
  const { projects, loading, refresh } = useProjects();
  const [editing, setEditing] = useState<Project | 'new' | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Admin — Portfolio';
  }, []);

  if (!isSupabaseConfigured()) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '24px', textAlign: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--f-sans)', fontSize: '20px', color: 'var(--fg)', marginBottom: '10px' }}>Admin panel not configured</h1>
          <p style={{ fontFamily: 'var(--f-sans)', fontSize: '14px', color: 'var(--muted)', maxWidth: '420px' }}>
            The <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> environment variables aren't set for
            this deployment. Add them in Vercel → Settings → Environment Variables, then redeploy.
          </p>
        </div>
      </div>
    );
  }

  if (!authed) {
    return <LoginForm onSuccess={() => setAuthed(true)} />;
  }

  async function handleDelete(slug: string) {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    setDeletingSlug(slug);
    try {
      await deleteProject(slug);
      refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Could not delete.');
    } finally {
      setDeletingSlug(null);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--f-sans)', padding: '40px 24px' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--fg)' }}>Projects</h1>
            <Link to="/" style={{ fontSize: '13px', color: 'var(--muted)' }}>← Back to site</Link>
          </div>
          <button
            style={btnGhost}
            onClick={() => {
              signOut();
              setAuthed(false);
            }}
          >
            Log out
          </button>
        </div>

        {editing ? (
          <ProjectEditor
            initial={editing === 'new' ? emptyDraft() : editing}
            isNew={editing === 'new'}
            allSlugs={projects.map((p) => p.slug)}
            onCancel={() => setEditing(null)}
            onSaved={() => {
              setEditing(null);
              refresh();
            }}
          />
        ) : (
          <>
            <button style={{ ...btnPrimary, marginBottom: '24px' }} onClick={() => setEditing('new')}>
              + Add New Project
            </button>

            {loading && <p style={{ color: 'var(--muted)' }}>Loading…</p>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {projects.map((p) => (
                <div
                  key={p.slug}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '42px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      background: p.imageBg,
                      flexShrink: 0,
                    }}
                  >
                    {p.image && <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, color: 'var(--fg)', fontSize: '14px' }}>{p.title}</p>
                    <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      {p.year} · {p.categories.join(', ') || 'No categories'} · /work/{p.slug}
                    </p>
                  </div>
                  <button style={{ ...btnGhost, padding: '7px 14px', fontSize: '13px' }} onClick={() => setEditing(p)}>
                    Edit
                  </button>
                  <button
                    style={btnDanger}
                    onClick={() => handleDelete(p.slug)}
                    disabled={deletingSlug === p.slug}
                  >
                    {deletingSlug === p.slug ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              ))}
              {!loading && projects.length === 0 && (
                <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No projects yet — add your first one above.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
