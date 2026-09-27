import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";

export const authInputClassName =
  "w-full rounded border border-white/10 bg-surface-container-lowest px-3.5 py-2.5 text-sm text-on-surface placeholder-on-surface-variant outline-none transition-colors focus:border-primary";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="w-full max-w-md rounded-lg border border-white/5 bg-surface-container-low p-8 shadow-2xl">
      <h1 className="font-display text-2xl font-bold text-on-surface">{title}</h1>
      <p className="mt-2 text-sm text-on-surface-variant">{subtitle}</p>
      <div className="mt-8">{children}</div>
      {footer ? (
        <div className="mt-8 text-center text-sm text-on-surface-variant">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

export function AuthField({
  label,
  id,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-on-surface-variant"
      >
        {label}
      </label>
      <input id={id} className={authInputClassName} {...inputProps} />
    </div>
  );
}

export function AuthError({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className="rounded border border-error/40 bg-error/10 px-4 py-3 text-sm text-error"
    >
      {message}
    </div>
  );
}

export function AuthSubmitButton({
  children,
  pending,
}: {
  children: ReactNode;
  pending: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="label-mono w-full rounded bg-primary px-4 py-2.5 text-xs font-bold text-on-primary transition-colors hover:bg-[#e9ddff] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Please wait..." : children}
    </button>
  );
}
