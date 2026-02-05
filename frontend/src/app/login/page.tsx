'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { login } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = login(email, password)
      if (user) {
        router.push('/dashboard')
      } else {
        setError('Invalid email or password')
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
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-4 sm:left-10 w-40 h-40 bg-brand-purple/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-4 sm:right-10 w-60 h-60 bg-brand-pink/10 rounded-full blur-3xl"
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
              Welcome Back
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-sm sm:text-base text-gray-400"
            >
              Login to your account
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
          <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
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
              transition={{ duration: 0.4, delay: 0.6 }}
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

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
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
                  ⏳ Logging in...
                </motion.span>
              ) : (
                '🚀 Login'
              )}
            </motion.button>
          </form>

          {/* Signup Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="text-center text-gray-400 mt-4 sm:mt-6 text-xs sm:text-sm"
          >
            Don't have an account?{' '}
            <Link href="/signup" className="text-brand-pink font-semibold hover:text-brand-coral transition">
              Sign up free
            </Link>
          </motion.p>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-dark-border"
          >
            <p className="text-xs text-gray-500 text-center mb-3">💡 Demo credentials</p>
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(124, 58, 237, 0.3)' }}
              className="bg-dark-bg p-3 rounded-lg text-xs text-gray-400 space-y-1"
            >
              <p>
                <span className="text-brand-purple">Email:</span> demo@example.com
              </p>
              <p>
                <span className="text-brand-pink">Password:</span> password123
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="text-center text-gray-500 text-xs mt-4 sm:mt-6"
        >
          Don't have an account yet?{' '}
          <Link href="/signup" className="text-brand-pink hover:underline">
            Create one free
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}
