// lib/strapi.ts
import { BlogPost } from './blogData';

interface StrapiArticle {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description?: string;
    content?: string;
    tag?: string;
    cover?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
    author?: {
      data?: {
        attributes: {
          name: string;
          position: string;
          avatar?: {
            data?: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

interface StrapiResponse {
  data: StrapiArticle[];
}

interface StrapiSingleResponse {
  data: StrapiArticle;
}

async function fetchFromStrapi(endpoint: string) {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 
    (process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : '');
  
  if (!strapiUrl) {
    throw new Error('NEXT_PUBLIC_STRAPI_URL environment variable is not set');
  }
  
  const apiKey = process.env.STRAPI_API_KEY;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  // Add API key to headers if provided
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }
  
  const fullUrl = `${strapiUrl}${endpoint}`;
  
  const res = await fetch(fullUrl, {
    headers,
    // Add cache revalidation for better performance
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch from Strapi: ${res.status} ${errorText}`);
  }
  
  return res.json();
}

function transformStrapiArticle(article: any): BlogPost {
  // Handle both Strapi v4 structure (with attributes) and potential other structures
  const attrs = article.attributes || article;
  
  if (!attrs) {
    console.error('Invalid article structure:', article);
    throw new Error('Invalid article structure');
  }
  
  // Extract cover URL - handle different possible structures
  let coverUrl: string | undefined;
  
  // Try all possible paths for cover image
  if (attrs.cover?.data?.attributes?.url) {
    coverUrl = attrs.cover.data.attributes.url;
  } else if (attrs.cover?.data?.attributes?.formats?.large?.url) {
    coverUrl = attrs.cover.data.attributes.formats.large.url;
  } else if (attrs.cover?.data?.attributes?.formats?.medium?.url) {
    coverUrl = attrs.cover.data.attributes.formats.medium.url;
  } else if (attrs.cover?.data?.attributes?.formats?.small?.url) {
    coverUrl = attrs.cover.data.attributes.formats.small.url;
  } else if (attrs.cover?.data?.url) {
    coverUrl = attrs.cover.data.url;
  } else if (attrs.cover?.attributes?.url) {
    coverUrl = attrs.cover.attributes.url;
  } else if (attrs.cover?.attributes?.formats?.large?.url) {
    coverUrl = attrs.cover.attributes.formats.large.url;
  } else if (attrs.cover?.url) {
    coverUrl = attrs.cover.url;
  } else if (typeof attrs.cover === 'string') {
    coverUrl = attrs.cover;
  }
  
  // Handle author as relation (author.data.attributes) or direct fields (author.name)
  let authorData: any = null;
  let avatarUrl: string | undefined;
  
  if (attrs.author?.data?.attributes) {
    // Author is a relation
    authorData = attrs.author.data.attributes;
    // Extract avatar - handle different structures (similar to cover)
    if (authorData.avatar?.data?.attributes?.url) {
      avatarUrl = authorData.avatar.data.attributes.url;
    } else if (authorData.avatar?.data?.attributes?.formats?.large?.url) {
      avatarUrl = authorData.avatar.data.attributes.formats.large.url;
    } else if (authorData.avatar?.data?.attributes?.formats?.medium?.url) {
      avatarUrl = authorData.avatar.data.attributes.formats.medium.url;
    } else if (authorData.avatar?.data?.attributes?.formats?.small?.url) {
      avatarUrl = authorData.avatar.data.attributes.formats.small.url;
    } else if (authorData.avatar?.data?.url) {
      avatarUrl = authorData.avatar.data.url;
    } else if (authorData.avatar?.attributes?.url) {
      avatarUrl = authorData.avatar.attributes.url;
    } else if (authorData.avatar?.attributes?.formats?.large?.url) {
      avatarUrl = authorData.avatar.attributes.formats.large.url;
    } else if (authorData.avatar?.url) {
      avatarUrl = authorData.avatar.url;
    } else if (typeof authorData.avatar === 'string') {
      avatarUrl = authorData.avatar;
    }
  } else if (attrs.author?.name) {
    // Author is direct fields on the article
    authorData = attrs.author;
    // Extract avatar - handle different structures
    if (attrs.author.avatar?.data?.attributes?.url) {
      avatarUrl = attrs.author.avatar.data.attributes.url;
    } else if (attrs.author.avatar?.data?.attributes?.formats?.large?.url) {
      avatarUrl = attrs.author.avatar.data.attributes.formats.large.url;
    } else if (attrs.author.avatar?.data?.attributes?.formats?.medium?.url) {
      avatarUrl = attrs.author.avatar.data.attributes.formats.medium.url;
    } else if (attrs.author.avatar?.data?.attributes?.formats?.small?.url) {
      avatarUrl = attrs.author.avatar.data.attributes.formats.small.url;
    } else if (attrs.author.avatar?.data?.url) {
      avatarUrl = attrs.author.avatar.data.url;
    } else if (attrs.author.avatar?.attributes?.url) {
      avatarUrl = attrs.author.avatar.attributes.url;
    } else if (attrs.author.avatar?.url) {
      avatarUrl = attrs.author.avatar.url;
    } else if (typeof attrs.author.avatar === 'string') {
      avatarUrl = attrs.author.avatar;
    }
  }
  
  // Build full URLs for images
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 
    (process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : '');
  
  const fullCoverUrl = coverUrl 
    ? (coverUrl.startsWith('http') ? coverUrl : `${strapiUrl}${coverUrl}`)
    : undefined;
  
  const fullAvatarUrl = avatarUrl
    ? (avatarUrl.startsWith('http') ? avatarUrl : `${strapiUrl}${avatarUrl}`)
    : '/default-avatar.png';
  
  // Convert blocks/dynamic zones content to HTML
  // Check for different possible field names (content, blocks, contentBlocks, etc.)
  // IMPORTANT: Make sure we're using content, not description
  // Also check for capitalized field names (Content, Blocks, etc.)
  let contentData = attrs.content || attrs.Content || attrs.blocks || attrs.Blocks || attrs.contentBlocks || attrs.body || attrs.Body;
  let htmlContent = '';
  
  if (contentData) {
    // If content is a JSON string, parse it first
    if (typeof contentData === 'string') {
      // Check if it's a JSON string (starts with { or [)
      if ((contentData.trim().startsWith('{') || contentData.trim().startsWith('[')) && !contentData.trim().startsWith('<')) {
        try {
          contentData = JSON.parse(contentData);
        } catch (e) {
          // If parsing fails, treat as HTML string
          htmlContent = contentData;
        }
      } else {
        // Already HTML string - use as is
        htmlContent = contentData;
      }
    }
    
    // Process parsed content or object content
    if (!htmlContent && contentData) {
      if (Array.isArray(contentData)) {
        // Blocks/dynamic zones array - convert to HTML
        htmlContent = convertBlocksToHTML(contentData, strapiUrl);
      } else if (contentData && typeof contentData === 'object') {
        // Handle Strapi rich text editor format (wrapped in "doc" type)
        if (contentData.type === 'doc' && contentData.children) {
          // Extract children from doc wrapper
          htmlContent = convertBlocksToHTML(contentData.children, strapiUrl);
        } else if (contentData.children && Array.isArray(contentData.children)) {
          // Has children array directly
          htmlContent = convertBlocksToHTML(contentData.children, strapiUrl);
        } else {
          // Might be a single block object, wrap in array
          htmlContent = convertBlocksToHTML([contentData], strapiUrl);
        }
      }
    }
  }
  
  // Extract tag - check for different possible field names (tag, Tag, category, Category, etc.)
  const tag = attrs.tag || attrs.Tag || attrs.category || attrs.Category || attrs.label || attrs.Label || undefined;
  
  return {
    id: article.id || attrs.id || 0,
    slug: attrs.slug || '',
    title: attrs.title || '',
    description: attrs.description || '',
    content: htmlContent,
    tag: tag,
    cover: fullCoverUrl ? { url: fullCoverUrl } : undefined,
    author: {
      name: authorData?.name || 'Unknown Author',
      // Check for Job (capitalized) or Title first, then lowercase variants
      position: authorData?.Job || authorData?.Title || authorData?.job || authorData?.position || '',
      avatar: fullAvatarUrl,
    },
  };
}

// Convert Strapi blocks/dynamic zones to HTML
function convertBlocksToHTML(blocks: any[], strapiUrl: string): string {
  if (!Array.isArray(blocks)) {
    return '';
  }
  
  return blocks.map(block => {
    // Handle Strapi dynamic zones (have __component field)
    if (block.__component) {
      return convertDynamicZoneBlock(block, strapiUrl);
    }
    
    // Handle Strapi rich text blocks (have type field)
    switch (block.type) {
      case 'paragraph':
        return `<p>${convertInlineNodes(block.children || [], strapiUrl)}</p>`;
      
      case 'heading':
        const level = block.level || 2;
        return `<h${level}>${convertInlineNodes(block.children || [], strapiUrl)}</h${level}>`;
      
      case 'list':
        const listTag = block.format === 'ordered' ? 'ol' : 'ul';
        const items = (block.children || []).map((item: any) => 
          `<li>${convertInlineNodes(item.children || [], strapiUrl)}</li>`
        ).join('');
        return `<${listTag}>${items}</${listTag}>`;
      
      case 'quote':
        return `<blockquote>${convertInlineNodes(block.children || [], strapiUrl)}</blockquote>`;
      
      case 'code':
        return `<pre><code>${escapeHtml(convertInlineNodes(block.children || [], strapiUrl))}</code></pre>`;
      
      case 'link':
        return `<a href="${block.url || '#'}" ${block.newTab ? 'target="_blank" rel="noopener noreferrer"' : ''}>${convertInlineNodes(block.children || [], strapiUrl)}</a>`;
      
      case 'image':
        const imageUrl = block.url || (block.image?.data?.attributes?.url || block.image?.url);
        const fullImageUrl = imageUrl 
          ? (imageUrl.startsWith('http') ? imageUrl : `${strapiUrl}${imageUrl}`)
          : '';
        return `<img src="${fullImageUrl}" alt="${block.alt || ''}" />`;
      
      default:
        // For unknown block types, try to render children if available
        if (block.children) {
          return convertInlineNodes(block.children, strapiUrl);
        }
        // Try to render as rich text if it has body/content
        if (block.body) {
          return convertBlocksToHTML(Array.isArray(block.body) ? block.body : [block.body], strapiUrl);
        }
        if (block.content) {
          return typeof block.content === 'string' ? block.content : convertBlocksToHTML(Array.isArray(block.content) ? block.content : [block.content], strapiUrl);
        }
        return '';
    }
  }).join('\n');
}

// Convert Strapi dynamic zone blocks
function convertDynamicZoneBlock(block: any, strapiUrl: string): string {
  const component = block.__component;
  
  // Handle rich text component
  if (component.includes('rich-text') || component.includes('richtext')) {
    if (block.body) {
      return convertBlocksToHTML(Array.isArray(block.body) ? block.body : [block.body], strapiUrl);
    }
    if (block.content) {
      return typeof block.content === 'string' ? block.content : convertBlocksToHTML(Array.isArray(block.content) ? block.content : [block.content], strapiUrl);
    }
  }
  
  // Handle paragraph component
  if (component.includes('paragraph') && block.text) {
    return `<p>${escapeHtml(block.text)}</p>`;
  }
  
  // Handle heading component
  if (component.includes('heading') && block.text) {
    const level = block.level || 2;
    return `<h${level}>${escapeHtml(block.text)}</h${level}>`;
  }
  
  // Handle image component
  if (component.includes('image')) {
    const imageUrl = block.image?.data?.attributes?.url || block.image?.url || block.url;
    const fullImageUrl = imageUrl 
      ? (imageUrl.startsWith('http') ? imageUrl : `${strapiUrl}${imageUrl}`)
      : '';
    return `<img src="${fullImageUrl}" alt="${block.alt || block.caption || ''}" />`;
  }
  
  // Default: try to render any text/content fields
  if (block.text) {
    return `<p>${escapeHtml(block.text)}</p>`;
  }
  if (block.content) {
    return typeof block.content === 'string' ? block.content : '';
  }
  
  return '';
}

// Convert inline nodes (text, bold, italic, etc.) to HTML
function convertInlineNodes(nodes: any[], strapiUrl: string): string {
  if (!Array.isArray(nodes)) {
    return '';
  }
  
  return nodes.map(node => {
    if (typeof node === 'string') {
      return escapeHtml(node);
    }
    
    if (node.type === 'text') {
      let text = escapeHtml(node.text || '');
      
      // Apply formatting
      if (node.bold) text = `<strong>${text}</strong>`;
      if (node.italic) text = `<em>${text}</em>`;
      if (node.underline) text = `<u>${text}</u>`;
      if (node.strikethrough) text = `<s>${text}</s>`;
      if (node.code) text = `<code>${text}</code>`;
      
      return text;
    }
    
    if (node.type === 'link') {
      return `<a href="${node.url || '#'}" ${node.newTab ? 'target="_blank" rel="noopener noreferrer"' : ''}>${convertInlineNodes(node.children || [], strapiUrl)}</a>`;
    }
    
    return '';
  }).join('');
}

// Escape HTML to prevent XSS
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

export async function getPosts(): Promise<BlogPost[]> {
  try {
    // For media fields (cover, avatar), don't use wildcards - just specify the field
    // For relations (author), use populate to get nested fields
    const populate = 'populate[cover]=true&populate[author][populate][avatar]=true';
    const response = await fetchFromStrapi(`/api/articles?${populate}`) as any;
    
    // Handle different response structures
    let articles: any[] = [];
    if (response.data && Array.isArray(response.data)) {
      articles = response.data;
    } else if (Array.isArray(response)) {
      articles = response;
    } else {
      console.error('Unexpected Strapi response structure:', response);
      return [];
    }
    
    return articles.map(transformStrapiArticle);
  } catch (error) {
    console.error('Error fetching posts from Strapi:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // For media fields (cover, avatar), don't use wildcards - just specify the field
    // For relations (author), use populate to get nested fields
    const populate = 'populate[cover]=true&populate[author][populate][avatar]=true';
    const filters = `filters[slug][$eq]=${slug}`;
    const response = await fetchFromStrapi(`/api/articles?${populate}&${filters}`) as any;
    
    // Handle different response structures
    let articles: any[] = [];
    if (response.data && Array.isArray(response.data)) {
      articles = response.data;
    } else if (Array.isArray(response)) {
      articles = response;
    } else if (response.data && !Array.isArray(response.data)) {
      // Single article response
      articles = [response.data];
    }
    
    if (articles.length === 0) {
      return null;
    }
    
    return transformStrapiArticle(articles[0]);
  } catch (error) {
    console.error('Error fetching post from Strapi:', error);
    return null;
  }
}