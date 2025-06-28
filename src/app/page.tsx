"use client";
import {
  CheckCircleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { PagesNavigation } from "~/components/PagesNavigation/PagesNavigation";

export type Page = {
  id: string;
  title: string;
  content: Record<string, unknown>;
  icon: typeof CheckCircleIcon;
};

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

  return (
    <div className="flex justify-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex justify-end flex-col gap-[32px] row-start-2 sm:items-start">
        <PagesNavigation
          pages={pages}
          activePage={activePage}
          onPageChange={onPageChange}
          updatePages={setPages}
        />
      </main>
    </div>
  );
}
