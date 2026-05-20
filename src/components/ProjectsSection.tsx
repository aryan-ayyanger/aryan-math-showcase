import { motion } from 'framer-motion';
import { Rocket, ExternalLink } from 'lucide-react';
import { projects, Project } from '../data/projects';
import SectionTitle from './SectionTitle';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  const IconComponent = project.icon;
  
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -5 }}
      className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
          <IconComponent size={24} />
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          project.status === 'Completed' 
            ? 'bg-green-100 text-green-700'
            : project.status === 'In Progress'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-amber-100 text-amber-700'
        }`}>
          {project.status}
        </span>
      </div>
      
      <h3 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
        {project.title}
      </h3>
      
      <p className="text-slate-500 text-sm mb-4 line-clamp-3">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <a
        href="#"
        className="inline-flex items-center gap-2 text-purple-600 font-medium text-sm hover:gap-3 transition-all"
      >
        Learn More
        <ExternalLink size={16} />
      </a>
    </motion.div>
  );
}

export default function ProjectsSection(): JSX.Element {
  return (
    <section id="projects" className="min-h-screen py-24 bg-slate-50 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <SectionTitle
            badge="Featured Work"
            badgeIcon={Rocket}
            badgeVariant="purple"
            title="Projects & Research"
            description="Applying mathematical thinking to solve real-world challenges"
          />

          <motion.div
            variants={staggerContainer}
            className="grid lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
