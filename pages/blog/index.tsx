import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import styles from '@/styles/Blog.module.css'

export async function getStaticProps() {
  const posts = await getAllPosts()
  return {
    props: {
      posts,
    },
  }
}

interface BlogIndexProps {
  posts: Array<{
    slug: string
    title: string
    date: string
    readingTime: number
  }>
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  const siteUrl = 'https://ecx2f.dev'
  const title = 'blog • ecx2f.dev'
  const description = 'blog posts about low-level programming, backend development, automation, cybersecurity, reverse engineering, and ai integration.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}/blog`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/blog`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`${siteUrl}/blog`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.prompt}>
          <span className={styles.dollar}>$</span> cat blog.txt
        </div>
        <h1 className={styles.title}>blog</h1>
        <ul className={styles.postList}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.postItem}>
              <Link href={`/blog/${post.slug}`}>
                <span className={styles.postTitle}>{post.title}</span>
                <div className={styles.postMeta}>
                  <span className={styles.postDate}>{post.date}</span>
                  <span className={styles.separator}>•</span>
                  <span className={styles.readingTime}>{post.readingTime} min read</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
    </>
  )
}

