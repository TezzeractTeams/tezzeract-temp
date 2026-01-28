// lib/strapi.ts
export async function getPosts() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const apiKey = process.env.STRAPI_API_KEY;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  // Add API key to headers if provided
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }
  
  // Use proper Strapi v4 populate syntax for media fields
  // For media fields, we need to specify fields explicitly to avoid validation errors
  // populate=cover will populate the cover field with its basic attributes
  const res = await fetch(`${strapiUrl}/api/articles?populate=cover`, {
    headers,
    // Add cache revalidation for better performance
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch posts: ${res.status} ${errorText}`);
  }
  
  return res.json();
}