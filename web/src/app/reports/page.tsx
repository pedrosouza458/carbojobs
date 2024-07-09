import { BarChartComponent } from "@/components/charts/bar-chart";
import { PieChartComponent } from "@/components/charts/pie-chart";
import { TriangleAlert } from "lucide-react";

export default function Reports() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full bg-[#FBCA1A] text-base font-semibold text-white px-8  py-2 flex items-center justify-center gap-3">
          <TriangleAlert className="size-12 md:size-8" />
          <p className="text-center">
            Está página está em construção, os dados utilizados aqui não são
            verdadeiros.
          </p>
        </div>
      </div>
      <div className="pt-4 px-10 grid md:grid-cols-2 gap-4">
        <BarChartComponent />
        <PieChartComponent />
      </div>
    </div>
  );
}
