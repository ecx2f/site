'use client'

import { useState, useEffect, useRef } from 'react'
import styles from '@/styles/Terminal.module.css'

interface TerminalProps {
  command: string
  delay?: number
  onComplete?: () => void
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

export default function Terminal({ command, delay = 50, onComplete }: TerminalProps) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const currentIndexRef = useRef(0)

  useEffect(() => {
    currentIndexRef.current = 0
    setDisplayText('')
    setIsComplete(false)

    let scrambleInterval: NodeJS.Timeout
    let updateInterval: NodeJS.Timeout

    const startScramble = () => {
      updateInterval = setInterval(() => {
        if (currentIndexRef.current < command.length) {
          let scrambled = command.slice(0, currentIndexRef.current)
          
          // Scramble the remaining characters
          for (let i = currentIndexRef.current; i < command.length; i++) {
            scrambled += chars[Math.floor(Math.random() * chars.length)]
          }

          setDisplayText(scrambled)

          // Occasionally reveal the correct character
          if (Math.random() < 0.15) {
            currentIndexRef.current++
            
            if (currentIndexRef.current >= command.length) {
              clearInterval(updateInterval)
              clearInterval(scrambleInterval)
              setDisplayText(command)
              setIsComplete(true)
              if (onComplete) {
                setTimeout(() => onComplete(), 100)
              }
            }
          }
        }
      }, delay)

      scrambleInterval = setInterval(() => {
        if (currentIndexRef.current < command.length) {
          let scrambled = command.slice(0, currentIndexRef.current)
          for (let i = currentIndexRef.current; i < command.length; i++) {
            scrambled += chars[Math.floor(Math.random() * chars.length)]
          }
          setDisplayText(scrambled)
        }
      }, 30)
    }

    startScramble()

    return () => {
      clearInterval(updateInterval)
      clearInterval(scrambleInterval)
    }
  }, [command, delay, onComplete])

  return (
    <div className={styles.terminal}>
      <span className={styles.prompt}>$</span>
      <span className={styles.command}>{displayText}</span>
      {!isComplete && <span className={styles.cursor}>_</span>}
    </div>
  )
}

