import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { projects, Project } from '../data/projects';

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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
      className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
          <IconComponent size={28} />
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
      
      <h3 className="text-xl font-semibold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors">
        {project.title}
      </h3>
      
      <p className="text-slate-500 mb-6">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              <Rocket size={16} />
              Featured Work
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Projects & Research</h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Applying mathematical modeling, data analysis, and engineering to solve real-world challenges
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-8"
          >
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
