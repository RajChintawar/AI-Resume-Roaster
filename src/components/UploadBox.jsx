export default function UploadBox({ onFileSelect }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    onFileSelect(file);
  };

  return (
    <div style={{ border: "2px dashed #555", padding: "20px" }}>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />
      <p>Upload your resume (PDF / DOC)</p>
    </div>
  );
}
