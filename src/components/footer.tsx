import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, ArrowUpRight, ShieldCheck } from "lucide-react";
import { FOOTER_DATA } from "@/data/footer";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.75-.79 1.75-1.76s-.78-1.75-1.75-1.75a1.75 1.75 0 0 0 0 3.51m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const {
    companyName,
    subtitle,
    description,
    socials,
    quickLinks,
    brandLinks,
    contacts,
    certificationsBadge,
    distributorBadge,
    attribution,
  } = FOOTER_DATA;

  return (
    <footer className="mt-20 border-t border-stone-200/90 bg-[#faf8f5] text-stone-700">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <div className="relative w-11 h-11 rounded-2xl bg-white p-1.5 shadow-sm border border-stone-200 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt={`${companyName} Logo`}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="block font-serif text-lg font-extrabold tracking-tight text-stone-900">
                  {companyName}
                </span>
                <span className="block text-[11px] font-semibold text-primary">
                  {subtitle}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm">
              {description}
            </p>

            <div className="flex items-center gap-2.5 mt-2">
              {socials.map((s) => {
                const IconComponent = SOCIAL_ICONS[s.icon];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-xl bg-white border border-stone-200 hover:border-primary hover:text-primary text-stone-600 flex items-center justify-center shadow-xs transition-all hover:-translate-y-0.5">
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2 sm:col-span-1">
            <h3 className="text-xs font-bold tracking-wider uppercase text-stone-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-stone-600 hover:text-primary transition-colors inline-flex items-center gap-1 group">
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 sm:col-span-1">
            <h3 className="text-xs font-bold tracking-wider uppercase text-stone-900 mb-4">
              Distributed Brands
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {brandLinks.map((brand, idx) => {
                const isLast = idx === brandLinks.length - 1;
                return (
                  <li key={brand.label}>
                    <Link
                      href={brand.href}
                      className={`transition-colors ${
                        isLast
                          ? "text-primary font-semibold hover:underline inline-flex items-center gap-1 pt-1"
                          : "text-stone-600 hover:text-primary"
                      }`}>
                      <span>{brand.label}</span>
                      {isLast && <ArrowUpRight className="w-3.5 h-3.5" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold tracking-wider uppercase text-stone-900 mb-4">
              Contacts &amp; Hub
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
              {contacts.map((c, idx) => {
                const isAddress = c.type === "address";
                const isPhone = c.type === "phone";
                const isEmail = c.type === "email";

                return (
                  <li key={idx} className="flex items-start gap-2.5">
                    {isAddress && (
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    )}
                    {isPhone && (
                      <Phone
                        className={`w-4 h-4 shrink-0 ${
                          c.isPrimary ? "text-primary" : "text-stone-400"
                        }`}
                      />
                    )}
                    {isEmail && (
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                    )}

                    <a
                      href={c.href}
                      target={isAddress ? "_blank" : undefined}
                      rel={isAddress ? "noopener noreferrer" : undefined}
                      className={`hover:text-primary transition-colors leading-snug ${
                        c.isPrimary ? "font-medium text-stone-800" : ""
                      } ${isEmail ? "truncate" : ""}`}>
                      {c.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="text-center md:text-left leading-relaxed">
            Copyright &copy; {currentYear} {companyName} | Designed with love by{" "}
            <a
              href={attribution.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-800 font-semibold hover:text-primary underline transition-colors">
              {attribution.creditName}
            </a>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-stone-600">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
              <ShieldCheck className="w-3.5 h-3.5" />
              {certificationsBadge}
            </span>
            <span>{distributorBadge}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
