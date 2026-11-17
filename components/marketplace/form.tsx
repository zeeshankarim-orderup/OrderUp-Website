'use client';
import type { InputHTMLAttributes } from 'react';
export function Field({ label, error, hint, id, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string; id: string }) {
  return <div className="market-field"><label htmlFor={id}>{label}</label><input id={id} {...props} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}/>{hint && <small id={`${id}-hint`}>{hint}</small>}{error && <small className="field-error" id={`${id}-error`}>{error}</small>}</div>;
}
export function focusFirstError(errors: Record<string, string>) { document.getElementById(Object.keys(errors)[0])?.focus(); }
