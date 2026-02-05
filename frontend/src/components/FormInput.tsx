'use client'

import { motion } from 'framer-motion'
import React, { useState } from 'react'

interface FormInputProps {
  label?: string
  placeholder?: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  disabled?: boolean
  required?: boolean
  icon?: React.ReactNode
  className?: string
  name?: string
}

export default function FormInput({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  icon,
  className = '',
  name,
}: FormInputProps) {
  const [focused, setFocused] = useState(false)

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <motion.label
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="block text-sm font-semibold text-gray-300 mb-2"
        >
          {label}
          {required && <span className="text-brand-pink ml-1">*</span>}
        </motion.label>
      )}

      <motion.div
        animate={
          focused
            ? {
                boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.1), 0 0 20px rgba(124, 58, 237, 0.2)',
              }
            : {}
        }
        transition={{ duration: 0.2 }}
        className={`relative rounded-xl border-2 transition-all duration-200 ${
          error
            ? 'border-red-500/50 focus-within:border-red-500'
            : 'border-dark-border hover:border-dark-border-light focus-within:border-brand-purple'
        } ${disabled ? 'bg-dark-border/30 cursor-not-allowed' : 'bg-dark-card/50 hover:bg-dark-card/70'}`}
      >
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className={`w-full px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none transition-all ${
            icon ? 'pl-12' : ''
          } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
        />

        {/* Focus border animation */}
        {!error && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-brand rounded-full"
            initial={{ width: '0%' }}
            animate={focused ? { width: '100%' } : { width: '0%' }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-red-400 text-sm mt-2 flex items-center gap-1"
        >
          <span>⚠️</span> {error}
        </motion.p>
      )}
    </motion.div>
  )
}
