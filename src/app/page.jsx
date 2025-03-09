"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, MapPin, Shield, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
  <Header/>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        {/* Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Curved Lines */}
          <svg
            className="absolute h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#E31837" stopOpacity="0" />
                <stop offset="50%" stopColor="#E31837" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#E31837" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#1B365D" stopOpacity="0" />
                <stop offset="50%" stopColor="#1B365D" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#1B365D" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Animation paths updated with brand colors */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1
              }}
              d="M 100 100 Q 300 0 500 100 T 900 100"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="1"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
                delay: 0.5
              }}
              d="M 0 200 Q 200 100 400 200 T 800 200"
              fill="none"
              stroke="url(#grad2)"
              strokeWidth="1"
            />
          </svg>

          {/* Straight Lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: "100%", opacity: 0 }}
                animate={{
                  x: "-100%",
                  opacity: [0, 0.7, 0.7, 0]
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "linear"
                }}
                className="absolute right-0"
                style={{
                  top: `${15 + i * 10}%`,
                  height: "1px",
                  width: "100%",
                  background: `linear-gradient(90deg, transparent, ${
                    i % 2 === 0 ? "#E31837" : "#1B365D"
                  }60, transparent)`
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 z-[1]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#E31837]/20 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute -right-1/4 top-1/2 h-96 w-96 rounded-full bg-[#1B365D]/20 blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="container relative z-[3] px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mx-auto max-w-3xl space-y-8"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              AED Locate: Register your AED or Search For an AED
            </h1>
            <p className="mx-auto max-w-2xl text-muted text-gray-400 sm:text-xl">
              Help save lives by registering your Automated External
              Defibrillator (AED) or quickly locate the nearest one in
              emergencies.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-[#E31837] text-lg text-white hover:bg-[#E31837]/90">
                Find Nearest AED
                <MapPin className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/register-aed" passHref>
                <Button
                  variant="outline"
                  className="border-white bg-white text-[#1B365D] hover:bg-white hover:text-[#1B365D]"
                >
                  Register Your AED
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 border-t border-white/10 bg-black py-24"
      >
        <div className="px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose AED Locate?
            </h2>
            <p className="mt-4 text-gray-400">
              Making AED access simple, fast, and reliable
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-[#E31837]/50"
            >
              <MapPin className="mb-4 h-12 w-12 text-[#E31837]" />
              <h3 className="mb-2 text-xl font-bold">Precise Location</h3>
              <p className="text-gray-400">
                Real-time mapping and directions to the nearest AED devices in
                your vicinity.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-[#1B365D]/50"
            >
              <Clock className="mb-4 h-12 w-12 text-[#1B365D]" />
              <h3 className="mb-2 text-xl font-bold">24/7 Availability</h3>
              <p className="text-gray-400">
                Access to AED location information around the clock, because
                emergencies don't wait.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-[#E31837]/50"
            >
              <Shield className="mb-4 h-12 w-12 text-[#E31837]" />
              <h3 className="mb-2 text-xl font-bold">Verified Devices</h3>
              <p className="text-gray-400">
                All registered AEDs are verified and regularly checked for
                operational status.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 border-t border-white/10 bg-black py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-r from-[#E31837]/10 to-[#1B365D]/10 p-8 text-center backdrop-blur-sm md:p-12 lg:p-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Join Our Network
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              Help build a comprehensive network of accessible AEDs in your
              community.
            </p>
            <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-4 text-left">
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-[#E31837]" />
                <span>Easy device registration process</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-[#E31837]" />
                <span>Regular maintenance reminders</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-[#E31837]" />
                <span>Community impact tracking</span>
              </li>
            </ul>
            <Link href="/register-aed" passHref>
              <Button className="mt-8 bg-[#E31837] text-lg text-white hover:bg-[#E31837]/90">
                Register Your AED
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
<Footer/>
    </div>
  )
}
