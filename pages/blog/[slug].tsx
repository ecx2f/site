import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPosts, getPostBySlug, getPostSlugs } from '@/lib/posts'
import styles from '@/styles/Post.module.css'

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getPostSlugs()
  const paths = slugs.map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post: {
        ...post,
        slug,
      },
    },
  }
}

interface PostProps {
  post: {
    slug: string
    title: string
    date: string
    readingTime: number
    contentHtml: string
    heroImage?: string
  }
}

export default function Post({ post }: PostProps) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.prompt}>
          <span className={styles.dollar}>$</span> cat posts/{post.slug}/index.md
        </div>
        <article className={styles.article}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span className={styles.date}>{post.date}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.readingTime}>{post.readingTime} min read</span>
          </div>
          {post.heroImage && (
            <div className={styles.heroImage}>
              <img
                src={post.heroImage}
                alt={post.title}
                className={styles.heroImg}
              />
            </div>
          )}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </main>
    </div>
  )
}

