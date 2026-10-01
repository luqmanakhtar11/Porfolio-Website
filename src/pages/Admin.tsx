import { useEffect, useState, type CSSProperties, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import { Link } from 'react-router';
import {
  isSupabaseConfigured,
  isLoggedIn,
  isIdleExpired,
  touchActivity,
  signIn,
  signOut,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
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
function LoginForm({ onSuccess, notice }: { onSuccess: () => void; notice?: string | null }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...inputStyle, paddingRight: '44px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
              style={{
                position: 'absolute',
                right: '6px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                color: 'var(--muted)',
                cursor: 'pointer',
              }}
            >
              {showPassword ? (
                /* eye-off */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                /* eye */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {notice && (
          <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '16px' }}>{notice}</p>
        )}
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

/* ─── Gallery images: 3-column grid, drag to reorder (or use the arrows) ─── */
type GalleryItem = { id: string; src: string; caption: string };

let galleryIdCounter = 0;
function newGalleryId(): string {
  galleryIdCounter += 1;
  return `g${galleryIdCounter}-${Date.now().toString(36)}`;
}

const smallBtn: CSSProperties = {
  padding: '4px 10px',
  borderRadius: '6px',
  border: '1px solid var(--border)',
  background: 'transparent',
  color: 'var(--fg)',
  fontFamily: 'var(--f-sans)',
  fontSize: '13px',
  cursor: 'pointer',
};

function GalleryCard({
  item,
  index,
  total,
  isDragging,
  isOver,
  setImages,
  onDragStartId,
  onDragOverId,
  onDropOnId,
  onDragEndAny,
  onMove,
  onRemove,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  isDragging: boolean;
  isOver: boolean;
  setImages: Dispatch<SetStateAction<GalleryItem[]>>;
  onDragStartId: (id: string) => void;
  onDragOverId: (id: string) => void;
  onDropOnId: (id: string) => void;
  onDragEndAny: () => void;
  onMove: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    touchActivity();
    try {
      const url = await uploadImage(file);
      // Functional update + id lookup: stays correct even if the cards were reordered mid-upload.
      setImages((prev) => prev.map((im) => (im.id === item.id ? { ...im, src: url } : im)));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      data-gallery-card
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        onDragOverId(item.id);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDropOnId(item.id);
      }}
      style={{
        border: `2px ${isOver ? 'dashed' : 'solid'} ${isOver ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '12px',
        padding: '8px',
        background: 'var(--surface, transparent)',
        opacity: isDragging ? 0.4 : 1,
        transition: 'opacity 0.15s, border-color 0.15s',
        minWidth: 0,
      }}
    >
      {/* Image tile — this is the drag handle (inputs below stay normally selectable) */}
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', item.id);
          const card = (e.currentTarget as HTMLElement).closest('[data-gallery-card]');
          if (card) e.dataTransfer.setDragImage(card, 24, 24);
          onDragStartId(item.id);
        }}
        onDragEnd={onDragEndAny}
        title="Drag to reorder"
        style={{
          position: 'relative',
          aspectRatio: '4 / 3',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'var(--surface2, rgba(0,0,0,0.05))',
          cursor: 'grab',
        }}
      >
        {item.src ? (
          <img
            src={item.src}
            alt=""
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--muted)',
              fontSize: '12px',
              fontFamily: 'var(--f-sans)',
            }}
          >
            No image yet
          </div>
        )}
        <span
          style={{
            position: 'absolute',
            top: '6px',
            left: '6px',
            minWidth: '24px',
            height: '24px',
            padding: '0 6px',
            borderRadius: '999px',
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: 'var(--f-sans)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {index + 1}
        </span>
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            padding: '2px 7px',
            borderRadius: '999px',
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            fontSize: '12px',
            letterSpacing: '1px',
          }}
        >
          ⋮⋮
        </span>
        {uploading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontFamily: 'var(--f-sans)',
            }}
          >
            Uploading…
          </div>
        )}
      </div>

      <input
        type="text"
        value={item.src}
        onChange={(e) => {
          const v = e.target.value;
          setImages((prev) => prev.map((im) => (im.id === item.id ? { ...im, src: v } : im)));
        }}
        placeholder="Paste image URL"
        style={{ ...inputStyle, marginTop: '8px', padding: '7px 9px', fontSize: '12px' }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
        <label style={{ ...smallBtn, display: 'inline-block' }}>
          {uploading ? '…' : 'Upload'}
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
        <span style={{ flex: 1 }} />
        <button
          type="button"
          aria-label={`Move image ${index + 1} earlier`}
          title="Move earlier"
          disabled={index === 0}
          onClick={() => onMove(item.id, -1)}
          style={{ ...smallBtn, opacity: index === 0 ? 0.35 : 1, cursor: index === 0 ? 'not-allowed' : 'pointer' }}
        >
          ←
        </button>
        <button
          type="button"
          aria-label={`Move image ${index + 1} later`}
          title="Move later"
          disabled={index === total - 1}
          onClick={() => onMove(item.id, 1)}
          style={{ ...smallBtn, opacity: index === total - 1 ? 0.35 : 1, cursor: index === total - 1 ? 'not-allowed' : 'pointer' }}
        >
          →
        </button>
        <button
          type="button"
          aria-label={`Remove image ${index + 1}`}
          title="Remove"
          onClick={() => onRemove(item.id)}
          style={{ ...smallBtn, borderColor: '#dc2626', color: '#dc2626' }}
        >
          ✕
        </button>
      </div>
      {error && <p style={{ color: '#dc2626', fontSize: '11px', marginTop: '6px', wordBreak: 'break-word' }}>{error}</p>}
    </div>
  );
}

function GalleryGrid({
  images,
  setImages,
}: {
  images: GalleryItem[];
  setImages: Dispatch<SetStateAction<GalleryItem[]>>;
}) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [bulk, setBulk] = useState<{ done: number; total: number } | null>(null);
  const [bulkError, setBulkError] = useState<string | null>(null);

  function reorder(fromId: string, toId: string) {
    if (fromId === toId) return;
    setImages((prev) => {
      const from = prev.findIndex((im) => im.id === fromId);
      const to = prev.findIndex((im) => im.id === toId);
      if (from < 0 || to < 0) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  function move(id: string, delta: number) {
    setImages((prev) => {
      const from = prev.findIndex((im) => im.id === id);
      const to = from + delta;
      if (from < 0 || to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  function remove(id: string) {
    setImages((prev) => prev.filter((im) => im.id !== id));
  }

  function clearDrag() {
    setDragId(null);
    setOverId(null);
  }

  // Upload many files at once; they are added in the order chosen, one after another.
  async function uploadMany(files: File[]) {
    if (files.length === 0) return;
    setBulkError(null);
    setBulk({ done: 0, total: files.length });
    const failed: string[] = [];
    for (const file of files) {
      touchActivity(); // a long upload shouldn't trigger the idle sign-out
      try {
        const url = await uploadImage(file);
        setImages((prev) => [...prev, { id: newGalleryId(), src: url, caption: '' }]);
      } catch {
        failed.push(file.name);
      }
      setBulk((b) => (b ? { ...b, done: b.done + 1 } : b));
    }
    setBulk(null);
    if (failed.length > 0) setBulkError(`These files could not be uploaded: ${failed.join(', ')}`);
  }

  return (
    <div>
      <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '12px', lineHeight: 1.6 }}>
        Images appear in the gallery in the order shown here (1 first). Drag a card by its picture to reorder — or use
        the ← → buttons (on a phone, use the buttons).
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '14px',
          marginBottom: '14px',
        }}
      >
        {images.map((item, i) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={i}
            total={images.length}
            isDragging={dragId === item.id}
            isOver={overId === item.id && dragId !== null && dragId !== item.id}
            setImages={setImages}
            onDragStartId={setDragId}
            onDragOverId={(id) => {
              if (dragId) setOverId(id);
            }}
            onDropOnId={(id) => {
              if (dragId) reorder(dragId, id);
              clearDrag();
            }}
            onDragEndAny={clearDrag}
            onMove={move}
            onRemove={remove}
          />
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        <label style={{ ...btnPrimary, display: 'inline-block', fontSize: '13px', padding: '8px 16px', opacity: bulk ? 0.6 : 1 }}>
          {bulk ? `Uploading ${Math.min(bulk.done + 1, bulk.total)} of ${bulk.total}…` : 'Upload images (select many)'}
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            disabled={Boolean(bulk)}
            onChange={(e) => {
              const files = e.target.files ? Array.from(e.target.files) : [];
              e.target.value = '';
              uploadMany(files);
            }}
          />
        </label>
        <button
          type="button"
          style={{ ...btnGhost, fontSize: '13px', padding: '7px 14px' }}
          onClick={() => setImages((prev) => [...prev, { id: newGalleryId(), src: '', caption: '' }])}
        >
          + Add one by URL
        </button>
      </div>
      {bulkError && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '10px' }}>{bulkError}</p>}
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
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>(() =>
    (initial.caseStudy?.finalImages ?? []).map((im) => ({
      id: newGalleryId(),
      src: im.src,
      caption: im.caption,
    }))
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

    // Drop empty slots and the internal ids; order is exactly what's on screen.
    const cleanGalleryImages = galleryImages
      .filter((img) => img.src.trim())
      .map(({ src, caption }) => ({ src, caption }));

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
    <form onSubmit={handleSave} style={{ maxWidth: '760px' }}>
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
        <GalleryGrid images={galleryImages} setImages={setGalleryImages} />
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
/* ─── One project card in the admin grid (drag by the picture, or use ← →) ─── */
function AdminProjectCard({
  project,
  index,
  total,
  isDragging,
  isOver,
  deleting,
  onDragStartSlug,
  onDragOverSlug,
  onDropOnSlug,
  onDragEndAny,
  onMove,
  onEdit,
  onDelete,
}: {
  project: Project;
  index: number;
  total: number;
  isDragging: boolean;
  isOver: boolean;
  deleting: boolean;
  onDragStartSlug: (slug: string) => void;
  onDragOverSlug: (slug: string) => void;
  onDropOnSlug: (slug: string) => void;
  onDragEndAny: () => void;
  onMove: (slug: string, delta: number) => void;
  onEdit: (p: Project) => void;
  onDelete: (p: Project) => void;
}) {
  return (
    <div
      data-project-card
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        onDragOverSlug(project.slug);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDropOnSlug(project.slug);
      }}
      style={{
        border: `2px ${isOver ? 'dashed' : 'solid'} ${isOver ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '14px',
        padding: '8px',
        opacity: isDragging ? 0.4 : 1,
        transition: 'opacity 0.15s, border-color 0.15s',
        minWidth: 0,
      }}
    >
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', project.slug);
          const card = (e.currentTarget as HTMLElement).closest('[data-project-card]');
          if (card) e.dataTransfer.setDragImage(card, 24, 24);
          onDragStartSlug(project.slug);
        }}
        onDragEnd={onDragEndAny}
        title="Drag to reorder"
        style={{
          position: 'relative',
          aspectRatio: '4 / 3',
          borderRadius: '10px',
          overflow: 'hidden',
          background: project.imageBg || 'var(--surface2, rgba(0,0,0,0.05))',
          cursor: 'grab',
        }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt=""
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '12px' }}>
            No cover image
          </div>
        )}
        <span
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            minWidth: '26px',
            height: '26px',
            padding: '0 7px',
            borderRadius: '999px',
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {index + 1}
        </span>
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            padding: '2px 8px',
            borderRadius: '999px',
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            fontSize: '12px',
            letterSpacing: '1px',
          }}
        >
          ⋮⋮
        </span>
      </div>

      <div style={{ padding: '10px 4px 0' }}>
        <p
          title={project.title}
          style={{ fontWeight: 600, color: 'var(--fg)', fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {project.title}
        </p>
        <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
          {project.year} · {project.categories.join(', ') || 'No category'}
        </p>
        {project.subCategory && (
          <p style={{ fontSize: '11px', color: 'var(--accent)', marginTop: '2px' }}>{project.subCategory}</p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
        <button
          type="button"
          aria-label={`Move ${project.title} earlier`}
          title="Move earlier"
          disabled={index === 0}
          onClick={() => onMove(project.slug, -1)}
          style={{ ...smallBtn, opacity: index === 0 ? 0.35 : 1, cursor: index === 0 ? 'not-allowed' : 'pointer' }}
        >
          ←
        </button>
        <button
          type="button"
          aria-label={`Move ${project.title} later`}
          title="Move later"
          disabled={index === total - 1}
          onClick={() => onMove(project.slug, 1)}
          style={{ ...smallBtn, opacity: index === total - 1 ? 0.35 : 1, cursor: index === total - 1 ? 'not-allowed' : 'pointer' }}
        >
          →
        </button>
        <span style={{ flex: 1 }} />
        <button type="button" style={smallBtn} onClick={() => onEdit(project)}>
          Edit
        </button>
        <button
          type="button"
          disabled={deleting}
          onClick={() => onDelete(project)}
          style={{ ...smallBtn, borderColor: '#dc2626', color: '#dc2626' }}
        >
          {deleting ? '…' : 'Delete'}
        </button>
      </div>
    </div>
  );
}

const IDLE_MESSAGE = 'You were signed out after 10 minutes of inactivity. Please sign in again.';

export default function Admin() {
  // Declared before `authed` on purpose: isLoggedIn() clears an idle-expired
  // session, so we need to detect the expiry first to show the notice.
  const [sessionNotice, setSessionNotice] = useState<string | null>(() => (isIdleExpired() ? IDLE_MESSAGE : null));
  const [authed, setAuthed] = useState(() => isLoggedIn());
  const { projects, loading, refresh } = useProjects();
  const [editing, setEditing] = useState<Project | 'new' | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null);
  const [deleteText, setDeleteText] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);
  // Re-ordering: `order` holds the unsaved arrangement (list of slugs); null = nothing changed.
  const [order, setOrder] = useState<string[] | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [dragSlug, setDragSlug] = useState<string | null>(null);
  const [overSlug, setOverSlug] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Admin — Portfolio';
  }, []);

  // Auto sign-out after IDLE_TIMEOUT_MS without any activity.
  useEffect(() => {
    if (!authed) return;
    touchActivity();

    let lastWrite = Date.now();
    const onActivity = () => {
      const now = Date.now();
      if (now - lastWrite > 5000) {
        lastWrite = now;
        touchActivity();
      }
    };
    const checkIdle = () => {
      if (isIdleExpired()) {
        signOut();
        setSessionNotice(IDLE_MESSAGE);
        setAuthed(false);
      }
    };

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'] as const;
    events.forEach((ev) => window.addEventListener(ev, onActivity, { passive: true }));
    document.addEventListener('visibilitychange', checkIdle);
    const timer = window.setInterval(checkIdle, 15_000);

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, onActivity));
      document.removeEventListener('visibilitychange', checkIdle);
      window.clearInterval(timer);
    };
  }, [authed]);

  // Esc closes the delete dialog.
  useEffect(() => {
    if (!pendingDelete) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !deletingSlug) setPendingDelete(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pendingDelete, deletingSlug]);

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
    return (
      <LoginForm
        notice={sessionNotice}
        onSuccess={() => {
          setSessionNotice(null);
          setAuthed(true);
        }}
      />
    );
  }

  const deleteConfirmed = deleteText.trim().toUpperCase() === 'DELETE';

  // The list as shown on screen: the saved order, or the unsaved arrangement if one is pending.
  // Projects added/removed since the arrangement was made are handled (removed ones drop out, new ones go last).
  const displayed: Project[] = order
    ? [
        ...order
          .map((s) => projects.find((p) => p.slug === s))
          .filter((p): p is Project => Boolean(p)),
        ...projects.filter((p) => !order.includes(p.slug)),
      ]
    : projects;
  const orderDirty = order !== null && displayed.some((p, i) => p.slug !== projects[i]?.slug);

  function reorderProject(fromSlug: string, toSlug: string) {
    if (fromSlug === toSlug) return;
    const slugs = displayed.map((p) => p.slug);
    const from = slugs.indexOf(fromSlug);
    const to = slugs.indexOf(toSlug);
    if (from < 0 || to < 0) return;
    const next = [...slugs];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setOrder(next);
  }

  function moveProject(slug: string, delta: number) {
    const slugs = displayed.map((p) => p.slug);
    const from = slugs.indexOf(slug);
    const to = from + delta;
    if (from < 0 || to < 0 || to >= slugs.length) return;
    const next = [...slugs];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setOrder(next);
  }

  async function saveOrder() {
    setSavingOrder(true);
    setOrderError(null);
    try {
      await reorderProjects(displayed.map((p) => p.slug));
      await refresh(); // reload first, so the grid never flashes the old order
      setOrder(null);
    } catch (e) {
      setOrderError(e instanceof Error ? e.message : 'Could not save the order.');
      if (!isLoggedIn()) {
        setSessionNotice(IDLE_MESSAGE);
        setAuthed(false);
      }
    } finally {
      setSavingOrder(false);
    }
  }

  async function confirmDelete() {
    if (!pendingDelete || !deleteConfirmed) return;
    const slug = pendingDelete.slug;
    setDeletingSlug(slug);
    setDeleteError(null);
    try {
      await deleteProject(slug);
      setPendingDelete(null);
      setDeleteText('');
      refresh();
    } catch (e) {
      setDeleteError(e instanceof Error ? e.message : 'Could not delete.');
      if (!isLoggedIn()) {
        setSessionNotice(IDLE_MESSAGE);
        setAuthed(false);
      }
    } finally {
      setDeletingSlug(null);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--f-sans)', padding: '40px 24px' }}>
      <div style={{ maxWidth: editing ? '880px' : '1100px', margin: '0 auto' }}>
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

            {orderError && (
              <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>{orderError}</p>
            )}

            {orderDirty && (
              <div
                style={{
                  position: 'sticky',
                  top: '12px',
                  zIndex: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                  padding: '12px 16px',
                  marginBottom: '16px',
                  borderRadius: '12px',
                  border: '1px solid var(--accent)',
                  background: 'var(--bg)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                }}
              >
                <span style={{ flex: 1, minWidth: '180px', fontSize: '13px', color: 'var(--fg)' }}>
                  You changed the order. It is not saved yet.
                </span>
                <button
                  type="button"
                  style={btnGhost}
                  disabled={savingOrder}
                  onClick={() => {
                    setOrder(null);
                    setOrderError(null);
                  }}
                >
                  Reset
                </button>
                <button type="button" style={btnPrimary} disabled={savingOrder} onClick={saveOrder}>
                  {savingOrder ? 'Saving…' : 'Save order'}
                </button>
              </div>
            )}

            {projects.length > 1 && (
              <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '14px' }}>
                Drag a card by its picture (or use the ← → buttons) to rearrange. Number 1 shows first on your website.
              </p>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
              {displayed.map((p, i) => (
                <AdminProjectCard
                  key={p.slug}
                  project={p}
                  index={i}
                  total={displayed.length}
                  isDragging={dragSlug === p.slug}
                  isOver={Boolean(dragSlug) && overSlug === p.slug && dragSlug !== p.slug}
                  deleting={deletingSlug === p.slug}
                  onDragStartSlug={setDragSlug}
                  onDragOverSlug={setOverSlug}
                  onDropOnSlug={(slug) => {
                    if (dragSlug) reorderProject(dragSlug, slug);
                    setDragSlug(null);
                    setOverSlug(null);
                  }}
                  onDragEndAny={() => {
                    setDragSlug(null);
                    setOverSlug(null);
                  }}
                  onMove={moveProject}
                  onEdit={(proj) => setEditing(proj)}
                  onDelete={(proj) => {
                    setPendingDelete(proj);
                    setDeleteText('');
                    setDeleteError(null);
                  }}
                />
              ))}
            </div>
            {!loading && projects.length === 0 && (
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No projects yet — add your first one above.</p>
            )}
          </>
        )}
      </div>

      {pendingDelete && (
        <div
          onClick={() => {
            if (!deletingSlug) setPendingDelete(null);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              confirmDelete();
            }}
            style={{
              width: '100%',
              maxWidth: '420px',
              padding: '28px',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--fg)', marginBottom: '10px' }}>
              Delete this project?
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '6px' }}>
              You are about to permanently delete <strong style={{ color: 'var(--fg)' }}>{pendingDelete.title}</strong>. It will disappear from your website right away and this can't be undone.
            </p>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '16px' }}>
              To confirm, type <strong style={{ color: '#dc2626' }}>DELETE</strong> below.
            </p>
            <input
              style={inputStyle}
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
              placeholder="Type DELETE"
              autoFocus
              autoComplete="off"
            />
            {deleteError && (
              <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '12px' }}>{deleteError}</p>
            )}
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                style={btnGhost}
                onClick={() => setPendingDelete(null)}
                disabled={Boolean(deletingSlug)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!deleteConfirmed || Boolean(deletingSlug)}
                style={{
                  ...btnPrimary,
                  background: '#dc2626',
                  opacity: !deleteConfirmed || deletingSlug ? 0.45 : 1,
                  cursor: !deleteConfirmed || deletingSlug ? 'not-allowed' : 'pointer',
                }}
              >
                {deletingSlug ? 'Deleting…' : 'Delete project'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
