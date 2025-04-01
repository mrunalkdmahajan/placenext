import { LabelHTMLAttributes, forwardRef } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className="text-sm font-medium text-gray-700"
        ref={ref}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";