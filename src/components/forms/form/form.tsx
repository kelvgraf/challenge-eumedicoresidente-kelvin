import React from "react";

interface FormProps {
  className?: string;
  children: React.ReactNode;
  onSubmit: () => void;
}

function Form({ children, onSubmit, className }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
}

export { Form };
export type { FormProps };
