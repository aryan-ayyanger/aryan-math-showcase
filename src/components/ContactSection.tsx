import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ChevronRight, MapPin } from 'lucide-react';
import { profile } from '../data/profile';
import SectionTitle from './SectionTitle';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

interface ContactLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  iconBgClass: string;
  iconHoverBgClass: string;
}

function ContactLink({ href, icon, label, value, iconBgClass, iconHoverBgClass }: ContactLinkProps): JSX.Element {
  return (
    <a
      href={href}
      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
    >
      <div className={`p-3 rounded-xl ${iconBgClass} ${iconHoverBgClass} transition-colors`}>
        {icon}
      </div>
      <div>
        <div className="text-sm text-slate-500">{label}</div>
        <div className="font-medium text-slate-900">{value}</div>
      </div>
      <ChevronRight className="ml-auto text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
    </a>
  );
}

function Footer(): JSX.Element {
  return (
    <footer className="py-8 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {profile.name}
          </div>
          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} {profile.name}. Built with passion for mathematics.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${profile.email}`} className="text-slate-400 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function ContactSection(): JSX.Element {
  return (
    <>
      <section id="contact" className="min-h-screen py-24 bg-white flex flex-col justify-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <SectionTitle
              badge="Get in Touch"
              badgeIcon={Mail}
              badgeVariant="green"
              title="Let's Connect"
              description="Interested in collaborating on math projects, discussing problem-solving strategies, or just want to chat about mathematics? I'd love to hear from you!"
            />

            <motion.div
              variants={fadeInUp}
              className="max-w-xl mx-auto"
            >
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-3xl border border-slate-200">
                <div className="space-y-6">
                  <ContactLink
                    href={`mailto:${profile.email}`}
                    icon={<Mail size={24} className="text-blue-600 group-hover:text-white" />}
                    label="Email"
                    value={profile.email}
                    iconBgClass="bg-blue-100 text-blue-600"
                    iconHoverBgClass="group-hover:bg-blue-600 group-hover:text-white"
                  />

                  <ContactLink
                    href="#"
                    icon={<Github size={24} className="text-slate-600 group-hover:text-white" />}
                    label="GitHub"
                    value={profile.github}
                    iconBgClass="bg-slate-100 text-slate-600"
                    iconHoverBgClass="group-hover:bg-slate-800 group-hover:text-white"
                  />

                  <ContactLink
                    href="#"
                    icon={<Linkedin size={24} className="text-blue-700 group-hover:text-white" />}
                    label="LinkedIn"
                    value={profile.linkedin}
                    iconBgClass="bg-blue-100 text-blue-700"
                    iconHoverBgClass="group-hover:bg-blue-700 group-hover:text-white"
                  />
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                  <div className="flex items-center justify-center gap-2 text-slate-500">
                    <MapPin size={16} />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
