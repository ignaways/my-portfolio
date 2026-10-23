import { useI18n } from "@/lib/i18n";
import { serviceIcons } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Services() {
  const { t, c } = useI18n();
  return (
    <section id="services" aria-labelledby="services-title" className="pb-20 md:pb-28">
      <div className="container-page">
        <SectionHeader
          id="services"
          badge={t.services.badge}
          title={<>{t.services.title[0]}<br className="hidden sm:block" /> {t.services.title[1]}</>}
          aside={
            <p className="text-[0.95rem] leading-6 text-gray">
              {t.services.aside}
            </p>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.services.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            return (
              <Reveal key={s.title} delay={i * 0.05}>
                <article className="card h-full p-6 transition-shadow duration-300 hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon width={20} height={20} />
                  </span>
                  <h3 className="mt-5 text-[1rem] font-semibold text-dark">{s.title}</h3>
                  <p className="mt-2 text-[0.875rem] leading-[1.4rem] text-gray">{s.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
