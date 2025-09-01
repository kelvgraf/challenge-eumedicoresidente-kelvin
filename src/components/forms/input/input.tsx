"use client";

import { InputFeedbackMsg } from "@/components/forms/input-feedback-msg";
import { Label } from "@/components/forms/label";
import { Icons, IconSaxNames } from "@/components/icon";
import type { InputProps as InputUIProps } from "@/components/ui/input";
import { Input as InputUI } from "@/components/ui/input";

interface InputProps extends InputUIProps {
  placeholder: string;
  id?: string;
  label?: string;
  name?: string;
  className?: string;
  type?: string;
  errorMsg?: string;
  successMsg?: string;
  warningMsg?: string;
  iconLeft?: IconSaxNames;
  iconRight?: IconSaxNames;
  onClickIcon?: () => void;
}

function Input({
  id,
  name,
  label,
  type = "text",
  className,
  placeholder,
  errorMsg,
  successMsg,
  warningMsg,
  iconLeft,
  iconRight,
  onClickIcon,
  onChange,
  size,
  ...rest
}: InputProps) {
  return (
    <div className={`relative flex flex-col gap-1 ${className || ""}`}>
      {label && <Label label={label} id={id || name} />}

      {iconLeft && (
        <div
          onClick={onClickIcon}
          className={`absolute left-3 ${
            size === "lg" ? "top-3.5" : size === "md" ? "top-3" : "top-2"
          } ${onClickIcon ? "cursor-pointer" : ""}`}
        >
          <Icons name={iconLeft} className="stroke-gray-600" size={18} />
        </div>
      )}

      {name ? (
        <InputUI
          type={type}
          {...rest}
          placeholder={placeholder}
          variant={
            errorMsg
              ? "error"
              : successMsg
              ? "success"
              : warningMsg
              ? "warning"
              : "default"
          }
        />
      ) : (
        <InputUI
          type={type}
          {...rest}
          id={id || name}
          size={size}
          onChange={(e) => {
            const event = {
              target: {
                value: e.target.value,
              },
            } as React.ChangeEvent<HTMLInputElement>;

            onChange?.(event);
          }}
          placeholder={placeholder}
          className={iconRight ? "pr-9" : iconLeft ? "pl-9" : ""}
        />
      )}

      {iconRight && (
        <div
          onClick={onClickIcon}
          className={`absolute right-3 ${
            size === "lg" ? "top-3.5" : size === "md" ? "top-3" : "top-2"
          } ${onClickIcon ? "cursor-pointer" : ""}`}
        >
          <Icons name={iconRight} className="stroke-gray-600" size={18} />
        </div>
      )}

      <InputFeedbackMsg success={successMsg} warning={warningMsg} />
    </div>
  );
}

export { Input };
export type { InputProps };
