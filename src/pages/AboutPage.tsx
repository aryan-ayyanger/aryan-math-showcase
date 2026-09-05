import { MapPin, Mail, Linkedin } from 'lucide-react';
import { profile } from '../data/profile';

export default function AboutPage(): JSX.Element {
  return (
    <div className="pb-24">
      <section className="bg-[var(--color-primary)] pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="small-caps text-[11px] text-[var(--color-accent-soft)] mb-3">About the Author</p>
          <h1 className="font-display text-2xl sm:text-3xl text-white tracking-tight mb-4">
            {profile.name}
          </h1>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <MapPin size={14} />
            <span>{profile.location}</span>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <section className="bg-white p-6 rounded-2xl border border-[var(--color-rule)] shadow-sm mt-6 mb-5">
          <div className="text-base leading-[1.6] text-slate-800 space-y-3">
            <p>
              I&rsquo;m Aryan Ayyanger, a high school student deeply passionate
              about competitive mathematics and its applications in solving
              real-world problems. Beyond competitions, I use mathematical
              modeling and data analysis to tackle meaningful challenges in
              science and engineering.
            </p>
            <p>
              Competitively, I&rsquo;m a 2&times; AIME Qualifier, 2&times; MathCON
              Finalist, Genius Olympiad Science Fair Finalist, and have
              placed 2nd at both the Texas A&amp;M Math Contest (Power Team)
              and the University of Houston Physics Contest, among other
              state-level awards.
            </p>
          </div>
        </section>

        <section className="bg-white p-8 rounded-3xl border border-[var(--color-rule)] shadow-sm text-center">
          <h2 className="small-caps text-xs text-[var(--color-primary)] font-semibold mb-4">Let&rsquo;s Connect</h2>
          <p className="text-slate-600 leading-relaxed mb-6 max-w-xl mx-auto">
            Interested in discussing math, research collaborations, or just want to say hi?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[var(--color-primary-soft)] transition-colors"
            >
              <Mail size={14} />
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--color-rule)] text-slate-700 font-medium rounded-lg hover:border-[var(--color-primary)]/40 transition-colors"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}


