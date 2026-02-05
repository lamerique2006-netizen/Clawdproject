'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  className?: string
  pulse?: boolean
}

export default function AnimatedButton({
  children,
  onClick,
  href,
  className = '',
  pulse = false,
}: AnimatedButtonProps) {
  const content = (
    <motion.button
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 20px rgba(124, 58, 237, 0.6)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`${className} relative overflow-hidden`}
    >
      {/* Pulse effect glow */}
      {pulse && (
        <motion.div
          animate={{ scale: [0.8, 1.2], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-brand rounded-full opacity-0"
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    )
  }

  return content
}
