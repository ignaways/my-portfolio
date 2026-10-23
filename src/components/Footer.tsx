import { profile, whatsappUrl } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { GitHub, LinkedIn, Mail, WhatsApp } from "./Icons";
import { Logo } from "./Logo";

export function Footer({ home = true }: { home?: boolean }) {
  const { c } = useI18n();
  const socials = [
    { label: "WhatsApp", href: whatsappUrl, Icon: WhatsApp },
    { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedIn },
    { label: "GitHub", href: profile.links.github, Icon: GitHub },
    { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
  ];

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <a href={home ? "#top" : "/"}>
          <Logo />
        </a>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {c.nav.map((n) => (
            <li key={n.id}>
              <a href={home ? `#${n.id}` : `/#${n.id}`} className="text-[0.85rem] text-gray transition-colors hover:text-primary">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="md:text-right">
          <ul className="flex gap-4 md:justify-end">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-dark transition-colors hover:text-primary"
                >
                  <Icon width={20} height={20} />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.8rem] text-gray">
            © {new Date().getFullYear()} {profile.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
