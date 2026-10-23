import { motion, useReducedMotion } from "framer-motion";
import { heroTech, yearsOfExperience } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { duration, ease } from "@/lib/motion";
import { ArrowRight, Download } from "./Icons";
import { Photo } from "./Photo";

export function Hero() {
  const { t, c } = useI18n();
  const { profile } = c;
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: duration.slow, ease, delay },
  });

  return (
    <section id="top" aria-labelledby="hero-title" className="pt-[104px] md:pt-[120px]">
      <div className="container-page grid items-center gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <motion.span {...rise(0)} className="badge">
            <span aria-hidden>👋</span> {t.hero.hello} {profile.name}
          </motion.span>
          <motion.h1
            {...rise(0.06)}
            id="hero-title"
            className="mt-5 text-h1 font-bold tracking-[-0.035em] text-dark"
          >
            {profile.headline}
          </motion.h1>
          <motion.p {...rise(0.12)} className="mt-6 max-w-[34rem] text-[1rem] leading-6 text-gray md:text-[1.0625rem] md:leading-7">
            {profile.summary}
          </motion.p>
          <motion.div {...rise(0.18)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              {t.hero.viewWork} <ArrowRight width={16} height={16} />
            </a>
            {profile.cv ? (
              <a href={profile.cv} download className="btn-ghost">
                {t.hero.downloadCv} <Download width={16} height={16} />
              </a>
            ) : (
              <a href="#contact" className="btn-ghost">
                {t.hero.getInTouch} <ArrowRight width={16} height={16} />
              </a>
            )}
          </motion.div>
        </div>

        <motion.div {...rise(0.1)} className="mx-auto w-full max-w-[420px] md:col-span-5 md:max-w-none">
          <Photo image={profile.photo} priority>
            <div className="absolute bottom-6 right-0 rounded-xl bg-white px-4 py-3 shadow-lift md:-right-2">
              <p className="text-[1.25rem] font-bold leading-7 text-dark">{yearsOfExperience}+</p>
              <p className="text-[0.8rem] text-gray">{t.hero.years}</p>
            </div>
          </Photo>
        </motion.div>
      </div>

      <div className="container-page mt-16 border-b border-line pb-12 md:mt-20">
        <p className="text-[0.8rem] text-gray">{t.hero.techIntro}</p>
        <div className="group mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]">
          {/* Two identical rows; the track moves by half its width, so the loop is seamless. */}
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 || undefined}
                className={`flex shrink-0 items-center gap-x-12 pr-12 motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:gap-y-5 motion-reduce:pr-0 ${copy === 1 ? "motion-reduce:hidden" : ""}`}
              >
                {heroTech.map((tool) => (
                  <li
                    key={tool.name}
                    className="group/tech flex cursor-default items-center gap-2.5 whitespace-nowrap py-1 text-[0.95rem] font-medium text-gray transition-colors duration-300 hover:text-dark"
                  >
                    <img
                      src={tool.icon}
                      alt=""
                      width={24}
                      height={24}
                      loading="lazy"
                      className="h-6 w-6 opacity-60 grayscale transition-[filter,opacity,transform] duration-300 group-hover/tech:scale-110 group-hover/tech:opacity-100 group-hover/tech:grayscale-0"
                    />
                    {tool.name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
