'use client';

import Image from "next/image";
import Link from "next/link";
import { useTracker } from "./hooks/useTracker";

export default function Home() {
  const { trackEvent } = useTracker();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            CausalFunnel
          </div>
          <div className="flex gap-8 text-sm font-medium text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <Link href="#" className="hover:text-white transition-colors">About</Link>
          </div>
          <button
            onClick={() => trackEvent('click', { element: 'nav_cta', location: 'nav' })}
            className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
            Analytics for <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Modern Brands
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
            Understand your users like never before. Real-time tracking, heatmaps, and session replays in one powerful dashboard.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => trackEvent('click', { element: 'hero_primary' })}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full font-bold text-lg transition-all hover:scale-105"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => trackEvent('click', { element: 'hero_secondary' })}
              className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-full font-bold text-lg transition-all"
            >
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Real-time Tracking", desc: "See users as they browse your site live." },
              { title: "Heatmaps", desc: "Visualize where users click and scroll." },
              { title: "Session Replay", desc: "Watch exactly how users interact with your app." }
            ].map((feature, i) => (
              <div
                key={i}
                onClick={() => trackEvent('click', { element: 'feature_card', feature: feature.title })}
                className="p-8 rounded-3xl bg-black border border-zinc-800 hover:border-purple-500/50 transition-colors cursor-pointer group"
              >
                <div className="h-12 w-12 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                  <div className="h-6 w-6 bg-purple-500 rounded-full" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-zinc-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-[3rem] p-12 md:p-24 text-center border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to grow?</h2>
            <button
              onClick={() => trackEvent('click', { element: 'footer_cta' })}
              className="px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:scale-105 transition-transform"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
