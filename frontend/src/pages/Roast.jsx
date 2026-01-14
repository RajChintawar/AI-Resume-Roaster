import ScoreMeter from "../components/ScoreMeter";
import RoastCard from "../components/RoastCard";
import ATSFlags from "../components/ATSFlags";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Roast() {
  const location = useLocation();
  const { resumeFile, jobRole } = location.state || {};

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [loading, setLoading] = useState(true);       // ATS loading
  const [aiLoading, setAiLoading] = useState(false);  // AI loading
  const [ats, setAts] = useState(null);
  const [roast, setRoast] = useState([]);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!resumeFile) {
      setError("Missing resume");
      setLoading(false);
      return;
    }

    const runATSFirst = async () => {
      try {
        /* =====================
           STEP 1: ATS ONLY
        ===================== */
        const atsForm = new FormData();
        atsForm.append("resume", resumeFile);
        if (jobRole) atsForm.append("jobRole", jobRole);

        const atsRes = await fetch(`${API_URL}/api/ats-only`, {
          method: "POST",
          body: atsForm,
        });

        const atsData = await atsRes.json();
        if (!atsRes.ok) throw new Error(atsData.error || "ATS failed");

        setAts(atsData.ats);   // ⬅️ IMPORTANT
        setLoading(false);     // show ATS immediately

        /* =====================
           STEP 2: AI ROAST
        ===================== */
        setAiLoading(true);

        const roastForm = new FormData();
        roastForm.append("resume", resumeFile);
        if (jobRole) roastForm.append("jobRole", jobRole);

        const roastRes = await fetch(`${API_URL}/api/roast`, {
          method: "POST",
          body: roastForm,
        });

        const roastData = await roastRes.json();
        if (!roastRes.ok) throw new Error(roastData.error || "Roast failed");

        setRoast(roastData.roast || []);
        setSummary(roastData.summary || "");
      } catch (err) {
        setError(err.message);
        setLoading(false);
      } finally {
        setAiLoading(false);
      }
    };

    runATSFirst();
  }, []);

  /* =====================
     LOADING / ERROR STATES
  ===================== */
  if (loading) {
    return (
      <p className="min-h-screen flex items-center justify-center text-white">
        Running ATS Autopsy… 
      </p>
    );
  }

  if (error) {
    return (
      <p className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </p>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10 flex justify-center">
      <div className="w-full max-w-3xl">

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Resume Diagnosis ...
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Machine verdict first. Human judgment second.
        </p>

          {/* ATS SCORE + VERDICT */}
         {/* ================= ATS AUTOPSY ================= */}
{ats && (
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-between
            bg-gray-900 border border-white/10 rounded-2xl p-6 mb-8">

            {/*  FIXED: ats.atsScore */}
            <ScoreMeter score={ats.atsScore} />

            <div className="text-center sm:text-right">
              <p className="text-gray-400 text-sm">Verdict</p>
              <p className={`text-2xl font-bold ${
                ats.verdict === "PASS"
                  ? "text-green-400"
                  : ats.verdict === "RISK"
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}>
                {ats.verdict === "PASS" && "Hire ✅"}
                {ats.verdict === "RISK" && "Borderline 😐"}
                {ats.verdict === "FAIL" && "Reject ❌"}
              </p>
            </div>
          </div>
        )}

        {/* ATS FLAGS */}
        {ats && <ATSFlags flags={ats.flags} />}


        {/* ROAST SECTION */}
        <div className="mt-10 space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-red-400 mb-4">
            Human Recruiter Roast 
          </h2>

          {aiLoading && (
            <p className="text-center text-gray-400 italic mb-6">
              Recruiter is judging your resume… 
            </p>
          )}

          {summary && (
            <p className="text-center text-gray-400 italic mb-6">
              {summary}
            </p>
          )}

          {roast.length === 0 && !aiLoading ? (
            <RoastCard text="No roast generated. Resume too boring 😐" />
          ) : (roast.map((item, index) => (
  <RoastCard
    key={index}
    text={
      `${item.section}\n` +
      `• Problem: ${item.exact_problem}\n` +
      `• Evidence: ${item.evidence}\n` +
      `• Why rejected: ${item.why_it_leads_to_rejection}`
    }
  />
)))}

        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-gray-500 text-sm">
          Fix these, or enjoy refreshing your inbox forever.
        </p>
      </div>
    </div>
  );
}

