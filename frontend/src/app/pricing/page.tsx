'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getCurrentUser, addCredits, logout } from '@/lib/auth'
import ScrollAnimation from '@/components/ScrollAnimation'

const PRICING_TIERS = [
  {
    name: 'Starter',
    icon: '🎯',
    price: 9.99,
    credits: 250,
    color: 'from-purple-500',
    features: ['250 Credits', 'All AI Models', 'Download Videos', 'Email Support'],
  },
  {
    name: 'Professional',
    icon: '⚡',
    price: 39.99,
    credits: 1250,
    popular: true,
    color: 'from-pink-500',
    features: ['1,250 Credits', 'All AI Models', 'Priority Processing', 'Email Support', 'API Access'],
  },
  {
    name: 'Enterprise',
    icon: '👑',
    price: 99.99,
    credits: 3500,
    color: 'from-orange-500',
    features: ['3,500 Credits', 'All AI Models', 'Instant Processing', 'Priority Support', 'API Access', 'Custom Models'],
  },
]

export default function PricingPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [processing, setProcessing] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/login')
    } else {
      setUser(currentUser)
    }
  }, [router])

  const handlePurchase = async (tier: typeof PRICING_TIERS[0]) => {
    if (!user) return

    setProcessing(tier.name)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    const updatedUser = addCredits(user.id, tier.credits)
    if (updatedUser) {
      setUser(updatedUser)
      alert(`🎉 Success! Added ${tier.credits} credits to your account.`)
    }

    setProcessing(null)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!mounted || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-dark-border bg-dark-card/80 backdrop-blur"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <Link href="/dashboard" className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">
                BrainAI
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center space-x-4"
          >
            <div className="text-right text-sm">
              <p className="text-gray-400">{user.email}</p>
              <p className="text-lg font-bold text-brand-pink">{user.credits} credits</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-dark-border transition"
              >
                ← Dashboard
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition text-sm font-semibold"
            >
              Logout
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-4"
          >
            Choose Your <span className="bg-gradient-brand bg-clip-text text-transparent">Perfect Plan</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Buy credits once, use them whenever. No subscriptions, no waste.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {PRICING_TIERS.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={
                tier.popular
                  ? { scale: 1.08, boxShadow: '0 20px 60px rgba(236, 72, 153, 0.4)' }
                  : { scale: 1.05, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }
              }
              className={`rounded-2xl overflow-hidden transition ${
                tier.popular ? 'ring-2 ring-brand-pink md:scale-105 shadow-glow-pink' : ''
              }`}
            >
              {tier.popular && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.15 + 0.4 }}
                  className="bg-gradient-brand text-white text-center py-3 font-bold"
                >
                  ⭐ MOST POPULAR
                </motion.div>
              )}
              <div className={`bg-gradient-dark border ${tier.popular ? 'border-brand-pink' : 'border-dark-border'} p-8`}>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl mb-4"
                >
                  {tier.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>

                <div className="mb-8 py-6 border-y border-dark-border">
                  <p className="text-5xl font-bold bg-gradient-brand bg-clip-text text-transparent">${tier.price}</p>
                  <p className="text-gray-400 mt-2">{tier.credits.toLocaleString()} credits</p>
                  <p className="text-xs text-gray-500 mt-2">
                    ${(tier.price / tier.credits * 1000).toFixed(2)} per 1000 credits
                  </p>
                </div>

                <motion.button
                  whileHover={
                    processing !== tier.name
                      ? {
                          scale: 1.05,
                          boxShadow: tier.popular ? '0 0 20px rgba(236, 72, 153, 0.6)' : '0 0 20px rgba(124, 58, 237, 0.6)',
                        }
                      : {}
                  }
                  whileTap={processing !== tier.name ? { scale: 0.95 } : {}}
                  onClick={() => handlePurchase(tier)}
                  disabled={processing === tier.name}
                  className={`w-full py-3 rounded-xl font-bold transition mb-6 ${
                    tier.popular
                      ? 'bg-gradient-brand text-white hover:shadow-glow-pink'
                      : 'bg-dark-card border border-dark-border text-gray-300 hover:border-brand-purple'
                  } ${processing === tier.name ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {processing === tier.name ? (
                    <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      ⏳ Processing...
                    </motion.span>
                  ) : (
                    `💳 Buy ${tier.name}`
                  )}
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.15 + 0.3, staggerChildren: 0.05 }}
                  className="space-y-3"
                >
                  {tier.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 + 0.3 + i * 0.05 }}
                      className="flex items-center"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.15 + 0.3 + i * 0.05 }}
                        className="text-brand-pink font-bold mr-3"
                      >
                        ✓
                      </motion.span>
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ */}
        <ScrollAnimation variant="fadeUp">
          <div className="bg-gradient-dark border border-dark-border rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: '🕐 Do credits expire?',
                  a: 'No, your credits never expire. Use them whenever you want.',
                },
                {
                  q: '💰 How much does a video cost?',
                  a: 'Each video generation costs 25 credits regardless of the AI model selected.',
                },
                {
                  q: '↩️ Can I get a refund?',
                  a: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied.',
                },
                {
                  q: '🖼️ What formats can I upload?',
                  a: 'We support JPG, PNG, WebP, and GIF formats for product images.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-b border-dark-border pb-6 last:border-0"
                >
                  <h3 className="font-bold text-white mb-2 text-lg">{item.q}</h3>
                  <p className="text-gray-400">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </main>
    </div>
  )
}
