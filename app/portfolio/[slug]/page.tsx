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

  // Split tags if they are comma separated
  const tags = portfolio.tag ? portfolio.tag.split(',').map(t => t.trim()) : ['Case Study'];

  // Mock team members - in a real app, these would come from the portfolio data
  const teamMembers = [
    { name: "Jane", title: "Head of Engineering", image: "/assets/avatars/nataly.jpeg" },
    { name: "Nikolas", title: "Head of Engineering", image: "/assets/avatars/shanilka.jpeg" },
    { name: "Ana", title: "Head of Engineering", image: "/assets/avatars/oneli.png" },
  ];

  return (
    <div className="min-h-screen bg-white font-manrope">
      <ScrollToTop />
      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-48">
        {/* Logo - Centered */}
        <div className="flex justify-center mb-16">
          <Image
            src="/assets/clients/uncamino.svg"
            alt="Client Logo"
            width={160}
            height={50}
            className="opacity-90"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 mb-24">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-xl font-light text-gray-900 leading-tight">{member.name}</p>
                <p className="text-base font-light text-gray-400 leading-tight mt-1">{member.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Image / Showcase Section */}
        <div className="relative w-full aspect-[16/10] mb-32 px-4 md:px-0">
          <div className="w-full h-full bg-[#F5F5F5] rounded-[32px] md:rounded-[64px] overflow-hidden flex items-center justify-center p-8 md:p-20 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.08)] border border-gray-100">
            <div className="relative w-full h-full max-w-4xl mx-auto flex items-center justify-center group">
              {portfolio.cover && (
                <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                  <Image
                    src={portfolio.cover.url}
                    alt={portfolio.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Introduction Text */}
        <div className="max-w-3xl mx-auto text-center px-6 mb-32">
          <div
            className="portfolio-content text-xl md:text-2xl text-gray-400 font-light leading-relaxed space-y-8"
            dangerouslySetInnerHTML={{ __html: portfolio.content || '<p>Tezzeract focuses on helping businesses grow digitally by providing end-to-end digital solutions.</p>' }}
          />
        </div>
      </main>

      {/* Gray Background Wrapper for Challenge & Approach */}
      <div className="bg-[#F4F4F4] py-32">
        <div className="max-w-7xl mx-auto px-4">
          {/* The Challenge Section */}
          <section className="mb-48">
            <h2 className="text-4xl md:text-6xl font-light text-center text-gray-900 mb-20 px-4">The Challenge</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start max-w-6xl mx-auto px-6">
              <div className="text-3xl md:text-5xl font-light leading-tight text-gray-900 tracking-tight">
                &ldquo;Our website was outdated and brand wanted a fresh look.&rdquo;
              </div>
              <div className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
                <p>
                  Tezzeract focuses on helping businesses grow digitally by providing end-to-end digital solutions.
                  We work with companies to build scalable products that meet their business goals and user needs.
                  Our team of experts focuses on delivering high-quality results that drive growth and engagement.
                </p>
              </div>
            </div>
          </section>

          {/* Our Approach Section */}
          <section>
            <h2 className="text-4xl md:text-6xl font-light text-center text-gray-900 mb-20 px-4">Our Approach</h2>
            <div className="w-full aspect-video bg-white rounded-[32px] md:rounded-[64px] border border-gray-100 mb-12 flex items-center justify-center shadow-sm">
              {/* This would be an approach image or visual */}
              <div className="w-24 h-24 rounded-full border border-gray-200 flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-50 rounded-lg"></div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-32">
        {/* Solution Gallery Section */}
        <section className="mb-32">
          <h2 className="text-4xl md:text-6xl font-light text-center text-gray-900 mb-16 px-4">Solution</h2>
          <div className="max-w-5xl mx-auto text-center text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-16 px-6">
            The revamped digital presence has enhanced the hotel's online visibility and user engagement.
            Guests can now effortlessly explore room options, amenities, and make reservations, leading to increased bookings and customer satisfaction.
          </div>

          <div className="space-y-8">
            {/* Main Mockup */}
            <div className="w-full aspect-[16/10] bg-[#F5F5F5] rounded-[32px] md:rounded-[64px] flex items-center justify-center p-8 md:p-20 border border-gray-100 overflow-hidden">
              <div className="relative w-full h-full">
                {portfolio.cover && (
                  <Image
                    src={portfolio.cover.url}
                    alt="Solution Main"
                    fill
                    className="object-contain"
                  />
                )}
              </div>
            </div>

            {/* Sub Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-[#F5F5F5] rounded-[32px] md:rounded-[64px] p-8 md:p-12 border border-gray-100 overflow-hidden">
                {/* Placeholder for secondary asset */}
                <div className="w-full h-full relative">
                  {portfolio.cover && (
                    <Image
                      src={portfolio.cover.url}
                      alt="Solution Side 1"
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
              </div>
              <div className="aspect-square bg-[#F5F5F5] rounded-[32px] md:rounded-[64px] flex items-center justify-center border border-gray-100 overflow-hidden">
                {/* Placeholder for mobile asset - using cover as placeholder */}
                <div className="relative w-full h-[80%]">
                  {portfolio.cover && (
                    <Image
                      src={portfolio.cover.url}
                      alt="Solution Side 2"
                      fill
                      className="object-contain grayscale opacity-50"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Impact Section */}
        <section className="mb-12">
          <h2 className="text-4xl md:text-6xl font-light text-center text-gray-900 mb-20 px-4">The Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-6xl mx-auto px-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="text-5xl md:text-6xl font-light text-gray-900 mb-6 ">40%</div>
                <div className="text-gray-500 font-light leading-relaxed max-w-[280px] mx-auto">
                  The revamped digital presence has enhanced the hotel's online visibility
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
