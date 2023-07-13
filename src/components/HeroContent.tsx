import { ReactNode } from "react";

type HeroContentProps = {
  heroText: string;
  lowerContent?: ReactNode;
};

export default function HeroContent({
  heroText,
  lowerContent,
}: HeroContentProps) {
  return (
    <div className="py-32 sm:py-48 lg:py-56">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          {heroText}
        </h1>
      </div>
      {lowerContent && (
        <div className="mt-20 flex items-center justify-center gap-x-6">
          {lowerContent}
        </div>
      )}
    </div>
  );
}
