'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface PremiumButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
  icon?: React.ReactNode
}

export default function PremiumButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  type = 'button',
  icon,
}: PremiumButtonProps) {
  const baseClasses =
    'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group'

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary:
      'bg-gradient-brand text-white shadow-glow-purple hover:shadow-glow-purple-lg disabled:bg-gray-600 disabled:shadow-none',
    secondary:
      'bg-dark-card border-2 border-dark-border-light text-white hover:border-brand-purple disabled:border-gray-600',
    ghost: 'text-gray-300 hover:text-white hover:bg-dark-card/50 disabled:text-gray-600',
    danger:
      'bg-red-600 text-white shadow-soft hover:bg-red-700 disabled:bg-red-800',
  }

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      }`}
    >
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />

      {/* Content */}
      <motion.div
        animate={loading ? { rotate: 360 } : {}}
        transition={loading ? { duration: 1.5, repeat: Infinity, ease: 'linear' } : {}}
        className="relative z-10"
      >
        {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> : icon}
      </motion.div>

      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
