"use client";
import {
  CheckCircleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import {
  AddPageFn,
  ChangeActivePageFn,
  Page,
  PagesNavigation,
  ReorderPageFn,
} from "~/components/PagesNavigation";
import * as Arr from "~/lib/array";

const mockPages: Array<Page> = [
  { id: "info", title: "Info", content: {}, icon: InformationCircleIcon },
  { id: "details", title: "Details", content: {}, icon: DocumentTextIcon },
  { id: "other", title: "Other", content: {}, icon: DocumentTextIcon },
  { id: "ending", title: "Ending", content: {}, icon: CheckCircleIcon },
];

export default function Home() {
  const [pages, setPages] = React.useState<Array<Page>>(mockPages);
  const [activePage, setActivePage] = React.useState<Page>(pages[0]);

  const changeActivePage: ChangeActivePageFn = (page: Page) => {
    setActivePage(page);
  };

  const reorderPage: ReorderPageFn = (
    dragIndex: string,
    hoverIndex: string
  ) => {
    setPages((pages) => {
      const draggedIdx = pages.findIndex((item) => item.id === dragIndex);
      const targetIdx = pages.findIndex((item) => item.id === hoverIndex);
      return Arr.moveItem(pages, draggedIdx, targetIdx);
    });
  };

  const addPage: AddPageFn = (atIndex) => {
    setPages((prevPages) => {
      const title = `Page ${pages.length - 3}`;
      const newPage: Page = {
        id: title,
        title: title,
        content: {},
        icon: DocumentTextIcon,
      };
      const updatedPages = [...prevPages, newPage];
      const addPageIdx =
        atIndex !== undefined ? atIndex + 1 : updatedPages.length - 2;
      return Arr.moveItem(updatedPages, updatedPages.length - 1, addPageIdx);
    });
  };

  return (
    <div className="flex min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex justify-start flex-col gap-[32px] row-start-2 sm:items-start">
        <PagesNavigation
          pages={pages}
          activePage={activePage}
          changeActivePage={changeActivePage}
          reorderPage={reorderPage}
          addPage={addPage}
        />
        <div>
          <h1 className="text-2xl font-bold">{activePage.title}</h1>
          <img
            src={`https://cataas.com/cat/says/${activePage.title}`}
            className="max-w-150 max-h-150"
            alt={`Cat saying ${activePage.title}`}
          />
        </div>
      </main>
    </div>
  );
}
