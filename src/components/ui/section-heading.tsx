
import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  subtitleClassName?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const SectionHeading = ({
  title,
  subtitle,
  centered = true,
  className,
  subtitleClassName,
  as: Heading = "h2",
}: SectionHeadingProps) => {
  return (
    <div className={cn(centered ? "text-center" : "text-left", "mb-12")}>
      <Heading className={cn("text-3xl md:text-4xl font-bold mb-3 text-hearlink-900", className)}>
        {title}
      </Heading>
      {subtitle && (
        <p className={cn("text-lg text-muted-foreground max-w-3xl mx-auto", centered ? "mx-auto" : "", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
