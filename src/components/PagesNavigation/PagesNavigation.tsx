"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Page } from "~/app/page";
import { PagesNavItem } from "~/components/PagesNavigation/PagesNavItem";
import * as Arr from "~/lib/array";

type PagesNavigationProps = {
  pages: Array<Page>;
  activePage: string;
  onPageChange?: (tabId: string) => void;
  updatePages: (cb: (pages: Array<Page>) => Array<Page>) => void;
};

export const PagesNavigation = ({
  pages,
  activePage,
  onPageChange,
  updatePages,
}: PagesNavigationProps) => {
  const [drag, setDrag] = React.useState<string | null>(null);

  const handleTabClick = (tabId: string) => () => {
    onPageChange?.(tabId);
  };

  const handleDragStart =
    (idx: string): React.DragEventHandler<HTMLButtonElement> =>
    (e) => {
      setDrag(idx);
      e.dataTransfer.effectAllowed = "move";
    };

  const handleDragEnd: React.DragEventHandler<HTMLButtonElement> = () => {
    setDrag(null);
  };

  const handleDragOver: React.DragEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter =
    (pageId: string): React.DragEventHandler<HTMLButtonElement> =>
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!drag || drag === pageId) return;

      updatePages((pages) => {
        const draggedIdx = pages.findIndex((item) => item.id === drag);
        const targetIdx = pages.findIndex((item) => item.id === pageId);
        return Arr.moveItem(pages, draggedIdx, targetIdx);
      });
    };

  const handleDrop: React.DragEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center px-4 py-2 gap-1">
      <div className="flex items-center space-x-1">
        {pages.map((page) => (
          <PagesNavItem
            key={page.id}
            page={page}
            isActive={activePage === page.id}
            isDragging={drag === page.id}
            onClick={handleTabClick(page.id)}
            onDragStart={handleDragStart(page.id)}
            onDragEnter={handleDragEnter(page.id)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>

      <button className="button">
        <PlusIcon className="size-4" />
        <span>Add page</span>
      </button>
    </div>
  );
};
