import ScoreMeter from "../components/ScoreMeter";
import RoastCard from "../components/RoastCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Roast() {
  const location = useLocation();
  const { resumeFile, jobRole, jobDesc } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [ats, setAts] = useState(null);
  const [error, setError] = useState(null);
  const [roast, setRoast] = useState([]);
  const [summary, setSummary] = useState("");

  const getVerdict = (score) => {
    if (score >= 75) return "Hire ✅";
    if (score >= 50) return "Borderline 😐";
    return "Reject ❌";
  };

  // 🔥 BACKEND CALL
  useEffect(() => {
    if (!resumeFile) {
      setError("Missing resume");
      setLoading(false);
      return;
    }

    const roastResume = async () => {
      try {
        const formData = new FormData();
        formData.append("resume", resumeFile);

        if (jobRole) formData.append("jobRole", jobRole);
        if (jobDesc) formData.append("jobDesc", jobDesc);

        const res = await fetch("http://localhost:5000/api/roast", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Something broke");

        setAts(data.ats || null);
        setRoast(data.roast || []);
        setSummary(data.summary || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    roastResume();
  }, []);

  // 🔄 LOADING STATE
  if (loading) {
    return (
      <p className="min-h-screen flex items-center justify-center text-white">
        Roasting your resume… 😈
      </p>
    );
  }

  // ❌ ERROR STATE
  if (error) {
    return (
      <p className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </p>
    );
  }
           console.log(import.meta.env.VITE_API_BASE_URL);


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
          {ats ? (
            <>
              <ScoreMeter score={ats.score} />

              <div className="mt-6 sm:mt-0 text-center sm:text-right">
                <p className="text-gray-400 text-sm">Verdict</p>
                <p className="text-2xl font-semibold">
                  {getVerdict(ats.score)}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-400 italic text-center w-full">
              General resume roast (no ATS score calculated Add job role nd job description for ATS Scoring)
            </p>
          )}
        </div>

        {/* Roast Points */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">
            Brutal Feedback
          </h2>

          {summary && (
            <p className="text-center text-gray-400 italic mb-6">
              {summary}
            </p>
          )}

          {roast.length === 0 ? (
            <RoastCard text="No roast generated. Resume too boring 😐" />
          ) : (
            roast.map((line, index) => (
              <RoastCard key={index} text={line} />
            ))
          )}
        </div>

        {/* Footer CTA */}
        <p className="mt-10 text-center text-gray-500 text-sm">
          Fix these, or keep wondering why recruiters ghost you.
        </p>
      </div>
    </div>
  );
}
