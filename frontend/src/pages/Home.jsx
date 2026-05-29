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
      alert("Upload resume. Don’t speedrun unemployment.");
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

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 via-transparent to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-sm mb-8">
            🔥 Recruiters reject resumes in seconds
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            AI Resume
            <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
              Roaster
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-400">
            ATS Analysis. Recruiter Simulation. Brutal Feedback.
            Find out why your resume gets ignored before recruiters do.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#upload"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 font-semibold shadow-lg hover:scale-105 transition"
            >
              Roast My Resume 🔥
            </a>

            <a
              href="#how"
              className="px-8 py-4 rounded-xl border border-gray-700 hover:border-gray-500 transition"
            >
              How It Works
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-20">

            <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-5">
              <h3 className="text-2xl font-bold">ATS</h3>
              <p className="text-gray-400 text-sm mt-2">
                Compatibility Analysis
              </p>
            </div>

            <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-5">
              <h3 className="text-2xl font-bold">AI</h3>
              <p className="text-gray-400 text-sm mt-2">
                Recruiter Simulation
              </p>
            </div>

            <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-5">
              <h3 className="text-2xl font-bold">JD</h3>
              <p className="text-gray-400 text-sm mt-2">
                Keyword Matching
              </p>
            </div>

            <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-5">
              <h3 className="text-2xl font-bold">Roast</h3>
              <p className="text-gray-400 text-sm mt-2">
               Staright Facts for rejection.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= UPLOAD SECTION ================= */}
      <section
        id="upload"
        className="py-24 px-6"
      >
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">
              Upload Your Resume
            </h2>

            <p className="text-gray-400 mt-3">
              PDF or DOCX. We’ll judge it harder than recruiters do.
            </p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

            <div className="flex justify-center">
              <UploadBox onFileSelect={handleFileSelect} />
            </div>

            {resumeFile && (
              <div className="mt-5 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-center">
                ✓ {resumeFile.name}
              </div>
            )}

            <div className="mt-6">
              <label className="block text-sm text-gray-400 mb-2">
                Target Job Role (Optional)
              </label>

              <input
                type="text"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                placeholder="Frontend Developer, Data Analyst, Java Developer..."
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div className="mt-5">
              <label className="block text-sm text-gray-400 mb-2">
                Job Description (Optional)
              </label>

              <textarea
                rows={6}
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700 focus:border-red-500 focus:outline-none resize-none"
              />
            </div>

            <button
              onClick={handleRoast}
              className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 font-bold text-lg hover:scale-[1.02] transition-all duration-200 shadow-xl"
            >
              Roast My Resume 🔥
            </button>

          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="how"
        className="py-24 px-6 bg-gray-900/40"
      >
        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-8">
              <div className="text-4xl mb-4">📄</div>

              <h3 className="text-xl font-semibold mb-3">
                Upload Resume
              </h3>

              <p className="text-gray-400">
                Upload your PDF or DOCX resume exactly the way recruiters receive it in the UploadBox.
              </p>
            </div>

            <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-8">
              <div className="text-4xl mb-4">🤖</div>

              <h3 className="text-xl font-semibold mb-3">
                AI Analysis 
              </h3>

              <p className="text-gray-400">
                ATS scoring, keyword matching, formatting review and recruiter simulation.
              </p>
            </div>

            <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-8">
              <div className="text-4xl mb-4">🔥</div>

              <h3 className="text-xl font-semibold mb-3">
                Brutal Roast
              </h3>

              <p className="text-gray-400">
                No motivational nonsense. FRR no bullshits or encouraging stuff Staright Facts of rejection.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="py-24 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-6">
            About Nastyy Resume
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            Most resume tools are polite but Recruiters are not.

            Nastyy Resume simulates how recruiters evaluate your profile,
            highlights ATS risks, and explains exactly why a resume gets ignored.
          </p>

          <p className="mt-8 text-gray-500">
            Built by Ragxx. Powered by GPT Go. Inspired by too many rejection emails.
          </p>

        </div>
      </section>

    </div>
  );
}