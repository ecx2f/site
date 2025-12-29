import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import SystemTerminal from '@/components/SystemTerminal'
import styles from '@/styles/Home.module.css'

export async function getStaticProps() {
  const posts = await getAllPosts()
  const latestPost = posts.length > 0 ? posts[0] : null
  
  return {
    props: {
      latestPost,
    },
  }
}

interface HomeProps {
  latestPost: {
    slug: string
    title: string
    date: string
    readingTime: number
  } | null
}

export default function Home({ latestPost }: HomeProps) {
  const siteUrl = 'https://ecx2f.dev'
  const title = 'ecx2f.dev'
  const description = 'systems engineering student • backend developer • low-level enthusiast. writing about low-level programming, backend development, automation, cybersecurity, reverse engineering, and ai integration.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="ecx2f.dev" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.prompt}>
            <span className={styles.dollar}>$</span> cat whoami.txt
          </div>
          <h1 className={styles.name}>ecx</h1>
          <p className={styles.tagline}>systems engineering student • backend developer • low-level enthusiast</p>
        </div>

        <div className={styles.bio}>
          <p className={styles.bioText}>
            systems engineering student. 
            former frontend web developer, now focusing on backend, automation, and ai integration. 
            interested in low-level programming, cybersecurity, and reverse engineering.
          </p>
        </div>

        <div className={styles.sections}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionPrompt}>$</span>
              <span className={styles.sectionTitle}>tech stack</span>
            </div>
            <div className={styles.sectionContent}>
              <div className={styles.techRow}>
                <span className={styles.techLabel}>languages:</span>
                <span className={styles.techValue}>java, python, typescript (main), learning rust & c++</span>
              </div>
              <div className={styles.techRow}>
                <span className={styles.techLabel}>systems:</span>
                <span className={styles.techValue}>windows 10, linux (fedora, arch), previously ubuntu</span>
              </div>
              <div className={styles.techRow}>
                <span className={styles.techLabel}>interests:</span>
                <span className={styles.techValue}>low-level programming, cybersecurity, reverse engineering, ai integration</span>
              </div>
            </div>
          </section>

          {latestPost && (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionPrompt}>$</span>
                <span className={styles.sectionTitle}>latest post</span>
              </div>
              <div className={styles.sectionContent}>
                <Link href={`/blog/${latestPost.slug}`} className={styles.latestPost}>
                  <div className={styles.latestPostHeader}>
                    <span className={styles.latestPostTitle}>{latestPost.title}</span>
                    <div className={styles.latestPostMeta}>
                      <span className={styles.latestPostDate}>{latestPost.date}</span>
                      <span className={styles.separator}>•</span>
                      <span className={styles.latestPostTime}>{latestPost.readingTime} min read</span>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          )}

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionPrompt}>$</span>
              <span className={styles.sectionTitle}>./links</span>
            </div>
            <div className={styles.sectionContent}>
              <div className={styles.links}>
                <a 
                  href="https://github.com/ecx2f" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.link}
                >
                  <span className={styles.linkPrefix}>./</span>
                  <span className={styles.linkText}>github</span>
                </a>
                <a 
                  href="https://x.com/ecx2f" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.link}
                >
                  <span className={styles.linkPrefix}>./</span>
                  <span className={styles.linkText}>x.com</span>
                </a>
                <a 
                  href="https://euxorasoft.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.link}
                >
                  <span className={styles.linkPrefix}>./</span>
                  <span className={styles.linkText}>euxorasoft (founder)</span>
                </a>
              </div>
            </div>
          </section>
        </div>
        
        <div className={styles.systemTerminal}>
          <SystemTerminal />
        </div>
      </main>
    </div>
    </>
  )
}

