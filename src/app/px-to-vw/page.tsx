import VwToPxConverter from "@/components/VwToPxConverter";

export default function VwToPxPage() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center">
      <VwToPxConverter />
    </div>
  );
}