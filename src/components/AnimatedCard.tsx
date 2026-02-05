'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export default function AnimatedCard({ children, className = '', delay = 0, hover = true }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={
        hover
          ? {
              y: -10,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              transition: { duration: 0.3 },
            }
          : {}
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}
