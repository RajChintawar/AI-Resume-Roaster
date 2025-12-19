import ScoreMeter from "../components/ScoreMeter";
import RoastCard from "../components/RoastCard";
import { roastResult } from "../utils/dummyData";

export default function Roast() {
const getVerdict = (score) => {
  if (score >= 75) return "Hire ✅";
  if (score >= 50) return "Borderline 😐";
  return "Reject ❌";
};


  return (
    <div className="min-h-screen px-4 py-12 flex justify-center">
      <div className="w-full max-w-3xl">


        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Resume Roast Results 🔥
        </h1>
        <p className="text-center text-gray-400 mb-10">
          Brutally honest. Emotionally unavailable.
        </p>

        {/* Score + Verdict */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-800/60 border border-gray-700 rounded-2xl p-6 mb-8">
          <ScoreMeter score={roastResult.score} />

          <div className="mt-6 sm:mt-0 text-center sm:text-right">
            <p className="text-gray-400 text-sm">Verdict</p>
            <p className="text-2xl font-semibold">
{getVerdict(roastResult.score)}
            </p>
          </div>
        </div>

        {/* Roast Points */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">
  Brutal Feedback
  </h2>
          {roastResult.roast.map((line, index) => (
            <RoastCard key={index} text={line} />
          ))}
        </div>

        {/* Footer CTA */}
        <p className="mt-10 text-center text-gray-500 text-sm">
          Fix these, or keep wondering why recruiters ghost you.
        </p>
      </div>
    </div>
  );
}
