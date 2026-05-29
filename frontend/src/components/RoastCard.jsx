export default function RoastCard({
  section,
  problem,
  evidence,
  reason,
}) {
  return (
    <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition">

      <div className="flex items-center gap-2 mb-5">
        <span className="text-red-400 text-xl">🔥</span>

        <h3 className="font-bold text-lg text-white uppercase tracking-wide">
          {section}
        </h3>
      </div>

      <div className="space-y-5">

        <div>
          <p className="text-red-400 text-sm font-semibold mb-1">
            Problem
          </p>

          <p className="text-gray-200 leading-relaxed">
            {problem}
          </p>
        </div>

        <div>
          <p className="text-blue-400 text-sm font-semibold mb-1">
            Evidence
          </p>

          <p className="text-gray-300 leading-relaxed">
            {evidence}
          </p>
        </div>

        <div>
          <p className="text-yellow-400 text-sm font-semibold mb-1">
            Why Recruiters Reject It
          </p>

          <p className="text-gray-300 leading-relaxed">
            {reason}
          </p>
        </div>

      </div>
    </div>
  );
}