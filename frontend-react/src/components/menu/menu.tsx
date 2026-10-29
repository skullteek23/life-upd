import { useEffect, useId, useRef, useState } from 'react';
import type { RefObject, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './Menu.scss';

export type MenuOption<Value extends string = string> = {
  value: Value;
  label: ReactNode;
  disabled?: boolean;
};

export type MenuProps<Value extends string = string> = {
  /** The menu's accessible name. */
  label: string;
  id?: string;
  /** Control visibility from the component that owns the trigger. */
  open: boolean;
  onClose: () => void;
  /** Pass the same ref to your trigger so outside-click and Escape behavior can include it. */
  triggerRef: RefObject<HTMLElement | null>;
  items: readonly MenuOption<Value>[];
  onSelect: (value: Value) => void;
  className?: string;
};

/** Menu contents only; it is placed beside your own trigger using triggerRef. */
export function Menu<Value extends string>({ label, id, open, onClose, triggerRef, items, onSelect, className = '' }: MenuProps<Value>) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number; minWidth: number }>();
  const generatedId = useId();
  const menuId = id ?? generatedId;

  useEffect(() => {
    if (!open) return;

    const placeMenu = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const bounds = trigger.getBoundingClientRect();
      setPosition({
        top: bounds.bottom + 4,
        left: Math.max(8, Math.min(bounds.left, window.innerWidth - Math.max(bounds.width, 160) - 8)),
        minWidth: Math.max(bounds.width, 100),
      });
    };
    placeMenu();
    window.addEventListener('resize', placeMenu);
    window.addEventListener('scroll', placeMenu, true);

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return;
      if (!menuRef.current?.contains(event.target) && !triggerRef.current?.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => {
      window.removeEventListener('resize', placeMenu);
      window.removeEventListener('scroll', placeMenu, true);
      document.removeEventListener('mousedown', closeOnOutsideClick);
    };
  }, [open, onClose, triggerRef]);

  if (!open || !position || typeof document === 'undefined') return null;

  return createPortal(
    <div id={menuId} ref={menuRef} className={`simple-menu__list ${className}`.trim()} role="menu" aria-label={label} style={position ? { top: position.top, left: position.left, minWidth: position.minWidth } : undefined}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="menuitem"
          className="simple-menu__item"
          disabled={item.disabled}
          onClick={() => {
            onSelect(item.value);
            onClose();
            triggerRef.current?.focus();
          }}
        >
          {item.label}
        </button>
      ))}
    </div>,
    document.body,
  );
}
