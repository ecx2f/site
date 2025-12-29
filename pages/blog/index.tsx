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
  return (
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
  )
}

