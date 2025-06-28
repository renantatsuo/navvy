"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { PagesNavItem } from "~/components/PagesNavigation/PagesNavItem";

export type Page = {
  id: string;
  title: string;
  content: Record<string, unknown>;
  icon: typeof PlusIcon;
};
export type AddPageFn = (atIndex?: number) => void;
export type ChangeActivePageFn = (page: Page) => void;
export type ReorderPageFn = (fromPageId: string, toPageId: string) => void;
type PagesNavigationProps = {
  pages: Array<Page>;
  activePage: Page;
  changeActivePage: ChangeActivePageFn;
  reorderPage: ReorderPageFn;
  addPage: AddPageFn;
};

export const PagesNavigation = ({
  pages,
  activePage,
  changeActivePage,
  reorderPage,
  addPage,
}: PagesNavigationProps) => {
  const [draggingPage, setDraggingPage] = React.useState<string | null>(null);

  const handleTabClick = (page: Page) => () => {
    changeActivePage?.(page);
  };

  const handleDragStart =
    (idx: string): React.DragEventHandler<HTMLButtonElement> =>
    (e) => {
      setDraggingPage(idx);
      e.dataTransfer.effectAllowed = "move";
    };

  const handleDragEnd: React.DragEventHandler<HTMLButtonElement> = () => {
    setDraggingPage(null);
  };

  const handleDragOver: React.DragEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter =
    (pageId: string): React.DragEventHandler<HTMLButtonElement> =>
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!draggingPage || draggingPage === pageId) return;

      reorderPage(draggingPage, pageId);
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
          if (isLastPage) {
            return (
              <React.Fragment key={page.id}>
                <PagesNavItem
                  page={page}
                  isActive={activePage.id === page.id}
                  isDragging={draggingPage === page.id}
                  onClick={handleTabClick(page)}
                />
                <div className="pages-divider"></div>
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={page.id}>
              <PagesNavItem
                page={page}
                isActive={activePage.id === page.id}
                isDragging={draggingPage === page.id}
                onClick={handleTabClick(page)}
                onDragStart={handleDragStart(page.id)}
                onDragEnter={handleDragEnter(page.id)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
              <div className="pages-divider group cursor-pointer">
                <button
                  className="z-1 bg-white rounded-full border-1 border-gray-300 hidden group-hover:block cursor-pointer"
                  onClick={handleAddPage(idx)}
                >
                  <PlusIcon className="size-3 text-black" />
                </button>
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
