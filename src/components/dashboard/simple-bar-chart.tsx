"use client";

interface BarChartProps {
  data: { name: string; total: number }[];
}

export function SimpleBarChart({ data }: BarChartProps) {
  const maxValue = Math.max(...data.map((item) => item.total));

  return (
    <div className="w-full h-[350px] flex flex-col">
      <div className="flex-1 flex items-end">
        {data.map((item, index) => {
          const heightPercentage = (item.total / maxValue) * 100;

          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full px-1">
                <div
                  className="w-full bg-primary/80 rounded-t-sm"
                  style={{ height: `${heightPercentage}%` }}
                  title={`${item.name}: ${item.total}万円`}
                />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-between px-2">
        <div className="text-sm text-muted-foreground">0万円</div>
        <div className="text-sm text-muted-foreground">{maxValue}万円</div>
      </div>
    </div>
  );
}
