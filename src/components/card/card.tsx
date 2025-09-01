"use client";
import { Button } from "../buttons";

type CardProps = {
  id: number;
  title: string;
  children: React.ReactNode;
  iconRight?: string;
  iconLeft?: string;
  className?: string;
  buttonClasses?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function Card({
  title,
  children,
  iconRight,
  iconLeft,
  className,
  buttonClasses,
  onClick,
}: CardProps) {
  return (
    <div
      className={`h-full p-4 border rounded-lg shadow hover:shadow-md cursor-pointer transition ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        {iconLeft && (
          <Button
            className={buttonClasses}
            onClick={onClick}
            iconLeft={iconLeft}
          />
        )}
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        {iconRight && (
          <Button
            className={buttonClasses}
            onClick={onClick}
            iconLeft={iconRight}
          />
        )}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export { Card };
