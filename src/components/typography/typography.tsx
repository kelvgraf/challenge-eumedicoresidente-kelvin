interface TypographyProps {
  text: string;
  className?: string;
  length?: number;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "strong";
}

function Typography({ variant, text, className, length }: TypographyProps) {
  const Component = variant || "span";

  const textTranslation = text;

  return (
    <Component className={className}>
      {length && textTranslation.length > length ? (
        <>{textTranslation.substring(0, length)}...</>
      ) : (
        textTranslation
      )}
    </Component>
  );
}

export { Typography };
