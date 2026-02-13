export interface Portfolio {
  id: number;
  slug: string;
  title: string;
  tag?: string;
  content: string;
  cover?: {
    url: string;
  };
}

type RawPortfolioImage = {
  url?: string;
  formats?: {
    large?: { url?: string };
    medium?: { url?: string };
    small?: { url?: string };
  };
};

type RawPortfolio = {
  id?: number;
  documentId?: string;
  attributes?: RawPortfolio;
  slug?: string;
  tag?: string;
  Tag?: string;
  title?: string;
  Title?: string;
  name?: string;
  Name?: string;
  portfolioName?: string;
  portfolio_title?: string;
  content?: unknown;
  Content?: unknown;
  body?: unknown;
  blocks?: unknown;
  cover?: { data?: { attributes?: { url?: string } }; url?: string };
  image?: { data?: { attributes?: { url?: string } }; url?: string };
  Image?: RawPortfolioImage[] | RawPortfolioImage;
};

type RichTextNode = {
  type?: string;
  level?: number;
  text?: string;
  children?: RichTextNode[];
};

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function toHtmlContent(content: unknown): string {
  if (!content) return '';

  if (typeof content === 'string') {
    const trimmed = content.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<')) return content;

    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        return toHtmlContent(parsed);
      } catch {
        return `<p>${escapeHtml(content)}</p>`;
      }
    }

    return `<p>${escapeHtml(content)}</p>`;
  }

  if (Array.isArray(content)) {
    return content
      .map((block: unknown) => {
        if (typeof block === 'string') return `<p>${escapeHtml(block)}</p>`;
        const blockNode = typeof block === 'object' && block !== null ? (block as RichTextNode) : undefined;
        if (blockNode?.type === 'heading') {
          const level = blockNode.level || 2;
          const text = (blockNode.children || [])
            .map((child: RichTextNode) => child?.text || '')
            .join('');
          return `<h${level}>${escapeHtml(text)}</h${level}>`;
        }
        if (blockNode?.type === 'paragraph') {
          const text = (blockNode.children || [])
            .map((child: RichTextNode) => child?.text || '')
            .join('');
          return `<p>${escapeHtml(text)}</p>`;
        }
        if (blockNode?.text) return `<p>${escapeHtml(blockNode.text)}</p>`;
        if (blockNode?.children) return toHtmlContent(blockNode.children);
        return '';
      })
      .join('\n');
  }

  if (typeof content === 'object') {
    const contentNode = content as RichTextNode;
    if (contentNode.type === 'doc' && Array.isArray(contentNode.children)) {
      return toHtmlContent(contentNode.children);
    }
    if (Array.isArray(contentNode.children)) {
      return toHtmlContent(contentNode.children);
    }
    if (contentNode.text) {
      return `<p>${escapeHtml(contentNode.text)}</p>`;
    }
  }

  return '';
}

async function fetchFromStrapi(endpoint: string) {
  const strapiUrl = (process.env.NEXT_PUBLIC_STRAPI_URL || '').replace(/\/$/, '');

  if (!strapiUrl && process.env.NODE_ENV !== 'development') {
    throw new Error('NEXT_PUBLIC_STRAPI_URL environment variable is not set');
  }

  const baseUrl = strapiUrl || 'http://localhost:1337';
  const apiKey = process.env.STRAPI_API_KEY;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  // Ensure endpoint starts with / and handle joining safely
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = `${baseUrl}${cleanEndpoint}`;

  const response = await fetch(fullUrl, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch from Strapi: ${response.status} ${errorText}`);
  }

  return response.json();
}

// Helper to generate a slug from a string
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
}

function transformPortfolio(item: RawPortfolio): Portfolio {
  const attrs = item?.attributes || item;
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    (process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : '');
  const firstImageRaw = Array.isArray(attrs?.Image) ? attrs.Image[0] : attrs?.Image;
  const firstImage = (firstImageRaw as any)?.data?.attributes || (firstImageRaw as any)?.attributes || firstImageRaw;

  const rawImageUrl =
    firstImage?.url ||
    firstImage?.formats?.large?.url ||
    firstImage?.formats?.medium?.url ||
    firstImage?.formats?.small?.url ||
    attrs?.cover?.data?.attributes?.url ||
    attrs?.cover?.url ||
    attrs?.image?.data?.attributes?.url ||
    attrs?.image?.url ||
    '';

  const coverUrl = rawImageUrl
    ? rawImageUrl.startsWith('http')
      ? rawImageUrl
      : `${strapiUrl}${rawImageUrl}`
    : '';

  const title =
    attrs?.title ||
    attrs?.Title ||
    attrs?.name ||
    attrs?.Name ||
    attrs?.portfolioName ||
    attrs?.portfolio_title ||
    'Untitled Portfolio';

  // Use existing slug, or generate one from title, or fallback to documentId/id
  const rawSlug = attrs?.slug;
  const slug = rawSlug || slugify(title) || item?.documentId || attrs?.documentId || String(item?.id ?? attrs?.id ?? '');

  return {
    id: item?.id ?? attrs?.id ?? 0,
    slug,
    title,
    tag: attrs?.tag || attrs?.Tag || undefined,
    content: toHtmlContent(attrs?.content || attrs?.Content || attrs?.body || attrs?.blocks || ''),
    cover: coverUrl ? { url: coverUrl } : undefined,
  };
}

export async function getPortfolios(): Promise<Portfolio[]> {
  try {
    const response = await fetchFromStrapi('/api/portfolios?populate=*');
    const data = Array.isArray(response?.data) ? response.data : [];
    // Ensure we filter out items that don't have enough data to be useful
    return data.map(transformPortfolio).filter((item: Portfolio) => item.title && item.title !== 'Untitled Portfolio');
  } catch (error) {
    console.error('Error fetching portfolios from Strapi:', error);
    return [];
  }
}

export async function getPortfolioBySlug(slug: string): Promise<Portfolio | null> {
  try {
    const response = await fetchFromStrapi('/api/portfolios?populate=*');
    const data = Array.isArray(response?.data) ? (response.data as RawPortfolio[]) : [];

    // 1. Try to find by direct match (if we had a slug field)
    // 2. Try to match by slugified title
    // 3. Fallback to documentId or ID (for backward compatibility or direct links)

    const matched = data.find((item: RawPortfolio) => {
      const p = transformPortfolio(item);
      return (
        p.slug === slug ||
        String(item.id) === slug ||
        String(item.documentId) === slug
      );
    });

    if (matched) {
      return transformPortfolio(matched);
    }

    return null;
  } catch (error) {
    console.error('Error fetching single portfolio from Strapi:', error);
    return null;
  }
}
