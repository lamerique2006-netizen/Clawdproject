'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCurrentUser } from '@/lib/auth'
import AnimatedCard from '@/components/AnimatedCard'
import ScrollAnimation from '@/components/ScrollAnimation'

const FEATURES = [
  {
    icon: '🎬',
    title: 'Video Creation',
    description: 'Transform product images into stunning AI-generated videos',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: '🖼️',
    title: 'Image Enhancement',
    description: 'Upscale and enhance product images with AI',
    gradient: 'from-pink-500/20 to-coral-500/20',
  },
  {
    icon: '📝',
    title: 'Article Generation',
    description: 'Auto-generate product descriptions and marketing copy',
    gradient: 'from-coral-500/20 to-purple-500/20',
  },
]

const STATS = [
  { label: 'Videos Created', value: '2.5M+', icon: '🎥' },
  { label: 'Happy Users', value: '45K+', icon: '😊' },
  { label: 'Uptime', value: '99.9%', icon: '⚡' },
  { label: 'Avg Speed', value: '< 2min', icon: '🚀' },
]

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  if (!mounted) return null

  if (user) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 w-full z-50 bg-dark-card/95 backdrop-blur border-b border-dark-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent"
          >
            BrainAI
          </motion.h1>
          
          {/* Desktop Menu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden sm:flex space-x-4"
          >
            <Link href="/login" className="text-gray-300 hover:text-white transition py-2">
              Login
            </Link>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(124, 58, 237, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/signup"
                className="bg-gradient-brand text-white px-6 py-2 rounded-lg font-semibold hover:shadow-glow-purple transition inline-block"
              >
                Sign Up Free
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-dark-border transition"
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden border-t border-dark-border bg-dark-card/50"
            >
              <div className="px-4 py-4 space-y-3">
                <Link
                  href="/login"
                  className="block text-gray-300 hover:text-white transition py-2 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/signup"
                    className="block bg-gradient-brand text-white px-6 py-3 rounded-lg font-semibold text-center hover:shadow-glow-purple transition w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up Free
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 mt-16">
        <div className="absolute inset-0 bg-gradient-brand/5"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center mb-12 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight"
          >
            Make Your <span className="bg-gradient-brand bg-clip-text text-transparent">Ideas Happen</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your product images into stunning AI-generated videos in seconds. No equipment, no technical skills required.
          </motion.p>

          {/* CTA Buttons with animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/signup"
                className="block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-brand text-white font-bold rounded-full hover:shadow-glow-purple transition text-base sm:text-lg"
              >
                🚀 Get Started Free
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                className="block px-6 sm:px-8 py-3 sm:py-4 border border-brand-purple text-gray-300 font-bold rounded-full hover:bg-brand-purple/10 transition text-base sm:text-lg"
              >
                ➡️ Watch Demo
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats with stagger animation */}
          <ScrollAnimation isContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-dark-border">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="py-3 sm:py-4"
              >
                <p className="text-xl sm:text-2xl mb-2">{stat.icon}</p>
                <p className="text-2xl sm:text-3xl font-bold text-brand-pink">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </ScrollAnimation>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
        <ScrollAnimation variant="fadeUp">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">Powerful Features</h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">Everything you need to create stunning AI videos in one platform</p>
          </div>
        </ScrollAnimation>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.12 }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {FEATURES.map((feature, i) => (
            <AnimatedCard key={i} delay={i * 0.15} hover>
              <motion.div
                whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(124, 58, 237, 0.2)' }}
                transition={{ duration: 0.3 }}
                className={`relative p-7 sm:p-9 rounded-2xl border border-dark-border bg-gradient-to-br from-dark-card/80 to-dark-border/40 hover:border-brand-purple/60 transition group cursor-pointer overflow-hidden`}
              >
                {/* Gradient background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                />

                <motion.div
                  whileHover={{ scale: 1.25, rotate: 8 }}
                  transition={{ duration: 0.3, type: 'spring' }}
                  className="text-5xl sm:text-6xl mb-6 relative z-10"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 relative z-10">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed relative z-10">{feature.description}</p>
                <motion.div
                  initial={{ x: 0, opacity: 0.7 }}
                  whileHover={{ x: 8, opacity: 1 }}
                  className="mt-8 flex items-center text-brand-pink font-semibold text-sm sm:text-base relative z-10"
                >
                  Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </motion.div>
              </motion.div>
            </AnimatedCard>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <ScrollAnimation variant="fadeUp">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">3 Simple Steps</h2>
        </ScrollAnimation>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[
            { step: '1️⃣', title: 'Upload Image', desc: 'Drop your product image' },
            { step: '2️⃣', title: 'Select Model', desc: 'Choose AI generation style' },
            { step: '3️⃣', title: 'Get Video', desc: 'Download your video instantly' },
          ].map((item, i) => (
            <ScrollAnimation key={i} variant="fadeUp" delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-dark border border-dark-border text-center"
              >
                <motion.p
                  whileHover={{ scale: 1.3, rotate: 5 }}
                  className="text-4xl sm:text-5xl mb-4"
                >
                  {item.step}
                </motion.p>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-400">{item.desc}</p>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
        <ScrollAnimation variant="fadeUp">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">Flexible Pricing</h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">Choose the perfect plan for your needs</p>
          </div>
        </ScrollAnimation>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-6"
        >
          {[
            { credits: '250', price: '$9.99', popular: false, perCredit: '$0.040' },
            { credits: '1,250', price: '$39.99', popular: true, perCredit: '$0.032', saving: 'Save 20%' },
            { credits: '3,500', price: '$99.99', popular: false, perCredit: '$0.029', saving: 'Save 27%' },
          ].map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={tier.popular ? { y: -12, boxShadow: '0 30px 80px rgba(236, 72, 153, 0.25)' } : { y: -8 }}
              className={`relative p-7 sm:p-9 rounded-2xl border transition duration-300 ${
                tier.popular
                  ? 'bg-gradient-to-br from-brand-pink/20 to-brand-purple/10 border-brand-pink/60 shadow-glow-pink lg:scale-105'
                  : 'bg-gradient-to-br from-dark-card/80 to-dark-border/40 border-dark-border hover:border-brand-purple/60'
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.2, type: 'spring' }}
                  className="absolute -top-3 -right-3 bg-gradient-brand text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg"
                >
                  🏆 POPULAR
                </motion.div>
              )}

              <div className="mb-8">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 + 0.1 }}
                  className="text-4xl sm:text-5xl font-bold mb-2"
                >
                  {tier.credits}
                </motion.p>
                <p className="text-gray-400 text-sm">Credits per month</p>
              </div>

              <div className="mb-8 pb-8 border-b border-dark-border/50">
                <p className="text-4xl sm:text-5xl font-bold bg-gradient-brand bg-clip-text text-transparent mb-2">
                  {tier.price}
                </p>
                <p className="text-gray-400 text-xs">
                  <span className="text-gray-500">{tier.perCredit} per credit</span>
                </p>
                {tier.saving && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.15 + 0.3 }}
                    className="inline-block mt-3 text-xs font-bold text-green-400 bg-green-500/20 px-3 py-1 rounded-full"
                  >
                    ✓ {tier.saving}
                  </motion.span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-xl font-bold text-base transition duration-300 ${
                  tier.popular
                    ? 'bg-gradient-brand text-white shadow-glow-purple hover:shadow-glow-purple-lg'
                    : 'bg-dark-card border-2 border-dark-border text-white hover:border-brand-purple hover:bg-dark-card/80'
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <ScrollAnimation variant="fadeUp">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">Ready to Transform Your Products?</h2>
        </ScrollAnimation>
        <ScrollAnimation variant="fadeUp" delay={0.2}>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8">Join 45,000+ creators using BrainAI</p>
        </ScrollAnimation>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/signup"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-brand text-white font-bold rounded-full hover:shadow-glow-purple transition text-base sm:text-lg"
          >
            🎬 Start Creating Videos Now
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-border px-4 sm:px-6 py-8 sm:py-12 bg-dark-card/50">
        <div className="max-w-6xl mx-auto text-center text-gray-400 text-xs sm:text-sm">
          <p>&copy; 2026 BrainAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
