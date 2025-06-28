"use client";
import {
  CheckCircleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { PagesNavigation } from "~/components/PagesNavigation";
import { moveItem } from "~/lib/array";

export type Page = {
  id: string;
  title: string;
  content: Record<string, unknown>;
  icon: typeof CheckCircleIcon;
};
export type AddPageFn = (atIndex?: number) => void;

const mockPages: Array<Page> = [
  { id: "info", title: "Info", content: {}, icon: InformationCircleIcon },
  { id: "details", title: "Details", content: {}, icon: DocumentTextIcon },
  { id: "other", title: "Other", content: {}, icon: DocumentTextIcon },
  { id: "ending", title: "Ending", content: {}, icon: CheckCircleIcon },
];

export default function Home() {
  const [pages, setPages] = React.useState<Array<Page>>(mockPages);
  const [activePage, setActivePage] = React.useState<string>(pages[0].id);

  const onPageChange = (pageId: string) => {
    setActivePage(pageId);
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
      return moveItem(updatedPages, updatedPages.length - 1, addPageIdx);
    });
  };

  return (
    <div className="flex justify-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 sm:items-start">
        <PagesNavigation
          pages={pages}
          activePage={activePage}
          onPageChange={onPageChange}
          updatePages={setPages}
          addPage={addPage}
        />
      </main>
    </div>
  );
}
