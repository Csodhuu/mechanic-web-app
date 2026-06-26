import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react";

type InspectionSubmitBarProps = {
  disabled: boolean;
  isSaving: boolean;
  onSubmit: () => void;
};

export function InspectionSubmitBar({ disabled, isSaving, onSubmit }: InspectionSubmitBarProps) {
  return (
    <div className="sticky bottom-[calc(5rem+env(safe-area-inset-bottom))] z-10 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:rounded-2xl sm:border sm:px-4">
      <Button type="button" size="lg" className="w-full" disabled={disabled} onClick={onSubmit}>
        <ClipboardCheck className="size-4" />
        {isSaving ? "Захиалга үүсгэж байна..." : "Үзлэг дуусгаж, захиалга үүсгэх"}
      </Button>
    </div>
  );
}
