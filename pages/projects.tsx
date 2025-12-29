import Head from 'next/head'
import dynamic from 'next/dynamic'
import styles from '@/styles/Projects.module.css'

const ProjectsList = dynamic(() => import('@/components/ProjectsList'), {
  ssr: false
})

export default function Projects() {
  const siteUrl = 'https://ecx2f.dev'
  const title = 'projects • ecx2f.dev'
  const description = 'a collection of things i\'ve built, contributed to, or worked on. open-source projects, college work, and commercial applications.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}/projects`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/projects`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`${siteUrl}/projects`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
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
    </>
  )
}

