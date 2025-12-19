export default function UploadBox({ onFileSelect }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    onFileSelect(file);
  };

 return (
  <div className="w-full max-w-md border-2 border-dashed border-gray-600 rounded-xl p-6 text-center">
    <input
      type="file"
      accept=".pdf,.doc,.docx"
      onChange={handleFileChange}
      className="mb-4 w-full text-sm text-gray-300
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:border-0
                 file:text-sm file:font-semibold
                 file:bg-gray-700 file:text-white
                 hover:file:bg-gray-600"
    />
    <p className="text-gray-400 text-sm">
      Upload your resume (PDF / DOC)
    </p>
  </div>
);

}
