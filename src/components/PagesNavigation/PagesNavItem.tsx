import classNames from "classnames";
import React from "react";
import { Page } from "~/app/page";

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

  const handleContextMenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsSettingsOpen(true);
  };

  return (
    <>
      <button
        draggable={!isSettingsOpen}
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
      </button>
    </>
  );
};
