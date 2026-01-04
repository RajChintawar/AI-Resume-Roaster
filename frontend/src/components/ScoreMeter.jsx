import { useEffect, useState } from "react";

export default function ScoreMeter({ score }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.floor(score / 40));

    const interval = setInterval(() => {
      current += step;
      if (current >= score) {
        current = score;
        clearInterval(interval);
      }
      setProgress(current);
    }, 20);

    return () => clearInterval(interval);
  }, [score]);

  let color = "#ef4444"; // red
  if (score >= 75) color = "#22c55e"; // green
  else if (score >= 50) color = "#eab308"; // yellow

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: `conic-gradient(${color} ${progress * 3.6}deg, #1f2937 0deg)`
        }}
      >
        <div className="w-24 h-24 rounded-full bg-gray-900 flex items-center justify-center">
          <span className="text-3xl font-bold text-white">
            {progress}
          </span>
        </div>
      </div>

      <p className="mt-3 text-gray-400 text-sm tracking-wide">
        ATS Score
      </p>
    </div>
  );
}
