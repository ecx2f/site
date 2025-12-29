import dynamic from 'next/dynamic'
import styles from '@/styles/Projects.module.css'

const ProjectsList = dynamic(() => import('@/components/ProjectsList'), {
  ssr: false
})

export default function Projects() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.prompt}>
            <span className={styles.dollar}>$</span> cat projects.txt
          </div>
          <h1 className={styles.title}>projects</h1>
          <p className={styles.subtitle}>
            a collection of things i&apos;ve built, contributed to, or worked on.
          </p>
        </div>

        <ProjectsList />
      </main>
    </div>
  )
}

