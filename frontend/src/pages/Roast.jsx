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

  const API_URL = import.meta.env.VITE_API_BASE_URL;

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

        const res = await fetch(`${API_URL}/api/roast`, {
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
      <p className="min-h-screen flex items-center justify-center text-white text-sm sm:text-base">
        Roasting your resume… 😈
      </p>
    );
  }

  // ❌ ERROR STATE
  if (error) {
    return (
      <p className="min-h-screen flex items-center justify-center text-red-500 text-sm sm:text-base px-4 text-center">
        Error: {error}
      </p>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10 flex justify-center">
      <div className="w-full max-w-3xl">

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Resume Roast Results 🔥
        </h1>
        <p className="text-center text-gray-400 text-sm sm:text-base mb-8">
          Brutally honest. Emotionally unavailable.
        </p>

        {/* Score + Verdict */}
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between bg-gray-800/60 border border-gray-700 rounded-2xl p-5 sm:p-6 mb-8">
          {ats ? (
            <>
              <ScoreMeter score={ats.score} />

              <div className="text-center sm:text-right">
                <p className="text-gray-400 text-xs sm:text-sm">Verdict</p>
                <p className="text-xl sm:text-2xl font-semibold">
                  {getVerdict(ats.score)}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-400 italic text-center w-full text-sm">
              General resume roast  
              <br className="sm:hidden" />
              <span className="text-xs sm:text-sm">
                (Add job role & description for ATS scoring)
              </span>
            </p>
          )}
        </div>

        {/* Roast Points */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Brutal Feedback
          </h2>

          {summary && (
            <p className="text-center text-gray-400 italic text-sm sm:text-base mb-6">
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

        {/* Footer */}
        <p className="mt-10 text-center text-gray-500 text-xs sm:text-sm">
          Fix these, or keep wondering why recruiters ghost you.
        </p>
      </div>
    </div>
  );
}
