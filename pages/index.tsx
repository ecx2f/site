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
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.prompt}>
            <span className={styles.dollar}>$</span> cat about.txt
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
              </div>
            </div>
          </section>
        </div>
        
        <div className={styles.systemTerminal}>
          <SystemTerminal />
        </div>
      </main>
    </div>
  )
}

