import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clipboard,
  FileText,
  Image,
  ShieldCheck,
  Zap,
} from "lucide-react";

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pb-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900 text-white shadow-lg">
              <Clipboard size={32} />
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
              Online Clipboard & File Sharing
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Share text, files and images with a simple code.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              ClipShare is a fast online clipboard that lets you
              send text, code, images and files and retrieve them
              using a temporary sharing code.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/send"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 font-semibold text-white transition hover:bg-gray-700"
              >
                Start Sharing
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/retrieve"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-900 transition hover:bg-gray-50"
              >
                Retrieve Content
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-950">
              Everything you need to share quickly
            </h2>

            <p className="mt-3 text-gray-600">
              Send different types of content from one simple
              clipboard.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<FileText size={24} />}
              title="Share Text & Code"
              description="Paste notes, commands, code snippets or any text and retrieve it with your code."
            />

            <FeatureCard
              icon={<Image size={24} />}
              title="Share Files & Images"
              description="Upload images, PDFs, documents, ZIP files and other supported files."
            />

            <FeatureCard
              icon={<ShieldCheck size={24} />}
              title="Temporary Sharing"
              description="Use temporary retrieval codes and expiration to keep shared content short-lived."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Send. Get a code. Retrieve.
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              ClipShare keeps the sharing process simple. Upload
              or paste your content, generate a temporary code,
              and use that code to retrieve the content later.
            </p>
          </div>

          <div className="space-y-4">
            <Step
              number="01"
              title="Add your content"
              description="Paste text or upload files and images."
            />

            <Step
              number="02"
              title="Generate a code"
              description="ClipShare creates a temporary retrieval code."
            />

            <Step
              number="03"
              title="Retrieve anywhere"
              description="Enter the code on another device to access your content."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <Zap className="mx-auto mb-5 text-white" size={30} />

          <h2 className="text-3xl font-bold text-white">
            Ready to share?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-300">
            Send your first text, image or file using ClipShare.
          </p>

          <Link
            to="/send"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            Create Share Code
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-800">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-gray-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {description}
      </p>
    </div>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-gray-200 p-5">
      <div className="text-sm font-bold text-gray-400">
        {number}
      </div>

      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default Home;