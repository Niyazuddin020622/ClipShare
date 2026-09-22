
import { useRef } from "react";
import { UploadCloud, X, File } from "lucide-react";

const MAX_FILES = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function FileUpload({ files, setFiles }) {
  const inputRef = useRef(null);

  const handleFiles = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles);

    if (files.length + newFiles.length > MAX_FILES) {
      alert(`Maximum ${MAX_FILES} files are allowed.`);
      return;
    }

    const validFiles = [];

    for (const file of newFiles) {
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} is larger than 10 MB.`);
        continue;
      }

      validFiles.push(file);
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleInputChange = (event) => {
    handleFiles(event.target.files);
    event.target.value = "";
  };

  const removeFile = (index) => {
    setFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleInputChange}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition hover:border-gray-500 hover:bg-gray-100"
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
          <UploadCloud
            className="text-gray-700"
            size={28}
          />
        </div>

        <p className="font-semibold text-gray-900">
          Click to upload files
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Maximum 10 files • 10 MB each
        </p>
      </button>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <File size={19} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {file.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
