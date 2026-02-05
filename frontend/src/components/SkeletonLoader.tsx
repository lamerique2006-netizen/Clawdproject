'use client'

import { motion } from 'framer-motion'

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'avatar' | 'input' | 'button'
  count?: number
  className?: string
}

export default function SkeletonLoader({
  variant = 'card',
  count = 1,
  className = '',
}: SkeletonLoaderProps) {
  const shimmer = {
    backgroundImage:
      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 2s infinite',
  }

  const renderSkeletons = () => {
    const skeletons = []
    for (let i = 0; i < count; i++) {
      skeletons.push(
        <motion.div
          key={i}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`${className} bg-dark-border/50`}
          style={shimmer}
        >
          {variant === 'card' && <div className="w-full h-48 rounded-xl" />}
          {variant === 'text' && <div className="w-full h-4 rounded-lg mb-3" />}
          {variant === 'avatar' && <div className="w-12 h-12 rounded-full" />}
          {variant === 'input' && <div className="w-full h-10 rounded-lg" />}
          {variant === 'button' && <div className="w-full h-12 rounded-xl" />}
        </motion.div>
      )
    }
    return skeletons
  }

  return <div className="space-y-4">{renderSkeletons()}</div>
}
