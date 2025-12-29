import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug, image } = req.query

  if (typeof slug !== 'string' || typeof image !== 'string') {
    return res.status(400).json({ error: 'Invalid parameters' })
  }

  const imagePath = path.join(process.cwd(), 'posts', slug, image)

  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: 'Image not found' })
  }

  const imageBuffer = fs.readFileSync(imagePath)
  const ext = path.extname(image).toLowerCase()

  const contentType = 
    ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
    ext === '.png' ? 'image/png' :
    ext === '.gif' ? 'image/gif' :
    ext === '.webp' ? 'image/webp' :
    'application/octet-stream'

  res.setHeader('Content-Type', contentType)
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  return res.send(imageBuffer)
}

