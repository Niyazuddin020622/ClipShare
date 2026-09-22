import { useState } from "react";
import {
  CheckCircle2,
  FileText,
  Send as SendIcon,
  Upload,
} from "lucide-react";
import axios from "axios";

import FileUpload from "../components/FileUpload";

function Send() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("text");
  const [expiryMinutes, setExpiryMinutes] = useState("10");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shareData, setShareData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setShareData(null);

    if (!text.trim() && files.length === 0) {
      setError("Please enter some text or upload at least one file.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("text", text);
      formData.append("expiryMinutes", expiryMinutes);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/clipboard/create`,
        formData
      );

      if (response.data.success) {
        setShareData(response.data.data);

        setText("");
        setFiles([]);
      }
    } catch (error) {
      console.error("Create clipboard error:", error);

      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = async () => {
    if (!shareData?.code) return;

    try {
      await navigator.clipboard.writeText(shareData.code);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <section className="min-h-[calc(100vh-128px)] bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Send Content
          </h1>

          <p className="mt-3 text-gray-600">
            Paste text or upload files to create a sharing code.
          </p>
        </div>

        {shareData && (
          <div className="mb-6 rounded-3xl border border-green-200 bg-green-50 p-6 text-center">
            <CheckCircle2
              size={40}
              className="mx-auto text-green-600"
            />

            <h2 className="mt-3 text-xl font-bold text-green-900">
              Content Shared Successfully
            </h2>

            <p className="mt-2 text-sm text-green-700">
              Use this 6-digit code to retrieve your content.
            </p>

            <button
              type="button"
              onClick={handleCopyCode}
              className="mx-auto mt-5 block rounded-2xl bg-white px-8 py-4 text-3xl font-bold tracking-[0.4em] text-gray-900 shadow-sm transition hover:bg-gray-100"
            >
              {shareData.code}
            </button>

            <p className="mt-3 text-xs text-green-700">
              Click the code to copy
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Expires at{" "}
              {new Date(shareData.expiresAt).toLocaleString()}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="mb-6 flex rounded-xl bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("text")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                activeTab === "text"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              <FileText size={17} />
              Text / Code
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("file")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                activeTab === "file"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              <Upload size={17} />
              Files
            </button>
          </div>

          {activeTab === "text" ? (
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Your text
              </label>

              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Paste your text or code here..."
                rows={12}
                className="w-full resize-y rounded-2xl border border-gray-300 bg-white p-4 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
              />

              <div className="mt-2 text-right text-xs text-gray-400">
                {text.length} characters
              </div>
            </div>
          ) : (
            <FileUpload
              files={files}
              setFiles={setFiles}
            />
          )}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-900">
              Expiration
            </label>

            <select
              value={expiryMinutes}
              onChange={(event) =>
                setExpiryMinutes(event.target.value)
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-900"
            >
              <option value="10">10 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="1440">24 hours</option>
            </select>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <SendIcon size={18} />

            {loading ? "Generating..." : "Generate Share Code"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Send;