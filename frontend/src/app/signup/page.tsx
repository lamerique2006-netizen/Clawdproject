'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { signup } from '@/lib/auth'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const user = signup(email, password)
      if (user) {
        router.push('/dashboard')
      } else {
        setError('Email already exists')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-brand/5"></div>

      {/* Animated background elements */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-4 sm:right-20 w-60 h-60 bg-brand-pink/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-4 sm:left-10 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="rounded-2xl sm:rounded-3xl bg-dark-card border border-dark-border p-6 sm:p-8 shadow-elevated">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-2xl sm:text-3xl font-bold bg-gradient-brand bg-clip-text text-transparent mb-2"
            >
              BrainAI
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-xl sm:text-2xl font-bold text-white mb-2"
            >
              Create Account
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-sm sm:text-base text-gray-400"
            >
              Start creating amazing videos today
            </motion.p>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-xs sm:text-sm text-brand-pink font-semibold mt-2"
            >
              ✨ Get 100 free credits
            </motion.p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl mb-6 font-semibold"
            >
              ⚠️ {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-3 sm:space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">📧 Email</label>
              <motion.input
                whileFocus={{
                  scale: 1.02,
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
                }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition text-sm sm:text-base"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">🔐 Password</label>
              <motion.input
                whileFocus={{
                  scale: 1.02,
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
                }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition text-sm sm:text-base"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">✓ Confirm Password</label>
              <motion.input
                whileFocus={{
                  scale: 1.02,
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
                }}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition text-sm sm:text-base"
                required
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              whileHover={!loading ? { scale: 1.05, boxShadow: '0 0 20px rgba(124, 58, 237, 0.6)' } : {}}
              whileTap={!loading ? { scale: 0.95 } : {}}
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-base sm:text-lg transition mt-4 sm:mt-6 ${
                loading
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-brand text-white hover:shadow-glow-purple'
              }`}
            >
              {loading ? (
                <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  ⏳ Creating account...
                </motion.span>
              ) : (
                '🚀 Sign Up Free'
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 }}
            className="text-center text-gray-400 mt-4 sm:mt-6 text-xs sm:text-sm"
          >
            Already have an account?{' '}
            <Link href="/login" className="text-brand-pink font-semibold hover:text-brand-coral transition">
              Login here
            </Link>
          </motion.p>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          className="text-center text-gray-500 text-xs mt-4 sm:mt-6"
        >
          By signing up, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </motion.div>
    </div>
  )
}
