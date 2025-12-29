import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

// Average reading speed: 200 words per minute
const WORDS_PER_MINUTE = 200

function calculateReadingTime(text: string): number {
  // Remove HTML tags and get plain text
  const plainText = text.replace(/<[^>]*>/g, ' ')
  // Count words (split by whitespace and filter empty strings)
  const words = plainText.trim().split(/\s+/).filter(word => word.length > 0)
  const wordCount = words.length
  // Calculate minutes (round up, minimum 1 minute)
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

export interface PostData {
  slug: string
  title: string
  date: string
  contentHtml: string
  readingTime: number
  heroImage?: string | null
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true })
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, slug, 'index.md')
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(content)
  
  const contentHtml = processedContent.toString()
  
  // Calculate reading time
  const readingTime = calculateReadingTime(contentHtml)

  // Ensure date is always a string
  let dateString = ''
  if (data.date) {
    if (data.date instanceof Date) {
      dateString = data.date.toISOString().split('T')[0]
    } else {
      dateString = String(data.date)
    }
  }

  // Check for hero image (hero.jpg or cover.png)
  const postDir = path.join(postsDirectory, slug)
  let heroImage: string | null = null
  
  const heroJpg = path.join(postDir, 'hero.jpg')
  const coverPng = path.join(postDir, 'cover.png')
  
  if (fs.existsSync(heroJpg)) {
    heroImage = `/posts/${slug}/hero.jpg`
  } else if (fs.existsSync(coverPng)) {
    heroImage = `/posts/${slug}/cover.png`
  }

  return {
    slug,
    title: data.title || slug,
    date: dateString,
    contentHtml,
    readingTime,
    ...(heroImage && { heroImage }),
  }
}

export async function getAllPosts(): Promise<PostData[]> {
  const slugs = getPostSlugs()
  const posts = await Promise.all(
    slugs.map(slug => getPostBySlug(slug))
  )
  
  return posts
    .filter((post): post is PostData => post !== null)
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
}

