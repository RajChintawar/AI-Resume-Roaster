export default function ATSFlags({ flags }) {
  if (!flags || flags.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">
        ATS Autopsy ☠️
      </h3>

      <div className="space-y-3">
        {flags.map((flag, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border text-sm ${
              flag.severity === "critical"
                ? "border-red-600 text-red-400"
                : flag.severity === "medium"
                ? "border-yellow-600 text-yellow-400"
                : "border-gray-600 text-gray-300"
            }`}
          >
            <strong>{flag.code}</strong> — {flag.message}
          </div>
        ))}
      </div>
    </div>
  );
}
