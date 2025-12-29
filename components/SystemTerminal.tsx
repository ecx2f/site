'use client'

import { useState, useEffect, useRef } from 'react'
import styles from '@/styles/SystemTerminal.module.css'

const messages = [
  '> initializing dev environment...',
  '> compiling code... done.',
  '> running tests... all passed ✓',
  '> deploying to production...',
  '> building docker image...',
  '> npm install... dependencies resolved',
  '> git commit -m "feat: add cool feature"',
  '> fixing bugs... 0 errors found',
  '> optimizing bundle size...',
  '> running linter... no issues',
  '> connecting to database... connected',
  '> starting server... listening on port 3000',
  '> type checking... no errors',
  '> building for production...',
  '> analyzing code... 100% coverage',
  '> merging pull request...',
  '> code review complete... approved',
  '> pushing to remote... done',
  '> hot reload active... watching files',
  '> cache cleared... rebuilding',
]

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

export default function SystemTerminal() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const currentIndexRef = useRef(0)
  const messageRef = useRef('')

  useEffect(() => {
    messageRef.current = messages[currentMessageIndex]
    currentIndexRef.current = 0
    setDisplayText('')
    setIsComplete(false)

    let scrambleInterval: NodeJS.Timeout
    let updateInterval: NodeJS.Timeout

    const startScramble = () => {
      updateInterval = setInterval(() => {
        if (currentIndexRef.current < messageRef.current.length) {
          let scrambled = messageRef.current.slice(0, currentIndexRef.current)
          
          for (let i = currentIndexRef.current; i < messageRef.current.length; i++) {
            scrambled += chars[Math.floor(Math.random() * chars.length)]
          }

          setDisplayText(scrambled)

          // Más rápido: mayor probabilidad y avance más rápido
          if (Math.random() < 0.35) {
            currentIndexRef.current++
            
            if (currentIndexRef.current >= messageRef.current.length) {
              clearInterval(updateInterval)
              clearInterval(scrambleInterval)
              setDisplayText(messageRef.current)
              setIsComplete(true)
              
              // Aumentar el tiempo que se muestra cada mensaje completo (de 300ms a 2000ms)
              setTimeout(() => {
                // Loop infinito: volver al inicio cuando llegue al final
                setCurrentMessageIndex(prev => (prev + 1) % messages.length)
              }, 2000)
            }
          }
        }
      }, 15)

      scrambleInterval = setInterval(() => {
        if (currentIndexRef.current < messageRef.current.length) {
          let scrambled = messageRef.current.slice(0, currentIndexRef.current)
          for (let i = currentIndexRef.current; i < messageRef.current.length; i++) {
            scrambled += chars[Math.floor(Math.random() * chars.length)]
          }
          setDisplayText(scrambled)
        }
      }, 10)
    }

    startScramble()

    return () => {
      clearInterval(updateInterval)
      clearInterval(scrambleInterval)
    }
  }, [currentMessageIndex])

  return (
    <div className={styles.terminal}>
      <span className={styles.prompt}>$</span>
      <span className={styles.command}>{displayText}</span>
      {!isComplete && <span className={styles.cursor}>_</span>}
    </div>
  )
}

