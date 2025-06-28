"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import React from "react";
import { AddPageFn, Page } from "~/app/page";
import { PagesNavItem } from "~/components/PagesNavigation/PagesNavItem";
import * as Arr from "~/lib/array";

type PagesNavigationProps = {
  pages: Array<Page>;
  activePage: string;
  onPageChange?: (tabId: string) => void;
  updatePages: (cb: (pages: Array<Page>) => Array<Page>) => void;
  addPage: AddPageFn;
};

export const PagesNavigation = ({
  pages,
  activePage,
  onPageChange,
  updatePages,
  addPage,
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

  const handleAddPage = (idx?: number) => () => {
    addPage(idx);
  };

  return (
    <div className="flex items-center px-4 py-2 gap-1">
      <div className="flex space-x-1">
        {pages.map((page, idx) => {
          const isLastPage = idx === pages.length - 1;
          return (
            <React.Fragment key={page.id}>
              {isLastPage ? (
                <PagesNavItem
                  page={page}
                  isActive={activePage === page.id}
                  isDragging={drag === page.id}
                  onClick={handleTabClick(page.id)}
                />
              ) : (
                <PagesNavItem
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
              )}
              <div
                className={classNames(
                  "pages-divider relative group cursor-pointer",
                  {
                    "hover:w-10 transition-[width] duration-50": !isLastPage,
                  }
                )}
              >
                {!isLastPage ? (
                  <button
                    className="z-1 bg-white rounded-full border-1 border-gray-200 hidden group-hover:block cursor-pointer"
                    onClick={handleAddPage(idx)}
                  >
                    <PlusIcon className="size-3" />
                  </button>
                ) : null}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <button className="button" onClick={handleAddPage()}>
        <PlusIcon className="size-4" />
        <span>Add page</span>
      </button>
    </div>
  );
};
