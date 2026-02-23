import { cache } from 'react';

export interface Portfolio {
  id: number;
  slug: string;
  title: string;
  tag?: string;
  tags?: string[];
  Tag1?: string;
  Tag2?: string;
  Tag3?: string;
  content: string;
  cover?: {
    url: string;
  };
  logo?: {
    url: string;
  };
  authors?: Array<{
    name: string;
    position: string;
    avatar?: {
      url: string;
    };
  }>;
  image?: {
    url: string;
  };
  description?: string;
  Challenge_heading?: string;
  Challenge_Description?: string;
  Approach_image?: {
    url: string;
  };
  Approach_text?: string;
  Solution_text?: string;
  Solution_images?: Array<{
    url: string;
  }>;
  Impact1?: string;
  Impact2?: string;
  Impact3?: string;
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
  Tag1?: string;
  Tag2?: string;
  Tag3?: string;
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
  logo?: unknown;
  Logo?: unknown;
  description?: unknown;
  Description?: unknown;
  authors?: unknown;
  Challenge_heading?: string;
  challenge_heading?: string;
  Challenge_Description?: string;
  challenge_description?: string;
  Approach_image?: RawPortfolioImage[] | RawPortfolioImage | { data?: { attributes?: { url?: string } }; url?: string };
  approach_image?: RawPortfolioImage[] | RawPortfolioImage | { data?: { attributes?: { url?: string } }; url?: string };
  Approach_text?: string;
  approach_text?: string;
  Solution_text?: string;
  solution_text?: string;
  Solution_images?: RawPortfolioImage[] | RawPortfolioImage | { data?: RawPortfolioImage[] | RawPortfolioImage };
  solution_images?: RawPortfolioImage[] | RawPortfolioImage | { data?: RawPortfolioImage[] | RawPortfolioImage };
  Impact1?: unknown;
  impact1?: unknown;
  Impact2?: unknown;
  impact2?: unknown;
  Impact3?: unknown;
  impact3?: unknown;
}

type RichTextNode = {
  type?: string;
  level?: number;
  text?: string;
  children?: RichTextNode[];
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  newTab?: boolean;
  format?: string;
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

// Convert inline nodes (text, bold, italic, links, etc.) to HTML
function convertInlineNodes(nodes: RichTextNode[]): string {
  if (!Array.isArray(nodes)) {
    return '';
  }

  return nodes.map(node => {
    if (typeof node === 'string') {
      return escapeHtml(node);
    }

    if (node.type === 'text' || (!node.type && node.text !== undefined)) {
      let text = escapeHtml(node.text || '');

      // Apply formatting (bold, italic, etc.)
      if (node.bold) text = `<strong>${text}</strong>`;
      if (node.italic) text = `<em>${text}</em>`;
      if (node.underline) text = `<u>${text}</u>`;
      if (node.strikethrough) text = `<s>${text}</s>`;
      if (node.code) text = `<code>${text}</code>`;

      return text;
    }

    if (node.type === 'link') {
      return `<a href="${node.url || '#'}" ${node.newTab ? 'target="_blank" rel="noopener noreferrer"' : ''}>${convertInlineNodes(node.children || [])}</a>`;
    }

    // Handle nested children
    if (node.children && Array.isArray(node.children)) {
      return convertInlineNodes(node.children);
    }

    return '';
  }).join('');
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
        if (!blockNode) return '';

        // Handle heading
        if (blockNode.type === 'heading') {
          const level = blockNode.level || 2;
          return `<h${level}>${convertInlineNodes(blockNode.children || [])}</h${level}>`;
        }

        // Handle paragraph
        if (blockNode.type === 'paragraph') {
          return `<p>${convertInlineNodes(blockNode.children || [])}</p>`;
        }

        // Handle list
        if (blockNode.type === 'list') {
          const listTag = blockNode.format === 'ordered' ? 'ol' : 'ul';
          const items = (blockNode.children || [])
            .map((item: RichTextNode) => `<li>${convertInlineNodes(item.children || [])}</li>`)
            .join('');
          return `<${listTag}>${items}</${listTag}>`;
        }

        // Handle quote
        if (blockNode.type === 'quote') {
          return `<blockquote>${convertInlineNodes(blockNode.children || [])}</blockquote>`;
        }

        // Handle code
        if (blockNode.type === 'code') {
          return `<pre><code>${escapeHtml(convertInlineNodes(blockNode.children || []))}</code></pre>`;
        }

        // Handle link block
        if (blockNode.type === 'link') {
          return `<a href="${blockNode.url || '#'}" ${blockNode.newTab ? 'target="_blank" rel="noopener noreferrer"' : ''}>${convertInlineNodes(blockNode.children || [])}</a>`;
        }

        // Fallback: if it has text, wrap in paragraph
        if (blockNode.text) {
          return `<p>${convertInlineNodes([blockNode])}</p>`;
        }

        // If it has children, process them
        if (blockNode.children && Array.isArray(blockNode.children)) {
          return toHtmlContent(blockNode.children);
        }

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
      return `<p>${convertInlineNodes([contentNode])}</p>`;
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

// Helper to extract image URL from Strapi image field
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractImageUrl(imageField: any, strapiUrl: string): string | undefined {
  if (!imageField) return undefined;

  // Handle arrays - take first element (common for Strapi media fields)
  let imageObj = imageField;
  if (Array.isArray(imageField)) {
    if (imageField.length === 0) return undefined;
    imageObj = imageField[0];
  }

  // Handle nested data structure (Strapi v4 relation format)
  if (imageObj?.data) {
    if (Array.isArray(imageObj.data)) {
      if (imageObj.data.length === 0) return undefined;
      imageObj = imageObj.data[0];
    } else {
      imageObj = imageObj.data;
    }
  }

  // Handle attributes wrapper
  if (imageObj?.attributes) {
    imageObj = imageObj.attributes;
  }

  let url: string | undefined;

  // Check for direct URL (Cloudinary or external URLs)
  if (imageObj?.url && typeof imageObj.url === 'string') {
    url = imageObj.url;
  }
  // Check formats (prefer large > medium > small > thumbnail)
  else if (imageObj?.formats?.large?.url) {
    url = imageObj.formats.large.url;
  } else if (imageObj?.formats?.medium?.url) {
    url = imageObj.formats.medium.url;
  } else if (imageObj?.formats?.small?.url) {
    url = imageObj.formats.small.url;
  } else if (imageObj?.formats?.thumbnail?.url) {
    url = imageObj.formats.thumbnail.url;
  }
  else if (typeof imageObj === 'string') {
    url = imageObj;
  }

  if (!url) return undefined;

  return url.startsWith('http') ? url : `${strapiUrl}${url}`;
}

// Helper to extract authors array from Strapi
// Try to extract avatar from portfolio response first (might be partially populated)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractAuthors(authorsField: any, strapiUrl: string): Array<{ name: string; position: string; avatar?: { url: string } }> | undefined {
  if (!authorsField) return undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let authorsArray: any[] = [];
  if (Array.isArray(authorsField.data)) {
    authorsArray = authorsField.data;
  } else if (Array.isArray(authorsField)) {
    authorsArray = authorsField;
  } else if (authorsField.data && !Array.isArray(authorsField.data)) {
    authorsArray = [authorsField.data];
  }

  if (authorsArray.length === 0) return undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return authorsArray.map((author: any) => {
    // Handle both structures: with attributes wrapper and without
    const attrs = author.attributes || author;
    
    // Extract name and position
    const name = attrs?.name || author.name || 'Unknown';
    const position = attrs?.position || attrs?.Position || attrs?.job || attrs?.Job || author.position || author.Position || author.job || author.Job || '';
    
    // Try to extract avatar - check multiple possible structures
    // Since hasAttributes: false, avatar might be at top level or nested
    let avatarUrl = extractImageUrl(attrs?.avatar, strapiUrl);
    
    // If not found in attrs, check top level
    if (!avatarUrl && author.avatar) {
      avatarUrl = extractImageUrl(author.avatar, strapiUrl);
    }
    
    // If still not found, check deeper nested structures
    if (!avatarUrl) {
      // Check author.attributes.avatar.data.attributes.url (full nested structure)
      if (attrs?.avatar?.data?.attributes?.url) {
        const url = attrs.avatar.data.attributes.url;
        avatarUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`;
      }
      // Check author.attributes.avatar.data.url
      else if (attrs?.avatar?.data?.url) {
        const url = attrs.avatar.data.url;
        avatarUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`;
      }
      // Check author.avatar.data.attributes.url (top level avatar)
      else if (author.avatar?.data?.attributes?.url) {
        const url = author.avatar.data.attributes.url;
        avatarUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`;
      }
      // Check author.avatar.data.url (top level avatar)
      else if (author.avatar?.data?.url) {
        const url = author.avatar.data.url;
        avatarUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`;
      }
    }

    return {
      name,
      position,
      avatar: avatarUrl ? { url: avatarUrl } : undefined,
    };
  });
}

function transformPortfolio(item: RawPortfolio): Portfolio {
  const attrs = item?.attributes || item;
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    (process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : '');
  
  // Extract main Image field (capital I - matches Strapi field name)
  const imageUrl = extractImageUrl(attrs?.Image, strapiUrl);
  
  // Use Image as cover (main portfolio image)
  const coverUrl = imageUrl || '';

  // Extract title from Name field (matches Strapi field name)
  const title =
    attrs?.Name ||
    attrs?.name ||
    attrs?.title ||
    attrs?.Title ||
    attrs?.portfolioName ||
    attrs?.portfolio_title ||
    'Untitled Portfolio';

  // Use existing slug, or generate one from title, or fallback to documentId/id
  const rawSlug = attrs?.slug;
  const slug = rawSlug || slugify(title) || item?.documentId || attrs?.documentId || String(item?.id ?? attrs?.id ?? '');

  // Collect tags
  const tags: string[] = [];
  if (attrs?.Tag1) tags.push(attrs.Tag1);
  if (attrs?.Tag2) tags.push(attrs.Tag2);
  if (attrs?.Tag3) tags.push(attrs.Tag3);

  // If no new tags, fallback to the old tag field if it exists
  const finalTag = attrs?.Tag1 || attrs?.tag || attrs?.Tag;

  // Extract logo (capital L - matches Strapi field name)
  const logoUrl = extractImageUrl(attrs?.Logo || attrs?.logo, strapiUrl);

  // Extract authors
  const authors = extractAuthors(attrs?.authors, strapiUrl);

  // Image already extracted above as coverUrl, reuse for image field
  // (Image is the main portfolio image)

  // Extract description (Strapi rich text → HTML)
  const descriptionRaw = attrs?.description ?? attrs?.Description;
  const description = descriptionRaw !== undefined && descriptionRaw !== null
    ? (typeof descriptionRaw === 'string' && descriptionRaw.trim().startsWith('<')
        ? descriptionRaw
        : toHtmlContent(descriptionRaw))
    : undefined;
  const descriptionFinal = (description && description.trim()) ? description : undefined;

  // Extract Challenge fields
  const challengeHeading = attrs?.Challenge_heading || attrs?.challenge_heading || undefined;
  const challengeDescription = attrs?.Challenge_Description || attrs?.challenge_description || undefined;

  // Extract Approach fields
  const approachImageUrl = extractImageUrl(attrs?.Approach_image || attrs?.approach_image, strapiUrl);
  const approachText = attrs?.Approach_text || attrs?.approach_text || undefined;

  // Extract Solution fields
  const solutionText = attrs?.Solution_text || attrs?.solution_text || undefined;
  let solutionImages: Array<{ url: string }> | undefined;
  if (attrs?.Solution_images || attrs?.solution_images) {
    const solutionImagesField = attrs.Solution_images || attrs.solution_images;
    // Check if solutionImagesField is an object with a data property
    if (solutionImagesField && typeof solutionImagesField === 'object' && !Array.isArray(solutionImagesField) && 'data' in solutionImagesField && Array.isArray(solutionImagesField.data)) {
      solutionImages = solutionImagesField.data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((img: any) => {
          const url = extractImageUrl(img, strapiUrl);
          return url ? { url } : null;
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((img: any) => img !== null) as Array<{ url: string }>;
    } else if (Array.isArray(solutionImagesField)) {
      solutionImages = solutionImagesField
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((img: any) => {
          const url = extractImageUrl(img, strapiUrl);
          return url ? { url } : null;
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((img: any) => img !== null) as Array<{ url: string }>;
    }
    if (solutionImages && solutionImages.length === 0) {
      solutionImages = undefined;
    }
  }

  // Extract Impact fields (rich text)
  const impact1 = attrs?.Impact1 || attrs?.impact1 ? toHtmlContent(attrs.Impact1 || attrs.impact1) : undefined;
  const impact2 = attrs?.Impact2 || attrs?.impact2 ? toHtmlContent(attrs.Impact2 || attrs.impact2) : undefined;
  const impact3 = attrs?.Impact3 || attrs?.impact3 ? toHtmlContent(attrs.Impact3 || attrs.impact3) : undefined;

  return {
    id: item?.id ?? attrs?.id ?? 0,
    slug,
    title,
    tag: finalTag || 'Case Study',
    tags: tags.length > 0 ? tags : [finalTag || 'Case Study'],
    Tag1: attrs?.Tag1,
    Tag2: attrs?.Tag2,
    Tag3: attrs?.Tag3,
    content: toHtmlContent(attrs?.content || attrs?.Content || attrs?.body || attrs?.blocks || ''),
    cover: coverUrl ? { url: coverUrl } : undefined,
    logo: logoUrl ? { url: logoUrl } : undefined,
    authors,
    image: coverUrl ? { url: coverUrl } : undefined, // Image field is the main portfolio image
    description: descriptionFinal,
    Challenge_heading: challengeHeading,
    Challenge_Description: challengeDescription,
    Approach_image: approachImageUrl ? { url: approachImageUrl } : undefined,
    Approach_text: approachText,
    Solution_text: solutionText,
    Solution_images: solutionImages,
    Impact1: impact1,
    Impact2: impact2,
    Impact3: impact3,
  };
}

// Use populate=* only - nested populate for authors causes Strapi 500 Internal Server Error
// We'll fetch authors separately with avatars and merge them
const PORTFOLIO_POPULATE = 'populate=*';

// Fetch authors with avatars populated
// Note: API endpoint name might be 'authors', 'author', or something else - check your Strapi Content-Type
async function fetchAuthorsWithAvatars(authorIds: number[]): Promise<Map<number, { name: string; position: string; avatar?: { url: string } }>> {
  if (authorIds.length === 0) return new Map();

  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, '') || 'http://localhost:1337';
    const apiKey = process.env.STRAPI_API_KEY;
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (apiKey) {
      headers.Authorization = `Bearer ${apiKey}`;
    }

    const idsString = authorIds.join(',');
    
    // User confirmed endpoint names: 'author' (singular) and 'authors' (plural)
    // Strapi returns 500/400 errors with populate - try simpler approach
    const endpointNames = ['authors', 'author'];
    
    const authorsMap = new Map<number, { name: string; position: string; avatar?: { url: string } }>();
    
    // Try fetching authors individually instead of using filters[id][$in]
    // This might avoid the 500 error
    for (const endpointName of endpointNames) {
      try {
        // Strategy 1: Fetch all authors and filter client-side
        // This avoids the filters[id][$in] syntax that was causing 500 errors
        const urlAll = `${strapiUrl}/api/${endpointName}?populate[avatar]=true&pagination[limit]=100`;
        const responseAll = await fetch(urlAll, { headers, next: { revalidate: 3600 } });
        
        if (responseAll.ok) {
          const data = await responseAll.json();
          const allAuthors = Array.isArray(data?.data) ? data.data : [];
          
          // Filter to only the authors we need
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const neededAuthors = allAuthors.filter((author: any) => {
            const id = author.id || author.attributes?.id || author.documentId || author.attributes?.documentId;
            return id && authorIds.includes(Number(id));
          });
          
          if (neededAuthors.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            neededAuthors.forEach((author: any) => {
              const attrs = author.attributes || author;
              const id = author.id || attrs?.id || author.documentId || attrs?.documentId;
              if (!id) return;
              
              const avatarUrl = extractImageUrl(attrs?.avatar || author.avatar, strapiUrl);
              authorsMap.set(Number(id), {
                name: attrs?.name || author.name || 'Unknown',
                position: attrs?.position || attrs?.Position || attrs?.job || attrs?.Job || author.position || author.Job || '',
                avatar: avatarUrl ? { url: avatarUrl } : undefined,
              });
            });
            
            if (authorsMap.size > 0) return authorsMap;
          }
        }
        
        // Strategy 2: Fallback - try with filters[id][$in] (original approach)
        const url = `${strapiUrl}/api/${endpointName}?filters[id][$in]=${idsString}&populate[avatar]=true`;
        const response = await fetch(url, { headers, next: { revalidate: 3600 } });
        
        if (response.ok) {
          const data = await response.json();
          const authorsArray = Array.isArray(data?.data) ? data.data : [];

          if (authorsArray.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            authorsArray.forEach((author: any) => {
              const attrs = author.attributes || author;
              const id = author.id || attrs?.id || author.documentId || attrs?.documentId;
              if (!id) return;

              const avatarUrl = extractImageUrl(attrs?.avatar || author.avatar, strapiUrl);
              authorsMap.set(Number(id), {
                name: attrs?.name || author.name || 'Unknown',
                position: attrs?.position || attrs?.Position || attrs?.job || attrs?.Job || author.position || author.Job || '',
                avatar: avatarUrl ? { url: avatarUrl } : undefined,
              });
            });
            
            if (authorsMap.size > 0) return authorsMap;
          }
        }
      } catch {
        continue;
      }
      }

    return authorsMap;
  } catch {
    return new Map();
  }
}

// Extract author IDs from raw portfolio data
function extractAuthorIds(portfolios: RawPortfolio[]): number[] {
  const authorIds = new Set<number>();
  
  portfolios.forEach((item: RawPortfolio) => {
    const attrs = item?.attributes || item;
    const authorsField = attrs?.authors;
    
    if (!authorsField) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let authorsArray: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (authorsField && typeof authorsField === 'object' && 'data' in authorsField && Array.isArray((authorsField as any).data)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      authorsArray = (authorsField as any).data;
    } else if (Array.isArray(authorsField)) {
      authorsArray = authorsField;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } else if (authorsField && typeof authorsField === 'object' && 'data' in authorsField && !Array.isArray((authorsField as any).data)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      authorsArray = [(authorsField as any).data];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorsArray.forEach((author: any) => {
      // Try multiple ways to get the ID (Strapi can structure this differently)
      const id = author.id || author.attributes?.id || author.documentId || author.attributes?.documentId;
      if (id) authorIds.add(Number(id)); // Ensure it's a number
    });
  });

  return Array.from(authorIds);
}

export const getPortfolios = cache(async (): Promise<Portfolio[]> => {
  try {
    // Step 1: Fetch portfolios
    const response = await fetchFromStrapi(`/api/portfolios?${PORTFOLIO_POPULATE}`);
    const data = Array.isArray(response?.data) ? response.data : [];
    
    if (data.length === 0) return [];

    // Step 2: Extract author IDs and fetch authors with avatars
    // Avatars are NOT in portfolio response (populate=* doesn't populate nested relations)
    // We MUST fetch authors separately to get avatars
    const authorIds = extractAuthorIds(data);
    let authorsMap = new Map<number, { name: string; position: string; avatar?: { url: string } }>();
    
    if (authorIds.length > 0) {
      try {
        authorsMap = await fetchAuthorsWithAvatars(authorIds);
      } catch {
        // Silently fail - authors will show without avatars
      }
    }

    // Step 3: Transform portfolios and merge author avatars
    const portfolios = data.map((item: RawPortfolio) => {
      const portfolio = transformPortfolio(item);
      
      // Replace authors with enriched data from authorsMap
      if (portfolio.authors && portfolio.authors.length > 0) {
        const attrs = item?.attributes || item;
        const authorsField = attrs?.authors;
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let authorsArray: any[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (authorsField && typeof authorsField === 'object' && 'data' in authorsField && Array.isArray((authorsField as any).data)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          authorsArray = (authorsField as any).data;
        } else if (Array.isArray(authorsField)) {
          authorsArray = authorsField;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } else if (authorsField && typeof authorsField === 'object' && 'data' in authorsField && !Array.isArray((authorsField as any).data)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          authorsArray = [(authorsField as any).data];
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        portfolio.authors = authorsArray.map((author: any) => {
          // Try multiple ways to get the ID (must match extractAuthorIds and fetchAuthorsWithAvatars logic)
          const id = author.id || author.attributes?.id || author.documentId || author.attributes?.documentId;
          const enrichedAuthor = id && authorsMap.size > 0 ? authorsMap.get(Number(id)) : null;
          
          // Use enriched author if available (from separate fetch)
          if (enrichedAuthor) {
            return enrichedAuthor;
          }
          
          // Fallback: Extract from portfolio response (this is what we're using now)
          // Since separate fetch fails, rely on portfolio response
          // Author structure: hasAttributes: false, so check both top level and attrs
          const attrs = author.attributes || author;
          const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, '') || 'http://localhost:1337';
          
          const name = attrs?.name || author.name || 'Unknown';
          const position = attrs?.position || attrs?.Position || attrs?.job || attrs?.Job || author.position || author.Position || author.job || author.Job || '';
          
          // Try multiple ways to extract avatar from portfolio response
          let avatarUrl = extractImageUrl(attrs?.avatar, strapiUrl);
          
          // Check top level avatar (since hasAttributes: false)
          if (!avatarUrl && author.avatar) {
            avatarUrl = extractImageUrl(author.avatar, strapiUrl);
          }
          
          // If still not found, check deeper nested structures
          if (!avatarUrl) {
            // Check author.attributes.avatar.data.attributes.url
            if (attrs?.avatar?.data?.attributes?.url) {
              const url = attrs.avatar.data.attributes.url;
              avatarUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`;
            }
            // Check author.attributes.avatar.data.url
            else if (attrs?.avatar?.data?.url) {
              const url = attrs.avatar.data.url;
              avatarUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`;
            }
            // Check author.avatar.data.attributes.url (top level)
            else if (author.avatar?.data?.attributes?.url) {
              const url = author.avatar.data.attributes.url;
              avatarUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`;
            }
            // Check author.avatar.data.url (top level)
            else if (author.avatar?.data?.url) {
              const url = author.avatar.data.url;
              avatarUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`;
            }
          }
          
          return {
            name,
            position,
            avatar: avatarUrl ? { url: avatarUrl } : undefined,
          };
        });
      }
      
      return portfolio;
    });

    return portfolios.filter((item: Portfolio) => item.title && item.title !== 'Untitled Portfolio');
  } catch {
    return [];
  }
});

export const getPortfolioBySlug = cache(async (slug: string): Promise<Portfolio | null> => {
  try {
    // Reuse getPortfolios - avoids duplicate API calls (generateMetadata + page share cache)
    const portfolios = await getPortfolios();
    return portfolios.find((p) => p.slug === slug) ?? null;
  } catch {
    return null;
  }
});
