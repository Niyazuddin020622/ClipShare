import { useState } from "react";
import {
  ArrowRight,
  Clipboard,
  Download,
  File,
  Search,
} from "lucide-react";
import axios from "axios";

import CodeInput from "../components/CodeInput";

function Retrieve() {
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState(null);

  const handleRetrieve = async (event) => {
    event.preventDefault();

    setError("");
    setContent(null);

    if (code.length !== 6) {
      setError("Please enter a 6-digit code.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/clipboard/retrieve/${code}`
      );

      if (response.data.success) {
        setContent(response.data.data);
      }
    } catch (error) {
      console.error("Retrieve error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to retrieve content."
      );
    } finally {
      setLoading(false);
    }
  };

  const getFileUrl = (filePath) => {
    const baseUrl = import.meta.env.VITE_API_URL.replace(
      "/api",
      ""
    );

    return `${baseUrl}${filePath}`;
  };

  const copyText = async () => {
    if (!content?.text) return;

    try {
      await navigator.clipboard.writeText(content.text);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <section className="min-h-[calc(100vh-128px)] bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-900 text-white">
            <Clipboard size={26} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-950">
            Retrieve Content
          </h1>

          <p className="mt-3 text-gray-600">
            Enter the 6-digit code to retrieve shared content.
          </p>
        </div>

        <form
          onSubmit={handleRetrieve}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <label className="mb-5 block text-center text-sm font-semibold text-gray-900">
            Enter your share code
          </label>

          <CodeInput
            length={6}
            value={code}
            setValue={setCode}
          />

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <Search size={18} />

            {loading ? "Retrieving..." : "Retrieve Content"}

            {!loading && <ArrowRight size={17} />}
          </button>

          <p className="mt-5 text-center text-xs text-gray-400">
            Share codes expire automatically based on the sender's
            selected expiration time.
          </p>
        </form>

        {content && (
          <div className="mt-6 space-y-5">
            {/* Text */}
            {content.text && (
              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">
                    Text / Code
                  </h2>

                  <button
                    type="button"
                    onClick={copyText}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Copy
                  </button>
                </div>

                <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-words rounded-2xl bg-gray-950 p-4 text-sm leading-6 text-gray-100">
                  {content.text}
                </pre>
              </div>
            )}

            {/* Files */}
            {content.files?.length > 0 && (
              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 font-semibold text-gray-900">
                  Files
                </h2>

                <div className="space-y-3">
                  {content.files.map((file) => {
                    const fileUrl = getFileUrl(file.url);

                    return (
                      <div
                        key={file.id}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 p-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                            <File size={18} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {file.originalName}
                            </p>

                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(
                                2
                              )}{" "}
                              MB
                            </p>
                          </div>
                        </div>

                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={file.originalName}
                          className="flex shrink-0 items-center gap-2 rounded-xl bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-700"
                        >
                          <Download size={15} />
                          Download
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Expiry */}
            <p className="text-center text-xs text-gray-400">
              Expires at{" "}
              {new Date(content.expiresAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Retrieve;
