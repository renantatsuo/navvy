import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import React from "react";
import { Page } from "~/components/PagesNavigation";
import { PageSettings } from "~/components/PagesNavigation/PageSettings";

type PagesNavItemProps = {
  page: Page;
  isActive: boolean;
  isDragging: boolean;
} & React.ComponentProps<"button">;

export const PagesNavItem = ({
  page,
  isActive,
  isDragging,
  onClick,
  className,
  ...props
}: PagesNavItemProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const itemRect = buttonRef.current?.getBoundingClientRect();

  const handleContextMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsSettingsOpen(true);
  };

  const handleSettingsClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setIsSettingsOpen(true);
  };

  const closeSettings = () => setIsSettingsOpen(false);
  const showSettingsHandler = isActive && !isDragging;

  return (
    <>
      <button
        ref={buttonRef}
        draggable={!isSettingsOpen && !!props.onDragStart}
        onClick={onClick}
        onContextMenu={handleContextMenu}
        className={classNames(
          "button",
          {
            "cursor-grabbing transform scale-105 border-2 border-dashed border-blue-500 outline-none drop-shadow-none top-0":
              isDragging,
            "bg-white text-fillout-foreground": isActive,
            "bg-gray-200 text-gray-500  hover:bg-gray-300": !isActive,
            "opacity-60": isDragging,
          },
          className
        )}
        {...props}
      >
        <page.icon
          className={classNames("size-4", {
            "text-fillout-primary": isActive,
            "text-gray-500": !isActive,
          })}
        />
        <span>{page.title}</span>

        {showSettingsHandler ? (
          <div onMouseDown={handleSettingsClick}>
            <EllipsisVerticalIcon className="size-4 text-gray-600" />
          </div>
        ) : null}
      </button>

      {itemRect ? (
        <PageSettings
          isOpen={isSettingsOpen}
          close={closeSettings}
          parentRect={itemRect}
        />
      ) : null}
    </>
  );
};
