'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { FiSearch, FiUser, FiGrid, FiLogOut, FiSettings } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-stone-900 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <span className="text-white font-display text-xl font-bold">A</span>
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">
              Archi<span className="text-stone-600">Board</span>
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search architectural designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-stone-50 border-2 border-transparent rounded-full focus:border-stone-900 focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </form>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  href="/upload"
                  className="hidden sm:flex items-center space-x-2 bg-stone-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-stone-800 transition-colors"
                >
                  <span>Upload</span>
                </Link>

                <Link
                  href="/boards"
                  className="hidden sm:flex items-center space-x-2 text-stone-700 hover:text-stone-900 transition-colors"
                >
                  <FiGrid className="w-5 h-5" />
                  <span className="font-medium">Boards</span>
                </Link>

                {user?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="hidden sm:flex items-center space-x-2 text-stone-700 hover:text-stone-900 transition-colors"
                  >
                    <FiSettings className="w-5 h-5" />
                    <span className="font-medium">Admin</span>
                  </Link>
                )}

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center hover:bg-stone-300 transition-colors"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <FiUser className="w-5 h-5 text-stone-600" />
                    )}
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-stone-200 py-2">
                      <div className="px-4 py-3 border-b border-stone-100">
                        <p className="font-medium text-stone-900">{user?.username}</p>
                        <p className="text-sm text-stone-500">{user?.email}</p>
                      </div>
                      <Link
                        href={`/profile/${user?.id}`}
                        className="block px-4 py-2 text-stone-700 hover:bg-stone-50 transition-colors"
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/boards"
                        className="block px-4 py-2 text-stone-700 hover:bg-stone-50 transition-colors"
                      >
                        My Boards
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-stone-700 hover:text-stone-900 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-stone-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-stone-800 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
