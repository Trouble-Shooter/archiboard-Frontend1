'use client';

import Link from 'next/link';
import { FiGithub, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-stone-900 font-display text-lg font-bold">A</span>
              </div>
              <span className="text-xl font-display font-bold text-white">ArchiBoard</span>
            </div>
            <p className="text-sm text-stone-400">
              Discover and share stunning architectural designs from creators worldwide.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Explore</Link></li>
              <li><Link href="/upload" className="hover:text-white transition-colors">Upload</Link></li>
              <li><Link href="/boards" className="hover:text-white transition-colors">Boards</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <FiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8">
          <p className="text-center text-sm text-stone-500">
            © {currentYear} ArchiBoard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
