'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCurrentUser, logout } from '@/lib/auth'
import ScrollAnimation from '@/components/ScrollAnimation'

const SAMPLE_VIDEOS = [
  {
    id: 1,
    title: 'Luxury Watch Cinematic',
    model: 'Cinematic Pro',
    icon: '⌚',
    duration: '15s',
  },
  {
    id: 2,
    title: 'Smartphone Product Showcase',
    model: 'Product Showcase',
    icon: '📱',
    duration: '10s',
  },
  {
    id: 3,
    title: 'Sneaker 360° Spin',
    model: 'Dynamic Spin',
    icon: '👟',
    duration: '12s',
  },
  {
    id: 4,
    title: 'Camera Equipment Pro',
    model: 'Cinematic Pro',
    icon: '📷',
    duration: '18s',
  },
  {
    id: 5,
    title: 'Jewelry Showcase Elegant',
    model: 'Product Showcase',
    icon: '💎',
    duration: '14s',
  },
  {
    id: 6,
    title: 'Headphone Dynamic Demo',
    model: 'Dynamic Spin',
    icon: '🎧',
    duration: '11s',
  },
]

export default function GalleryPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<(typeof SAMPLE_VIDEOS)[0] | null>(null)

  useEffect(() => {
    setMounted(true)
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/login')
    } else {
      setUser(currentUser)
    }
  }, [router])

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

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-4"
          >
            🌟 Get Inspired from <span className="bg-gradient-brand bg-clip-text text-transparent">Community</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Explore videos created with our AI models
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {SAMPLE_VIDEOS.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)',
                scale: 1.02,
              }}
              onClick={() => setSelectedVideo(video)}
              className="group rounded-2xl overflow-hidden cursor-pointer border border-dark-border hover:border-brand-pink transition"
            >
              <div className="relative aspect-video bg-gradient-dark flex items-center justify-center overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  className="text-7xl"
                >
                  {video.icon}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, backgroundColor: 'rgba(124, 58, 237, 0)' }}
                  whileHover={{ opacity: 1, backgroundColor: 'rgba(124, 58, 237, 0.2)' }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.button
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className="text-white text-4xl drop-shadow-lg"
                  >
                    ▶
                  </motion.button>
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {video.duration}
                </motion.span>
              </div>
              <div className="p-4 bg-dark-card border-t border-dark-border">
                <h3 className="font-bold text-white mb-1">{video.title}</h3>
                <p className="text-xs text-gray-400">{video.model}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <ScrollAnimation isContainer>
          <div className="grid md:grid-cols-3 gap-8 bg-gradient-dark border border-dark-border rounded-2xl p-12 text-center">
            {[
              { value: '2.5M+', label: 'Videos Generated' },
              { value: '98%', label: 'Customer Satisfaction' },
              { value: '< 2min', label: 'Average Processing' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <p className="text-4xl font-bold bg-gradient-brand bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </ScrollAnimation>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-card rounded-2xl overflow-hidden max-w-2xl w-full border border-dark-border shadow-elevated"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="aspect-video bg-dark-bg flex items-center justify-center"
              >
                <motion.div
                  animate={{ y: [-20, 20, -20] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-9xl"
                >
                  {selectedVideo.icon}
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="p-6"
              >
                <h2 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h2>
                <p className="text-gray-400 mb-4">
                  Model: <span className="text-brand-pink font-semibold">{selectedVideo.model}</span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(124, 58, 237, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedVideo(null)}
                  className="w-full bg-gradient-brand text-white py-3 rounded-xl font-bold hover:shadow-glow-purple transition"
                >
                  ✕ Close
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
