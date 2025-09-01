"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center shadow-sm rounded-lg text-sm font-medium ring-offset-primary-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-400 text-neutral-100 hover:bg-primary-500 stroke-neutral-100 hover:shadow-primary-400",
        primaryLink:
          "text-primary-400 hover:text-primary-200 stroke-primary-400 hover:stroke-primary-200 shadow-none",
        red: "bg-error-400 text-neutral-100 hover:bg-error-500 stroke-neutral-100 hover:shadow-error-400",
        redLink:
          "text-error-400 hover:text-error-200 stroke-error-400 hover:stroke-error-600 shadow-none",
        success:
          "bg-success-400 text-neutral-100 hover:bg-success-500 stroke-neutral-100 hover:shadow-success-400",
        successLink:
          "text-success-400 stroke-success-400 hover:text-success-200 shadow-none",
        gray: "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 stroke-gray-900 dark:stroke-gray-100 hover:shadow-gray-300 dark:hover:shadow-gray-700",
        grayLink:
          "text-gray-900 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 stroke-gray-900 dark:stroke-gray-500 hover:stroke-gray-600 dark:hover:stroke-gray-300 shadow-none",
      },
      size: {
        sm: "h-8 text-xs rounded-md px-3 [&>svg]:w-3 [&>svg]:h-3",
        md: "h-10 rounded-md px-4 [&>svg]:w-4 [&>svg]:h-4",
        lg: "h-12 rounded-md px-6 [&>svg]:w-5 [&>svg]:h-5",
        "icon-sm": "h-8 w-8 [&>svg]:w-5 [&>svg]:h-5",
        "icon-md": "h-10 w-10 [&>svg]:w-6 [&>svg]:h-6",
        "icon-lg": "h-12 w-12 [&>svg]:w-7 [&>svg]:h-7",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={twMerge(clsx(buttonVariants({ variant, size, className })))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
