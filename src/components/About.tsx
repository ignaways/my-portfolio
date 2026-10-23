import { stack, tools, yearsOfExperience } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { MapPin } from "./Icons";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const techCount = stack.reduce((n, l) => n + l.items.length, 0);

export function About() {
  const { t, c } = useI18n();
  const { profile, experience } = c;
  const stats = [
    { value: `${yearsOfExperience}+`, label: t.about.years },
    { value: `${experience.length}`, label: t.about.companies },
    { value: `${techCount}+`, label: t.about.technologies },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="bg-light/10 py-20 md:py-28">
      <div className="container-page">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-7">
            <span className="badge">{t.about.badge}</span>
            <h2 id="about-title" className="mt-4 max-w-[30rem] text-h2 font-bold tracking-[-0.03em] text-dark">
              {profile.aboutHeadline}
            </h2>
            <div className="mt-6 max-w-[36rem] space-y-4 text-[1rem] leading-7 text-gray">
              <p>{profile.summary}</p>
              <p>{profile.aboutBody}</p>
            </div>
            <dl className="mt-10 grid max-w-[30rem] grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-h3 font-bold text-dark">{s.value}</dd>
                  <dd className="mt-1 text-[0.8rem] text-gray">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto w-full max-w-[380px] md:col-span-5">
            <Photo image={profile.aboutPhoto} mode="crop">
              <div className="absolute bottom-8 right-0 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lift md:-right-2">
                <span>
                  <span className="block text-[0.75rem] text-gray">{t.about.basedIn}</span>
                  <span className="block text-[0.9rem] font-semibold text-dark">{profile.location}</span>
                </span>
                <MapPin className="text-primary" />
              </div>
            </Photo>
          </Reveal>
        </div>

        <div id="tools" className="mt-20 md:mt-28">
          <SectionHeader id="tools" badge={t.about.toolsBadge} title={t.about.toolsTitle} intro={t.about.toolsIntro} />
          <Reveal>
            <ul className="grid grid-cols-4 gap-4 sm:grid-cols-8">
              {tools.map((tool) => (
                <li key={tool.name} className="flex flex-col items-center gap-2.5">
                  <span className="card flex aspect-square w-full max-w-[84px] items-center justify-center transition-transform duration-300 hover:-translate-y-1">
                    <img src={tool.icon} alt="" width={36} height={36} loading="lazy" className="h-9 w-9" />
                  </span>
                  <span className="text-center text-[0.8rem] text-gray">{tool.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
