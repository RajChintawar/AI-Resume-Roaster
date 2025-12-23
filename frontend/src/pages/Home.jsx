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
  if (!resumeFile ) {
    alert("Upload resume, enter job role and job description. Don’t speedrun life.");
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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-gray-800/60 backdrop-blur rounded-2xl p-8 shadow-xl border border-gray-700">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-3">
          AI Resume Roaster 🔥
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-400 mb-8">
          Upload your resume and get brutally honest feedback, ATS score,
          and bullet points that don’t sound unemployed.
        </p>

        {/* Upload Box */}
        <UploadBox onFileSelect={handleFileSelect} />

        {/* File name */}
        {resumeFile && (
          <p className="mt-4 text-center text-sm text-green-400">
            Selected: {resumeFile.name}
          </p>
        )}

        <div className="mt-6">
  <label className="block text-sm text-gray-400 mb-1">
    Target Job Role
  </label>
  <input
    type="text"
    value={jobRole}
    onChange={(e) => setJobRole(e.target.value)}
    placeholder="e.g. Frontend Developer, Data Analyst"
    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700
               focus:outline-none focus:border-red-500"
  />
</div>
<div className="mt-4">
  <label className="block text-sm text-gray-400 mb-1">
    Job Description / Keywords
  </label>
  <textarea
    rows={4}
    value={jobDesc}
    onChange={(e) => setJobDesc(e.target.value)}
    placeholder="Paste job description or important keywords here..."
    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700
               focus:outline-none focus:border-red-500 resize-none"
  />
</div>


        {/* CTA Button */}
        <button
          onClick={handleRoast}
          className="w-full mt-8 py-3 rounded-xl bg-red-600 hover:bg-red-700
                     transition font-semibold text-lg shadow-lg"
        >
          Roast My Resume 🔥
        </button>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-gray-500">
          No resumes were emotionally harmed. Maybe.
        </p>
      </div>
    </div>
  );
}
