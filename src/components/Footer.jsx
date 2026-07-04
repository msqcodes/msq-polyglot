// src/components/Footer.jsx

import { Link } from "react-router-dom";
import { Mail, Globe, MessageCircle, Video } from "lucide-react";
import { ROUTES } from "../constants/routes";

const FOOTER_LINK_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Courses", path: ROUTES.COURSES },
      { label: "Pricing", path: ROUTES.PRICING },
      { label: "Blog", path: ROUTES.BLOG },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", path: ROUTES.ABOUT },
      { label: "Contact", path: ROUTES.CONTACT },
    ],
  },
  {
    title: "Get Started",
    links: [
      { label: "Log In", path: ROUTES.LOGIN },
      { label: "Create Account", path: ROUTES.REGISTER },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "Community", href: "https://example.com/community", icon: MessageCircle },
  { label: "Videos", href: "https://example.com/videos", icon: Video },
  { label: "Website", href: "https://example.com", icon: Globe },
  { label: "Email", href: "mailto:hello@msqpolyglot.com", icon: Mail },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
                MQ
              </span>
              <span className="text-body font-bold text-slate-900">MSQ Polyglot</span>
            </Link>
            <p className="text-caption text-slate-500">Learn Languages. Connect Cultures.</p>
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h3 className="text-caption font-semibold uppercase tracking-wide text-slate-400">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-body text-slate-600 hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-center text-caption text-slate-400">
          © {year} MSQ Polyglot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}