"use client";
import * as IconsSax from "iconsax-react";
type IconSaxNames = keyof typeof IconsSax;

interface IconsProps {
  name: IconSaxNames | string;
  className?: string;
  size?: number;
  variant?: "Linear" | "Outline" | "Broken" | "Bold" | "Bulk" | "TwoTone";
  color?: string;
}

function Icons({ name, className, size, variant, color }: IconsProps) {
  const IconComponent = IconsSax[name as IconSaxNames];

  if (!IconComponent) {
    throw new Error(`Icon ${name} not found`);
  }

  return (
    <IconComponent
      className={className}
      size={size}
      variant={variant}
      color={color}
    />
  );
}

export { Icons };
export type { IconSaxNames };
