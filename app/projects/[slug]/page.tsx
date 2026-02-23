import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPortfolioBySlug, getPortfolios } from '@/app/lib/portfolio';
import ScrollToTop from '@/app/components/ScrollToTop';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

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
      title: 'Project Not Found',
    };
  }

  return {
    title: portfolio.title,
    description: portfolio.tag || 'Project case study',
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    notFound();
  }

  // Use the tags array from portfolio, or fallback to 'Case Study'
  const tags = portfolio.tags && portfolio.tags.length > 0 ? portfolio.tags : ['Case Study'];

  return (
    <div className="min-h-screen bg-white font-manrope">
      <ScrollToTop />
      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-30">
      

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-3 pt-6 mb-12">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs md:text-sm font-light px-8 py-2.5 rounded-full border border-gray-100 text-gray-500 bg-[#F9F9F9]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <div className="max-w-5xl mx-auto text-center mb-16 px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 leading-tighter mb-4">
            {portfolio.title}
          </h1>
        </div>

        {/* Team Members */}
        {portfolio.authors && portfolio.authors.length > 0 && (
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 mb-24">
            {portfolio.authors.map((author, index) => (
              <div key={index} className="flex items-center gap-4">
                {author.avatar && (
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <Image
                      src={author.avatar.url}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="text-left">
                  <p className="text-xl font-light text-gray-900 leading-tight">{author.name}</p>
                  <p className="text-base font-light text-gray-400 leading-tight mt-1">{author.position}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hero Image / Showcase Section */}
        {(portfolio.image || portfolio.cover) && (
          <div className="relative w-full aspect-[16/10] mb-32 px-4 md:px-0">
            <div className="w-full h-full bg-[#F5F5F5] rounded-[32px] md:rounded-[64px] overflow-hidden flex items-center justify-center p-8 md:p-20 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.08)] border border-gray-100">
              <div className="relative w-full h-full max-w-4xl mx-auto flex items-center justify-center group">
                <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                  <Image
                    src={(portfolio.image || portfolio.cover)!.url}
                    alt={portfolio.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Introduction Text */}
        {(portfolio.description || portfolio.content) && (
          <div className="max-w-3xl mx-auto text-center px-6 mb-32">
            <div
              className="portfolio-content text-xl md:text-2xl text-gray-400 font-light leading-relaxed space-y-8"
              dangerouslySetInnerHTML={{ __html: portfolio.description || portfolio.content || '' }}
            />
          </div>
        )}
      </main>

      {/* Gray Background Wrapper for Challenge & Approach */}
      <div className="bg-[#F4F4F4] py-32">
        <div className="max-w-7xl mx-auto px-4">
          {/* The Challenge Section */}
          {(portfolio.Challenge_heading || portfolio.Challenge_Description) && (
            <section className="mb-48">
              <h2 className="text-4xl md:text-6xl font-light text-center text-gray-900 mb-20 px-4">The Challenge</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start max-w-6xl mx-auto px-6">
                {portfolio.Challenge_heading && (
                  <div className="text-3xl md:text-5xl font-light leading-tight text-gray-900 tracking-tight">
                    &ldquo;{portfolio.Challenge_heading}&rdquo;
                  </div>
                )}
                {portfolio.Challenge_Description && (
                  <div className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
                    <p>{portfolio.Challenge_Description}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Our Approach Section */}
          {(portfolio.Approach_text || portfolio.Approach_image) && (
            <section>
              <h2 className="text-4xl md:text-6xl font-light text-center text-gray-900 mb-20 px-4">Our Approach</h2>
              {portfolio.Approach_text && (
                <div className="max-w-3xl mx-auto text-center px-6 mb-12">
                  <div
                    className="text-lg md:text-xl text-gray-500 font-light leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: portfolio.Approach_text }}
                  />
                </div>
              )}
              {portfolio.Approach_image && (
                <div className="w-full aspect-video bg-white rounded-[32px] md:rounded-[64px] border border-gray-100 mb-12 flex items-center justify-center shadow-sm overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={portfolio.Approach_image.url}
                      alt="Our Approach"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-32">
        {/* Solution Gallery Section */}
        {(portfolio.Solution_text || (portfolio.Solution_images && portfolio.Solution_images.length > 0)) && (
          <section className="mb-32">
            <h2 className="text-4xl md:text-6xl font-light text-center text-gray-900 mb-16 px-4">Solution</h2>
            {portfolio.Solution_text && (
              <div className="max-w-5xl mx-auto text-center text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-16 px-6">
                <div dangerouslySetInnerHTML={{ __html: portfolio.Solution_text }} />
              </div>
            )}

            {portfolio.Solution_images && portfolio.Solution_images.length > 0 && (
              <div className="space-y-8">
                {/* Main Mockup - First image */}
                {portfolio.Solution_images[0] && (
                  <div className="w-full aspect-[16/10] bg-[#F5F5F5] rounded-[32px] md:rounded-[64px] flex items-center justify-center p-8 md:p-20 border border-gray-100 overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={portfolio.Solution_images[0].url}
                        alt="Solution Main"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Sub Grid - Remaining images (max 2) */}
                {portfolio.Solution_images.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {portfolio.Solution_images.slice(1, 3).map((img, index) => (
                      <div key={index} className="aspect-square bg-[#F5F5F5] rounded-[32px] md:rounded-[64px] p-8 md:p-12 border border-gray-100 overflow-hidden">
                        <div className="w-full h-full relative">
                          <Image
                            src={img.url}
                            alt={`Solution Side ${index + 1}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* The Impact Section */}
        {(portfolio.Impact1 || portfolio.Impact2 || portfolio.Impact3) && (
          <section className="mb-12">
            <h2 className="text-4xl md:text-6xl font-light text-center text-gray-900 mb-20 px-4">The Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-6xl mx-auto px-6">
              {[portfolio.Impact1, portfolio.Impact2, portfolio.Impact3]
                .filter((impact) => impact)
                .map((impact, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="impact-content text-gray-500 font-light leading-relaxed max-w-[280px] mx-auto [&_strong]:font-semibold [&_strong]:text-gray-700 [&_em]:italic [&_u]:underline [&_a]:text-gray-700 [&_a]:underline [&_a:hover]:text-gray-900 [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_h1]:text-2xl [&_h1]:font-light [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-light [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-light [&_h3]:mb-2 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-2 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-2"
                      dangerouslySetInnerHTML={{ __html: impact! }}
                    />
                  </div>
                ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
