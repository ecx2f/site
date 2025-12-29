import Head from 'next/head'
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
  const siteUrl = 'https://ecx2f.dev'
  const postUrl = `${siteUrl}/blog/${post.slug}`
  const title = `${post.title} • ecx2f.dev`
  
  // Extract plain text from HTML for description (first 160 chars)
  const plainText = post.contentHtml
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const description = plainText.length > 160 
    ? plainText.substring(0, 160) + '...' 
    : plainText

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={postUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="article:published_time" content={post.date} />
        {post.heroImage && (
          <meta property="og:image" content={`${siteUrl}${post.heroImage}`} />
        )}

        {/* Twitter Card */}
        <meta name="twitter:card" content={post.heroImage ? "summary_large_image" : "summary"} />
        <meta name="twitter:url" content={postUrl} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        {post.heroImage && (
          <meta name="twitter:image" content={`${siteUrl}${post.heroImage}`} />
        )}
      </Head>
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
    </>
  )
}

