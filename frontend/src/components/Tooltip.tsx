'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface TooltipProps {
  children: React.ReactNode
  content: string
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export default function Tooltip({ children, content, side = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  const positions = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  }

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${positions[side]} z-50 whitespace-nowrap bg-dark-card border border-dark-border rounded-lg px-3 py-2 text-xs text-gray-300 shadow-elevated`}
          >
            {content}
            {/* Arrow pointer */}
            <motion.div
              className={`absolute w-2 h-2 bg-dark-card border border-dark-border ${
                side === 'top'
                  ? 'top-full left-1/2 -translate-x-1/2 -translate-y-1 border-t-0 border-l-0'
                  : side === 'bottom'
                    ? 'bottom-full left-1/2 -translate-x-1/2 translate-y-1 border-b-0 border-r-0'
                    : side === 'left'
                      ? 'left-full top-1/2 -translate-y-1/2 translate-x-1 border-l-0 border-b-0'
                      : 'right-full top-1/2 -translate-y-1/2 -translate-x-1 border-r-0 border-t-0'
              } rotate-45`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
