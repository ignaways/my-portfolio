import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ComponentType, type FormEvent, type SVGProps } from "react";
import { profile, whatsappUrl } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { duration, ease } from "@/lib/motion";
import { validateContact, type ContactErrors, type ContactInput } from "@/lib/validation";
import { ApiError, sendContact } from "@/lib/api";
import { ArrowRight, GitHub, LinkedIn, Mail, WhatsApp } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error";
type Channel = { label: string; value: string; href: string; Icon: ComponentType<SVGProps<SVGSVGElement>> };
const empty: ContactInput = { name: "", email: "", message: "" };

export function Contact() {
  const { lang, t } = useI18n();
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
    const found = validateContact(values, lang);
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

  const channels: Channel[] = [
    { label: "WhatsApp", value: profile.phone, href: whatsappUrl, Icon: WhatsApp },
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
    { label: "LinkedIn", value: profile.links.linkedin.replace("https://www.", ""), href: profile.links.linkedin, Icon: LinkedIn },
    { label: "GitHub", value: profile.links.github.replace("https://", ""), href: profile.links.github, Icon: GitHub },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 md:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[24px] bg-dark p-6 sm:p-10 md:p-14">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/40 blur-[90px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-primary/20 blur-[90px]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[0.8rem] text-white/80">{t.contact.badge}</span>
              <h2 id="contact-title" className="mt-5 text-h2 font-bold tracking-[-0.03em] text-white xl:whitespace-nowrap">{t.contact.title}</h2>
              <p className="mt-4 max-w-[28rem] text-[1rem] leading-7 text-white/70">
                {t.contact.body}
              </p>
            </div>
            <div className="lg:col-span-4 lg:-mr-14">
              <ChannelWheel channels={channels} />
            </div>
          </div>
        </div>

        {/*<div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">*/}
        {/*  <div className="lg:col-span-5">*/}
        {/*    <span className="badge">{t.contact.formBadge}</span>*/}
        {/*    <h3 className="mt-4 text-h3 font-bold tracking-[-0.02em] text-dark">{t.contact.formTitle}</h3>*/}
        {/*    <p className="mt-3 max-w-[26rem] text-[1rem] leading-7 text-gray">*/}
        {/*      {t.contact.formBody}*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*  <div className="lg:col-span-7">*/}
        {/*      <div className="card p-5 sm:p-7">*/}
        {/*        <AnimatePresence mode="wait" initial={false}>*/}
        {/*          {status === "sent" ? (*/}
        {/*            <motion.div*/}
        {/*              key="sent"*/}
        {/*              initial={{ opacity: 0, y: 8 }}*/}
        {/*              animate={{ opacity: 1, y: 0 }}*/}
        {/*              exit={{ opacity: 0 }}*/}
        {/*              transition={{ duration: duration.base, ease }}*/}
        {/*              className="flex min-h-[24rem] flex-col justify-center"*/}
        {/*              role="status"*/}
        {/*            >*/}
        {/*              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft">*/}
        {/*                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>*/}
        {/*                  <motion.path*/}
        {/*                    d="M6 12.5l4 4L18 8"*/}
        {/*                    stroke="var(--color-primary)"*/}
        {/*                    strokeWidth="2.2"*/}
        {/*                    strokeLinecap="round"*/}
        {/*                    strokeLinejoin="round"*/}
        {/*                    initial={{ pathLength: 0 }}*/}
        {/*                    animate={{ pathLength: 1 }}*/}
        {/*                    transition={{ duration: 0.5, ease, delay: 0.1 }}*/}
        {/*                  />*/}
        {/*                </svg>*/}
        {/*              </span>*/}
        {/*              <p className="mt-6 text-[1.5rem] font-bold tracking-[-0.02em] text-dark">*/}
        {/*                {via === "api" ? t.contact.sentApi : t.contact.sentMailto}*/}
        {/*              </p>*/}
        {/*              <p className="mt-2 text-[1rem] leading-relaxed text-gray">*/}
        {/*                {via === "api"*/}
        {/*                  ? t.contact.sentApiBody*/}
        {/*                  : t.contact.sentMailtoBody}*/}
        {/*              </p>*/}
        {/*              <button*/}
        {/*                type="button"*/}
        {/*                onClick={() => setStatus("idle")}*/}
        {/*                className="mt-8 self-start text-[0.9rem] font-medium text-primary underline-offset-4 hover:underline"*/}
        {/*              >*/}
        {/*                {t.contact.another}*/}
        {/*              </button>*/}
        {/*            </motion.div>*/}
        {/*          ) : (*/}
        {/*            <motion.form*/}
        {/*              key="form"*/}
        {/*              initial={{ opacity: 0 }}*/}
        {/*              animate={{ opacity: 1 }}*/}
        {/*              exit={{ opacity: 0 }}*/}
        {/*              transition={{ duration: duration.fast }}*/}
        {/*              onSubmit={onSubmit}*/}
        {/*              noValidate*/}
        {/*              className="space-y-4"*/}
        {/*            >*/}
        {/*              <Field id="name" label={t.contact.name} error={errors.name}>*/}
        {/*                <input id="field-name" name="name" autoComplete="name" placeholder={t.contact.namePlaceholder} value={values.name} onChange={set("name")} className={inputCls(!!errors.name)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />*/}
        {/*              </Field>*/}
        {/*              <Field id="email" label={t.contact.email} error={errors.email}>*/}
        {/*                <input id="field-email" name="email" type="email" autoComplete="email" placeholder={t.contact.emailPlaceholder} value={values.email} onChange={set("email")} className={inputCls(!!errors.email)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />*/}
        {/*              </Field>*/}
        {/*              <Field id="message" label={t.contact.message} error={errors.message}>*/}
        {/*                <textarea id="field-message" name="message" rows={5} placeholder={t.contact.messagePlaceholder} value={values.message} onChange={set("message")} className={`${inputCls(!!errors.message)} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} />*/}
        {/*              </Field>*/}
        {/*              /!* honeypot *!/*/}
        {/*              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />*/}
        
        {/*              {status === "error" && (*/}
        {/*                <p role="alert" className="text-[0.9rem] text-red-600">*/}
        {/*                  {t.contact.error}*/}
        {/*                </p>*/}
        {/*              )}*/}
        
        {/*              <button type="submit" disabled={status === "sending"} className="btn-dark w-full disabled:cursor-wait disabled:opacity-80">*/}
        {/*                {status === "sending" ? (*/}
        {/*                  <>*/}
        {/*                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden />*/}
        {/*                    {t.contact.sending}*/}
        {/*                  </>*/}
        {/*                ) : (*/}
        {/*                  <>*/}
        {/*                    {t.contact.send} <ArrowRight width={16} height={16} />*/}
        {/*                  </>*/}
        {/*                )}*/}
        {/*              </button>*/}
        {/*            </motion.form>*/}
        {/*          )}*/}
        {/*        </AnimatePresence>*/}
        {/*      </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </section>
  );
}

function inputCls(err: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-dark placeholder:text-gray/70 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-4 focus:ring-primary/15 ${
    err ? "border-red-400 focus:border-red-500" : "border-line hover:border-gray/40 focus:border-primary"
  }`;
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="mb-1.5 block text-[0.85rem] font-medium text-dark">
        {label}
      </label>
      {children}
      {error && (
        <p id={`err-${id}`} className="mt-1.5 text-[0.82rem] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

const ROW = 76;
const SLOTS = [-2, -1, 0, 1, 2];
const mod = (a: number, n: number) => ((a % n) + n) % n;

/**
 * Contact channels as an endless vertical wheel: the active one sits in the
 * middle, the rest fade and blur away, and new ones roll in from the edge.
 * Advances on its own, and follows the mouse wheel, swipes, arrow keys and the dots.
 */
function ChannelWheel({ channels }: { channels: Channel[] }) {
  const { t } = useI18n();
  const n = channels.length;
  // An ever-growing position; the active channel is pos mod n.
  const [pos, setPos] = useState(1);
  const [paused, setPaused] = useState(false);
  const [wide, setWide] = useState(true);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const lock = useRef(0);
  const touchY = useRef<number | null>(null);
  const active = mod(pos, n);

  // Inactive items drift left; keep that subtle on narrow screens.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setPos((p) => p + 1), 2800);
    return () => clearInterval(t);
  }, [paused, reduce]);

  // Native listener so the wheel can stop the page from scrolling underneath it.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 4) return;
      e.preventDefault();
      if (Date.now() < lock.current) return;
      lock.current = Date.now() + 420;
      setPos((p) => p + (e.deltaY > 0 ? 1 : -1));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  /** Shortest way round the wheel to channel i. */
  const goTo = (i: number) => {
    let delta = i - active;
    if (delta > n / 2) delta -= n;
    if (delta < -n / 2) delta += n;
    setPos((p) => p + delta);
  };

  const place = (d: number) => {
    const dist = Math.abs(d);
    return {
      y: d * ROW,
      x: -dist * (wide ? 36 : 12),
      scale: 1 - dist * 0.07,
      // The top edge slot stays hidden so a short list never shows the same channel twice.
      opacity: dist >= 3 || d === -2 ? 0 : dist === 2 ? 0.18 : 1 - dist * 0.38,
      filter: `blur(${dist * 1.5}px)`,
    };
  };

  return (
    <div
      ref={ref}
      className="relative flex h-[300px] items-center pr-8 sm:h-[320px] lg:pr-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          setPos((p) => p + (e.key === "ArrowDown" ? 1 : -1));
        }
      }}
      onTouchStart={(e) => (touchY.current = e.touches[0].clientY)}
      onTouchEnd={(e) => {
        if (touchY.current === null) return;
        const dy = touchY.current - e.changedTouches[0].clientY;
        if (Math.abs(dy) > 30) setPos((p) => p + (dy > 0 ? 1 : -1));
        touchY.current = null;
      }}
    >
      <ul aria-label={t.contact.channels} className="relative h-full flex-1">
        <AnimatePresence initial={false}>
          {SLOTS.map((d) => {
            const { label, value, href, Icon } = channels[mod(pos + d, n)];
            const isActive = d === 0;
            return (
              <motion.li
                key={pos + d}
                className="absolute inset-x-0 top-1/2 -mt-[34px]"
                style={{ zIndex: 10 - Math.abs(d), pointerEvents: Math.abs(d) > 1 ? "none" : undefined }}
                // Enter and leave one slot further out, where the item is invisible.
                initial={place(d + Math.sign(d))}
                animate={place(d)}
                exit={place(d + Math.sign(d))}
                transition={{ duration: reduce ? 0 : 0.5, ease }}
              >
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  tabIndex={isActive ? 0 : -1}
                  aria-hidden={Math.abs(d) > 1 ? true : undefined}
                  onClick={(e) => {
                    if (!isActive) {
                      e.preventDefault();
                      setPos((p) => p + d);
                    }
                  }}
                  className={`flex h-[68px] items-center gap-4 rounded-2xl px-4 transition-colors duration-300 ${
                    isActive ? "bg-white/[0.07] ring-1 ring-white/10" : ""
                  }`}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors ${isActive ? "bg-white/15" : "bg-white/10"}`}>
                    <Icon width={18} height={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.75rem] text-white/50">{label}</span>
                    <span className={`block truncate transition-colors duration-300 ${isActive ? "text-[0.95rem] text-primary sm:text-[1.05rem]" : "text-[0.875rem] text-white/80 sm:text-[0.95rem]"}`}>
                      {value}
                    </span>
                  </span>
                </a>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col gap-2 lg:hidden">
        {channels.map((c, i) => (
          <button
            key={c.label}
            type="button"
            aria-label={t.contact.show(c.label)}
            aria-current={i === active ? "true" : undefined}
            onClick={() => goTo(i)}
            className="flex h-4 w-4 items-center justify-center"
          >
            <span className={`block rounded-full transition-all duration-300 ${i === active ? "h-3 w-1.5 bg-white" : "h-1.5 w-1.5 bg-white/35 hover:bg-white/60"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
