import ScoreMeter from "../components/ScoreMeter";
import RoastCard from "../components/RoastCard";
import ATSFlags from "../components/ATSFlags";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Roast() {
  const location = useLocation();
  const { resumeFile, jobRole } = location.state || {};

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
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
        const atsForm = new FormData();
        atsForm.append("resume", resumeFile);

        if (jobRole) {
          atsForm.append("jobRole", jobRole);
        }

        const atsRes = await fetch(`${API_URL}/api/ats-only`, {
          method: "POST",
          body: atsForm,
        });

        const atsData = await atsRes.json();

        if (!atsRes.ok) {
          throw new Error(atsData.error || "ATS failed");
        }

        setAts(atsData.ats);
        setLoading(false);

        setAiLoading(true);

        const roastForm = new FormData();
        roastForm.append("resume", resumeFile);

        if (jobRole) {
          roastForm.append("jobRole", jobRole);
        }

        const roastRes = await fetch(`${API_URL}/api/roast`, {
          method: "POST",
          body: roastForm,
        });

        const roastData = await roastRes.json();

        if (!roastRes.ok) {
          throw new Error(roastData.error || "Roast failed");
        }

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">

          <div className="text-5xl mb-6 animate-pulse">
            🔍
          </div>

          <h2 className="text-2xl font-bold mb-4">
            Running Resume Autopsy
          </h2>

          <div className="space-y-2 text-gray-400">

            <p className="animate-pulse">
              ✓ Parsing Resume
            </p>

            <p className="animate-pulse">
              ✓ Checking ATS Compatibility
            </p>

            <p className="animate-pulse">
              🤖 Simulating Recruiter Review
            </p>

          </div>

        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center max-w-lg">
          <h2 className="text-red-400 text-2xl font-bold mb-3">
            Analysis Failed ❌
          </h2>

          <p className="text-gray-300">
            {error}
          </p>
        </div>
      </div>
    );
  }

  const severity =
    ats?.atsScore >= 85
      ? "Low 🔥"
      : ats?.atsScore >= 70
      ? "Medium 🔥🔥"
      : ats?.atsScore >= 50
      ? "High 🔥🔥🔥"
      : "Nuclear ☠️";

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10 flex justify-center">

      <div className="w-full max-w-6xl">

        {/* Header */}

        <div className="text-center mb-10">

          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Resume Diagnosis 🔥
          </h1>

          <p className="text-gray-400">
            Machine verdict first. Recruiter judgment second.
          </p>

        </div>

        {/* ATS DASHBOARD */}

        {ats && (
          <div className="grid md:grid-cols-3 gap-5 mb-8">

            <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 flex justify-center">
              <ScoreMeter score={ats.atsScore} />
            </div>

            <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 flex flex-col justify-center">

              <p className="text-gray-400 text-sm mb-2">
                ATS Verdict
              </p>

              <p
                className={`text-3xl font-bold ${
                  ats.verdict === "PASS"
                    ? "text-green-400"
                    : ats.verdict === "RISK"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {ats.verdict === "PASS" && "Hire ✅"}
                {ats.verdict === "RISK" && "Borderline 😐"}
                {ats.verdict === "FAIL" && "Reject ❌"}
              </p>

            </div>

            <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 flex flex-col justify-center">

              <p className="text-gray-400 text-sm mb-2">
                Roast Severity
              </p>

              <p className="text-3xl font-bold text-orange-400">
                {severity}
              </p>

            </div>

          </div>
        )}

        {/* ATS FLAGS */}

        {ats && (
          <div className="mb-10">
            <ATSFlags flags={ats.flags} />
          </div>
        )}

        {/* RECRUITER VERDICT */}

        {summary && (
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8 mb-10">

            <p className="text-red-400 text-xs uppercase tracking-widest mb-2">
              Recruiter Verdict
            </p>

            <h2 className="text-3xl font-bold mb-3">
              REJECT ❌
            </h2>

            <p className="text-gray-300 italic text-lg">
              {summary}
            </p>

          </div>
        )}

        {/* ROAST SECTION */}

        <div>

          <h2 className="text-3xl font-bold text-red-400 mb-2">
            Human Recruiter Roast 🔥
          </h2>

          <p className="text-gray-500 mb-8">
            Here's exactly what recruiters are likely to criticize.
          </p>

          {aiLoading && (
            <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 text-center mb-8">

              <p className="text-gray-400 animate-pulse">
                🔍 Checking skills...
              </p>

              <p className="text-gray-400 animate-pulse">
                🤖 Simulating recruiter review...
              </p>

              <p className="text-red-400 animate-pulse">
                🔥 Preparing roast...
              </p>

            </div>
          )}

          {!aiLoading && roast.length === 0 && (
            <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 text-center">
              Resume too boring to roast 😐
            </div>
          )}

          <div className="space-y-6">

            {roast.map((item, index) => (
              <RoastCard
                key={index}
                section={item.section}
                problem={item.exact_problem}
                evidence={item.evidence}
                reason={item.why_it_leads_to_rejection}
              />
            ))}

          </div>

        </div>

        {/* FOOTER */}

        <div className="mt-12 text-center">

          <p className="text-gray-500">
            Fix these issues, or continue your relationship with rejection emails.
          </p>

        </div>

      </div>

    </div>
  );
}