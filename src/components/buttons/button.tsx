import clsx from "clsx";

import { Icons } from "@/components/icon";
import { Spinner } from "@/components/spinner";
import { Typography } from "@/components/typography";
import type { ButtonProps as ButtonUIProps } from "@/components/ui/button";
import { Button as ButtonUI } from "@/components/ui/button";

interface ButtonProps extends ButtonUIProps {
  text?: string;
  href?: string;
  isLoading?: boolean;
  iconRight?: string;
  iconLeft?: string;
}

function Button({
  text,
  href,
  disabled,
  isLoading,
  iconLeft,
  iconRight,
  className,
  ...rest
}: ButtonProps) {
  return (
    <ButtonUI
      disabled={disabled || isLoading}
      className={clsx("flex gap-2", className)}
      {...rest}
      asChild={!!href}
    >
      {isLoading ? (
        <Spinner className="w-6 h-6" />
      ) : (
        <>
          {iconLeft && <Icons name={iconLeft} />}

          {text && <Typography text={text} />}

          {iconRight && <Icons name={iconRight} />}
        </>
      )}
    </ButtonUI>
  );
}

export { Button };
export type { ButtonProps };
