import React from "react";

// Card
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="rounded-lg border bg-white shadow-sm"
      {...props}
    />
  );
}

// Card Header
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="flex flex-col space-y-1.5 p-6"
      {...props}
    />
  );
}

// Card Title
export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className="text-xl font-semibold leading-none tracking-tight"
      {...props}
    />
  );
}

// Card Description
export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className="text-sm text-gray-500"
      {...props}
    />
  );
}

// Card Content
export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="p-6 pt-0"
      {...props}
    />
  );
}

// Card Footer
export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="flex items-center p-6 pt-0"
      {...props}
    />
  );
}
