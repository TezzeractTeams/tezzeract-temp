import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type PortfolioCardProps = {
  tag: string;
  caseStudyTitle: string;
  image: string;
};

export default function PortfolioCard({
  tag,
  caseStudyTitle,
  image,
}: PortfolioCardProps) {
  return (
    <div className="rounded-[30px] flex flex-col justify-end overflow-hidden relative group w-full aspect-[3/4] md:aspect-[4/3] cursor-pointer">
      {/* Background Image */}
      <Image
        src={image}
        alt={caseStudyTitle}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      
      {/* Gradient blur overlay */}
      <div 
        className="absolute bottom-0 sm:h-[40%] md:h-[60%] lg:h-[35%] left-0 right-0 pointer-events-none"
        style={{
        
          borderRadius: '0 0 30px 30px',
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 00%, rgba(4, 4, 4, 0.5) 100%)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 py-2 md:px-4 md:py-0 lg:py-10 lg:px-10 transition-transform duration-300 group-hover:-translate-y-2">
        {/* Tag */}
        <div className="mb-3 inline-block">
          <span
            className="text-[10px] md:text-[10px] lg:text-sm text-white font-light flex items-center justify-center w-[120px] h-[28px] md:w-[140px] md:h-[32px] lg:w-[172px] lg:h-[43px]"
            style={{
              borderRadius: '24px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#EBEBEB4D',
              background: 'radial-gradient(50.47% 50.47% at 55.88% 97.48%, rgba(253, 253, 253, 0.06) 0%, rgba(61, 61, 58, 0.3) 100%)',
              backdropFilter: 'blur(200px)',
              WebkitBackdropFilter: 'blur(200px)',
            }}
          >
            {tag}
          </span>
        </div>

        {/* Case Study Title */}
        <h3 className="text-sm sm:text-lg md:text-sm lg:text-2xl text-white font-light tracking-tight mb-4">
          {caseStudyTitle}
        </h3>

        {/* Read the Full Case Study Link - Hidden by default, appears on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white">
          <span className="text-sm font-light  underline">Read the Full Case Study</span>
          <ArrowUpRight className="h-4 w-4 shrink-0" />
        </div>
      </div>
    </div>
  );
}
