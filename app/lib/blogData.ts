export interface BlogAuthor {
  name: string;
  position: string;
  avatar: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  cover?: {
    url: string;
  };
  tag?: string;
  author: BlogAuthor;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "how-startups-scale-without-hiring",
    title: "How Startups Scale Without Hiring Full-Time Employees",
    description: "Startups don't scale by hiring more people—they scale by accessing the right capabilities. Discover how remote and subscription-based teams help founders grow faster without the risk and cost of full-time hiring.",
    cover: {
      url: "/assets/blog1.png"
    },
    tag: "Startup",
    author: {
      name: "Wehan Withana",
      position: "Head of Development Services",
      avatar: "/assets/users/user2 Medium.jpeg"
    }
  },
  {
    id: 2,
    slug: "lean-startup-team-model",
    title: "The Lean Startup Team Model: Building More With Fewer People",
    description: "Early-stage startups grow faster by staying lean. Learn how small, cross-functional teams help founders move faster, reduce burn rate, and maximize impact.",
    cover: {
      url: "/assets/blog2.png"
    },
    tag: "Startup",
    author: {
      name: "Sarah Johnson",
      position: "Product Strategy Lead",
      avatar: "/assets/users/user1 Medium.jpeg"
    }
  },
  {
    id: 3,
    slug: "remote-teams-as-a-service",
    title: "Remote Teams as a Service: A New Way for Founders to Scale",
    description: "Remote teams as a service help founders scale faster without the cost and risk of traditional hiring by offering flexible, subscription-based teams built for growth.",
    cover: {
      url: "/assets/blog3.png"
    },
    tag: "Teams",
    author: {
      name: "Michael Chen",
      position: "Operations Director",
      avatar: "/assets/users/user3 Medium.jpeg"
    }
  },
  {
    id: 4,
    slug: "introduction-to-geo-ai-driven-search",
    title: "Introduction to GEO: Optimizing Content for AI-Driven Search",
    description: "As search continues to evolve, ranking on Google is no longer the final goal. Today, AI systems interpret, summarize, and present information directly to users.",
    cover: {
      url: "/assets/blog4.png"
    },
    tag: "SEO",
    author: {
      name: "Emily Rodriguez",
      position: "Content Marketing Manager",
      avatar: "/assets/users/user4 Medium.jpeg"
    }
  },
  // Add more posts as needed
];
  
  export function getBlogPosts(): BlogPost[] {
    return blogPosts;
  }

  export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug);
  }