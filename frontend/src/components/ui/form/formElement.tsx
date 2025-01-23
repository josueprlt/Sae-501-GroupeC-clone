"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface FormElementProps {
  label: string;
  variant: "input" | "textarea" | "file";
  type?: string;
  id: string;
  name: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  rows?: number;
  accept?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function FormElement({
  label,
  variant,
  type,
  id,
  name,
  placeholder,
  maxLength,
  required,
  rows,
  accept,
  value,
  onChange,
  ...rest
}: FormElementProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName(null);
    }
    if (onChange) onChange(event);
  };

  return (
    <li className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      {variant === "input" && (
        <Input
          placeholder={placeholder}
          type={type}
          maxLength={maxLength}
          required={required}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
      {variant === "textarea" && (
        <textarea
          className="p-1.5 border-border border rounded-lg focus:border-border bg-background"
          name={name}
          id={id}
          maxLength={maxLength}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
      {variant === "file" && (
        <>
          <input
            className="hidden"
            type="file"
            id={id}
            name={name}
            accept={accept}
            onChange={handleFileChange}
            required={required}
            {...rest}
          />
          <label
            htmlFor={id}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md w-fit cursor-pointer"
          >
            {fileName ? fileName : "Choisir un fichier"}
          </label>
        </>
      )}
    </li>
  );
}