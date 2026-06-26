"use client";

import { PageShell } from "@/components/page-shell";
import { ClipboardList } from "lucide-react";
import JobsToolbar from "./_components/organisms/jobs-toolbar";

export default function Jobs() {
  return (
    <PageShell
      eyebrow="Service orders"
      title="Ажлын жагсаалт"
      description="Анхан үзлэг эхлүүлэх, засварын захиалга хайх, төлөвөөр нь ялгаж харах хэсэг."
      icon={<ClipboardList className="size-5" />}
      contentClassName="space-y-4"
    >
      <JobsToolbar />
    </PageShell>
  );
}
