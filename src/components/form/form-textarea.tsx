"use client";

import { KeyboardEventHandler, forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { useFormStatus } from "react-dom";

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      className,
      defaultValue,
      disabled,
      errors,
      label,
      onBlur,
      onClick,
      onKeyDown,
      placeholder,
      required,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onClick={onClick}
            ref={ref}
            required={required}
            placeholder={placeholder}
            name={id}
            id={id}
            disabled={disabled || pending}
            className={cn(
              "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus-within:ring-0 outline-none shadow-sm",
              className
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
