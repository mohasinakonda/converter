import EmToPxConverter from "@/components/EmToPxConverter";

export default function EmToPxPage() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center">
      <EmToPxConverter />
    </div>
  );
}