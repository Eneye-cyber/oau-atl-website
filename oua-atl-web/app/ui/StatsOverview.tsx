'use client';
import { useRef, type FC } from "react";

const StatsOverview: FC<{label: string; value: number}> = ({label, value}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <div className="stat relative rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10">
      <div className="grid gap-y-2">
        <div className="flex items-center gap-x-2">
          <span className="stat-label text-sm font-medium text-gray-500 dark:text-gray-400">
            {label}
          </span>
        </div>

        <div className="stat-value text-3xl font-semibold tracking-tight text-gray-950 dark:text-white">
          {value}
        </div>
      </div>

      <div>
        <div
          className="stat-chart absolute inset-x-0 bottom-0 overflow-hidden rounded-b-xl fi-color-gray"
          style={{}}
        >
          <canvas
            ref={canvasRef}
            className="h-6"
            style={{
              display: "block",
              boxSizing: "border-box",
              height: "24px",
              width: "336px",
            }}
            width={672}
            height={48}
          ></canvas>

          <span className="text-gray-100 dark:text-gray-800"></span>
          <span className="text-gray-400"></span>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
