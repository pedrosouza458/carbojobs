import { PieChartComponent } from "@/components/charts/pie-chart";
import SecondBarChartComponent from "@/components/charts/second-bar-chart";

export default function Reports() {
  return (
    <div>
      {/* <div className="flex justify-center">
        <div className="w-full bg-[#FBCA1A] text-base font-semibold text-white px-8  py-2 flex items-center justify-center gap-3">
          <TriangleAlert className="size-12 md:size-8" />
          <p className="text-center">
            Está página está em construção, os dados utilizados aqui não são
            verdadeiros.
          </p>
        </div>
      </div> */}
      <div className="pt-4 px-10">
        <div className=" grid md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <SecondBarChartComponent />
          </div>
        </div>
        <div className=" grid md:grid-cols-3 gap-4 mt-6">
          <PieChartComponent/>
       
          {/* <div className="col-span-1">
            <HorizontalBarChart/>
          </div>
          <div className="col-span-2">
            <SecondBarChartComponent />
          </div> */}
        </div>
      </div>
    </div>
  );
}
