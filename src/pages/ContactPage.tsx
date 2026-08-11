import { motion } from 'framer-motion';
import { Mail, Linkedin, ChevronRight, MapPin } from 'lucide-react';
import { profile } from '../data/profile';
import { useSEO } from '../lib/seo';

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

export default function ContactPage(): JSX.Element {
  useSEO({
    title: 'Contact | Aryan Ayyanger',
    description: 'Get in touch with Aryan Ayyanger \u2014 competitive math student and author of olympiad mathematics articles and resources.',
    canonical: 'https://www.aryanayyanger.com/contact',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              <Mail size={16} />
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Let's Connect</h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Interested in collaborating on math projects, discussing problem-solving strategies, 
              or just want to chat about mathematics? I'd love to hear from you!
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="max-w-xl mx-auto"
          >
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
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
                  href={profile.linkedin}
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
    </div>
  );
}
