import {
  DocumentDuplicateIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { FlagIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import React from "react";

type PageSettingsProps = {
  isOpen: boolean;
  close: () => void;
  position: { x: number; y: number };
  onSetAsFirstPage?: () => void;
  onRename?: () => void;
  onCopy?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
};

export const PageSettings = ({
  isOpen,
  close,
  position,
  onSetAsFirstPage,
  onRename,
  onCopy,
  onDuplicate,
  onDelete,
}: PageSettingsProps) => {
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      event.stopImmediatePropagation();
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        close();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, close]);

  const menuXPosition = React.useMemo(() => {
    if (typeof window === "undefined") return;
    const menuWidth = 200;

    if (position.x + menuWidth > window.innerWidth) {
      return position.x - menuWidth - 16;
    }

    return position.x;
  }, [position.x]);

  if (!isOpen) return null;

  const menuItems = [
    {
      icon: FlagIcon,
      label: "Set as first page",
      onClick: onSetAsFirstPage,
      iconClassName: "text-blue-600",
    },
    {
      icon: PencilIcon,
      label: "Rename",
      onClick: onRename,
      iconClassName: "text-gray-400",
    },
    {
      icon: DocumentDuplicateIcon,
      label: "Copy",
      onClick: onCopy,
      iconClassName: "text-gray-400",
    },
    {
      icon: Square2StackIcon,
      label: "Duplicate",
      onClick: onDuplicate,
      iconClassName: "text-gray-400",
    },
    {
      icon: TrashIcon,
      label: "Delete",
      onClick: onDelete,
      className: "text-red-600",
      iconClassName: "text-red-600",
      separator: true,
    },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed z-50 top-12  bg-white rounded-lg shadow-lg border border-gray-200  min-w-[200px] animate-in fade-in-0 zoom-in-95 duration-100"
      style={{
        left: menuXPosition,
      }}
    >
      <div className="px-4 py-2 text-sm font-semibold text-fillout-foreground border-b border-gray-100 bg-neutral-50">
        Settings
      </div>

      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.separator && <div className="border-t border-gray-100 my-1" />}
          <button
            onClick={() => {
              item.onClick?.();
              close();
            }}
            className={classNames(
              "w-full flex items-center px-4 py-2 text-sm text-fillout-foreground hover:bg-gray-100 transition-colors cursor-pointer",
              item.className
            )}
          >
            <item.icon
              className={classNames("size-4 mr-3 ", item.iconClassName)}
            />
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};
