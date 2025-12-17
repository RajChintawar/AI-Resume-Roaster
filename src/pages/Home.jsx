import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "../components/UploadBox";

export default function Home() {
  const [resumeFile, setResumeFile] = useState(null);
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    setResumeFile(file);
  };

  const handleRoast = () => {
    if (!resumeFile) {
      alert("Upload a resume first, genius.");
      return;
    }

    navigate("/roast");
  };

  return (
    <div>
      <h1>AI Resume Roaster</h1>

      <UploadBox onFileSelect={handleFileSelect} />

      {resumeFile && <p>Selected: {resumeFile.name}</p>}

      <button onClick={handleRoast}>
        Roast My Resume 🔥
      </button>
    </div>
  );
}
