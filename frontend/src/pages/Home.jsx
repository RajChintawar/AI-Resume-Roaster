import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "../components/UploadBox";

export default function Home() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobRole, setJobRole] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    setResumeFile(file);
  };

  const handleRoast = () => {
    if (!resumeFile) {
      alert("Upload resume. Don’t speedrun life.");
      return;
    }

    navigate("/roast", {
      state: {
        resumeFile,
        jobRole,
        jobDesc,
      },
    });
  };

  return (
    <div className="flex flex-col">

      {/* ================= HERO / ROAST ME ================= */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl bg-gray-800/60 backdrop-blur rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-700">

          <h1 className="text-2xl sm:text-4xl font-extrabold text-center mb-3">
            AI Resume Roaster 🔥
          </h1>

          <p className="text-center text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">
            Upload your resume and get brutally honest feedback, ATS score,
            and bullet points that don’t sound unemployed.
          </p>

          <UploadBox onFileSelect={handleFileSelect} />

          {resumeFile && (
            <p className="mt-4 text-center text-xs sm:text-sm text-green-400 break-all">
              Selected: {resumeFile.name}
            </p>
          )}

          <div className="mt-6">
            <label className="block text-xs sm:text-sm text-gray-400 mb-1">
              Target Job Role (optional)
            </label>
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g. Frontend Developer, Data Analyst"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700
                         focus:outline-none focus:border-red-500 text-sm sm:text-base"
            />
          </div>

          <div className="mt-4">
            <label className="block text-xs sm:text-sm text-gray-400 mb-1">
              Job Description / Keywords (optional)
            </label>
            <textarea
              rows={4}
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste job description or important keywords here..."
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700
                         focus:outline-none focus:border-red-500 resize-none
                         text-sm sm:text-base"
            />
          </div>

          <button
            onClick={handleRoast}
            className="w-full mt-8 py-3 rounded-xl bg-red-600 hover:bg-red-700
                       transition font-semibold text-base sm:text-lg shadow-lg"
          >
            Roast My Resume 🔥
          </button>

          <p className="mt-6 text-center text-xs text-gray-500">
            No resumes were emotionally harmed. Maybe.
          </p>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how"
        className="min-h-screen px-6 sm:px-12 py-24 bg-gray-900 flex items-center"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">
            How It Works
          </h2>

          <div className="grid gap-8 sm:grid-cols-3 text-gray-300">
            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700">
              📄 <p className="mt-3 font-semibold">Upload Resume</p>
              <p className="text-sm text-gray-400 mt-2">
                PDF, DOCX — we judge all formats equally.
              </p>
            </div>

            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700">
              🤖 <p className="mt-3 font-semibold">AI Analyzes</p>
              <p className="text-sm text-gray-400 mt-2">
                Structure, skills, keywords, and your delusions.
              </p>
            </div>

            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700">
              🔥 <p className="mt-3 font-semibold">You Get Roasted</p>
              <p className="text-sm text-gray-400 mt-2">
                Brutal feedback + fixes, not fake motivation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="min-h-screen px-6 sm:px-12 py-24 bg-gray-950 flex items-center"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            About Nastyy Resume
          </h2>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Nastyy Resume exists because polite feedback gets people rejected.
            This tool tells you what recruiters won’t — clearly, brutally,
            and with fixes you can actually use.
          </p>

          <p className="mt-6 text-gray-500 text-sm">
            Built with React. Fueled by rejection emails.
          </p>
        </div>
      </section>

    </div>
  );
}
