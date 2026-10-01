
import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { profile } from "@/lib/content";
import { duration, ease } from "@/lib/motion";
import { validateContact, type ContactErrors, type ContactInput } from "@/lib/validation";
import { Text } from "./Placeholder";
import { ApiError, sendContact } from "@/lib/api";

type Status = "idle" | "sending" | "sent" | "error";
const empty: ContactInput = { name: "", email: "", message: "" };

export function Contact() {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [via, setVia] = useState<"api" | "mailto">("api");

  const set = (k: keyof ContactInput) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`field-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const company = (new FormData(e.currentTarget).get("company") as string) || "";
      const result = await sendContact(values, company);
      setVia(result.via);
      setStatus("sent");
      setValues(empty);
    } catch (err) {
      if (err instanceof ApiError && err.status === 422 && err.fields) {
        setErrors(err.fields);
        setStatus("idle");
        return;
      }
      setStatus("error");
    }
  }

  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false },
    { label: "Phone", value: profile.phone, href: `https://wa.me/${profile.phone.replace(/\D/g, "")}`, external: true },
    { label: "LinkedIn", value: profile.links.linkedin.replace("https://www.", ""), href: profile.links.linkedin, external: true },
    { label: "GitHub", value: profile.links.github.replace("https://", ""), href: profile.links.github, external: true },
  ];

  return (
    <section id="contact" data-route="/contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line py-24 md:py-40">
      <div aria-hidden className="node-field absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-[1200px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <h2 id="contact-title" className="text-display font-semibold tracking-[-0.045em] text-fg">
            Let&apos;s Build Something Meaningful.
          </h2>
          <p className="mt-8 max-w-[44ch] text-[1.15rem] leading-relaxed text-muted">
            Have a product, system, or technical challenge in mind? Let&apos;s talk.
          </p>
          <ul className="mt-12 border-t border-line">
            {channels.map((c) => {
              const pending = c.value.includes("[");
              const inner = (
                <>
                  <span className="text-[0.9rem] text-muted">{c.label}</span>
                  <span className="truncate text-[1rem] text-fg transition-colors group-hover:text-signal">
                    <Text value={c.value} />
                  </span>
                </>
              );
              return (
                <li key={c.label} className="border-b border-line">
                  {pending ? (
                    <div className="grid grid-cols-[6rem_1fr] items-baseline gap-4 py-5">{inner}</div>
                  ) : (
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group grid grid-cols-[6rem_1fr] items-baseline gap-4 py-5"
                    >
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="rounded-lg border border-line bg-panel/90 shadow-panel backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <p className="font-mono text-[0.72rem] text-muted">POST /contact</p>
              <p className="flex items-center gap-2 font-mono text-[0.72rem] text-muted" aria-hidden>
                <span className={`h-1.5 w-1.5 rounded-full ${status === "sent" ? "bg-ok" : status === "error" ? "bg-red-400" : status === "sending" ? "bg-signal" : "bg-line-strong"}`} />
                {status === "sent" ? "201" : status === "error" ? "failed" : status === "sending" ? "pending" : "ready"}
              </p>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: duration.base, ease }}
                  className="flex min-h-[26rem] flex-col justify-center p-8"
                  role="status"
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
                    <circle cx="20" cy="20" r="19" stroke="#5cc98f" strokeOpacity=".5" />
                    <motion.path
                      d="M12 20.5l5.5 5.5L28 15"
                      stroke="#5cc98f"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease, delay: 0.1 }}
                    />
                  </svg>
                  <p className="mt-6 text-[1.5rem] font-semibold tracking-[-0.02em] text-fg">
                    {via === "api" ? "Message sent." : "Message ready in your email app."}
                  </p>
                  <p className="mt-2 text-[1rem] leading-relaxed text-muted">
                    {via === "api"
                      ? "Thanks for reaching out. I'll reply to your email soon."
                      : "Your message has been filled in. Press send in your email app to deliver it."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 self-start text-[0.9rem] text-fg underline decoration-line-strong underline-offset-4 hover:decoration-signal"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: duration.fast }}
                  onSubmit={onSubmit}
                  noValidate
                  className="space-y-5 p-5 md:p-6"
                >
                  <Field id="name" label="Name" error={errors.name}>
                    <input id="field-name" name="name" autoComplete="name" value={values.name} onChange={set("name")} className={inputCls(!!errors.name)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
                  </Field>
                  <Field id="email" label="Email" error={errors.email}>
                    <input id="field-email" name="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} className={inputCls(!!errors.email)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
                  </Field>
                  <Field id="message" label="Message" error={errors.message}>
                    <textarea id="field-message" name="message" rows={5} value={values.message} onChange={set("message")} className={`${inputCls(!!errors.message)} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} />
                  </Field>
                  {/* honeypot */}
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                  {status === "error" && (
                    <p role="alert" className="text-[0.9rem] text-red-300">
                      The message didn&apos;t go through. Check your connection and send it again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="relative flex h-12 w-full items-center justify-center overflow-hidden rounded-sm bg-fg text-[0.95rem] font-medium text-ink transition-colors hover:bg-white disabled:cursor-wait"
                  >
                    {status === "sending" ? (
                      <span className="flex items-center gap-3">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" aria-hidden />
                        Sending message
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function inputCls(err: boolean) {
  return `w-full rounded-sm border bg-ink px-3.5 py-3 text-[0.975rem] text-fg placeholder:text-dim transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-2 focus:ring-signal/30 ${
    err ? "border-red-400/70 focus:border-red-400" : "border-line hover:border-line-strong focus:border-signal"
  }`;
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="mb-2 block text-[0.875rem] text-fg">
        {label}
      </label>
      {children}
      {error && (
        <p id={`err-${id}`} className="mt-2 text-[0.85rem] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
