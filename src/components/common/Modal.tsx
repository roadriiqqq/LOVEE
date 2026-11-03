import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  label: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, label, closeLabel, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? []);
    const first = focusable()[0];
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const elements = focusable();
      if (!elements.length) return;
      const current = document.activeElement;
      const index = elements.indexOf(current as HTMLElement);
      const next = e.shiftKey ? (index <= 0 ? elements.length - 1 : index - 1) : (index === elements.length - 1 ? 0 : index + 1);
      e.preventDefault();
      elements[next].focus();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={label} className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <button type="button" tabIndex={-1} aria-label={closeLabel} onClick={onClose} className="absolute inset-0 animate-fade-in bg-ink/40 backdrop-blur-[2px]" />
      <div ref={dialogRef} className="relative max-h-[88dvh] w-full max-w-md animate-fade-up overflow-y-auto">
        <button type="button" onClick={onClose} aria-label={closeLabel} className="absolute left-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-ink-soft shadow-sm transition hover:text-ink md:h-9 md:w-9">
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
