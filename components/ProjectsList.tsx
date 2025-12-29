import { useState } from 'react'
import { projects, Project } from '@/lib/projects'
import styles from '@/styles/Projects.module.css'

type FilterCategory = 'all' | 'open-source' | 'college-project' | 'commercial'

export default function ProjectsList() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  return (
    <>
      <div className={styles.filters}>
        <span className={styles.filterLabel}>filter by tag:</span>
        <div className={styles.filterButtons}>
          <button
            className={activeFilter === 'all' ? styles.active : ''}
            onClick={() => setActiveFilter('all')}
          >
            all
          </button>
          <button
            className={activeFilter === 'open-source' ? styles.active : ''}
            onClick={() => setActiveFilter('open-source')}
          >
            open-source
          </button>
          <button
            className={activeFilter === 'college-project' ? styles.active : ''}
            onClick={() => setActiveFilter('college-project')}
          >
            college-project
          </button>
          <button
            className={activeFilter === 'commercial' ? styles.active : ''}
            onClick={() => setActiveFilter('commercial')}
          >
            commercial
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <span className={styles.cardRole}>{project.role}</span>
      </div>
      <p className={styles.cardDescription}>{project.description}</p>
      <div className={styles.cardTags}>
        {project.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cardLink}
      >
        {project.linkType}
      </a>
    </div>
  )
}

