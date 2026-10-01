import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[720px] flex-col justify-center px-5">
      <p className="font-mono text-[0.8rem] text-muted">
        <span className="text-signal">GET</span> {window.location.pathname} <span className="text-red-300">404</span>
      </p>
      <h1 className="mt-4 text-title font-semibold tracking-[-0.035em]">This route doesn&apos;t exist.</h1>
      <Link to="/" className="mt-8 self-start text-fg underline decoration-line-strong underline-offset-4 hover:decoration-signal">
        Go to the homepage
      </Link>
    </main>
  );
}
