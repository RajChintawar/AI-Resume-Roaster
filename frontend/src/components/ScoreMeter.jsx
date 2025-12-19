export default function ScoreMeter({ score }) {
  let color = "border-red-500";

  if (score >= 75) color = "border-green-500";
  else if (score >= 50) color = "border-yellow-500";

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`w-32 h-32 rounded-full border-8 ${color} flex items-center justify-center`}
      >
        <span className="text-3xl font-bold">{score}</span>
      </div>
      <p className="mt-2 text-gray-400 text-sm">ATS Score</p>
    </div>
  );
}
