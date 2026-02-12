import Image from 'next/image';
import { notFound } from 'next/navigation';
import TezzeractH1 from '@/app/components/ui/TezzeractH1';
import { getPortfolioBySlug, getPortfolios } from '@/app/lib/portfolio';
import ScrollToTop from '@/app/components/ScrollToTop';

export async function generateStaticParams() {
  const portfolios = await getPortfolios();
  return portfolios.map((portfolio) => ({
    slug: portfolio.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    return {
      title: 'Portfolio Not Found',
    };
  }

  return {
    title: portfolio.title,
    description: portfolio.tag || 'Portfolio case study',
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      {portfolio.cover && (
        <div className="w-full h-[380px] md:h-[500px] relative overflow-hidden">
          <Image
            src={portfolio.cover.url}
            alt={portfolio.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <article className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="mb-6 inline-block">
          <span
            className="text-xs sm:text-sm md:text-base font-light inline-block px-6 py-1 rounded-[24px]"
            style={{
              background:
                'radial-gradient(50.47% 50.47% at 55.88% 97.48%, rgba(155, 155, 155, 0.3) 0%, rgba(253, 253, 253, 0.06) 100%)',
              border: '1px solid #5F5F5F4D',
            }}
          >
            <span
              style={{
                background: 'linear-gradient(257.31deg, #2B2B2B 16.02%, #4A4A4A 49.66%, #505050 83.98%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {portfolio.tag || 'Case Study'}
            </span>
          </span>
        </div>

        <TezzeractH1 variant="dark" className="text-3xl md:text-5xl lg:text-6xl mb-8">
          {portfolio.title}
        </TezzeractH1>

        <div className="blog-content">
          <div dangerouslySetInnerHTML={{ __html: portfolio.content || '<p>No content available.</p>' }} />
        </div>
      </article>
    </div>
  );
}
