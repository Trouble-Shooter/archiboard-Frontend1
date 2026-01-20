'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { FiSearch, FiUser, FiGrid, FiLogOut, FiSettings, FiUpload, FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAvatarUrl } from '@/lib/api';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setShowMobileMenu(false);
    setShowUserMenu(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-md' : 'bg-white/80 backdrop-blur-md'
      } border-b border-stone-200`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-stone-900 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg">
              <span className="text-white font-display text-2xl font-bold">A</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-display font-bold tracking-tight">
                Archi<span className="text-stone-600">Board</span>
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/upload"
                  className="flex items-center space-x-2 bg-stone-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-stone-800 transition-colors"
                >
                  <FiUpload className="w-4 h-4" />
                  <span>Upload</span>
                </Link>

                <Link
                  href="/boards"
                  className="flex items-center space-x-2 text-stone-700 hover:text-stone-900 px-4 py-2.5 rounded-full hover:bg-stone-100 transition-colors"
                >
                  <FiGrid className="w-5 h-5" />
                  <span className="font-medium">Boards</span>
                </Link>

                {user?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="flex items-center space-x-2 text-stone-700 hover:text-stone-900 px-4 py-2.5 rounded-full hover:bg-stone-100 transition-colors"
                  >
                    <FiSettings className="w-5 h-5" />
                    <span className="font-medium">Admin</span>
                  </Link>
                )}

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="w-11 h-11 rounded-full bg-stone-200 flex items-center justify-center hover:bg-stone-300 transition-colors overflow-hidden ring-2 ring-transparent hover:ring-stone-900"
                  >
                    {user?.avatar ? (
                      <Image
                        src={getAvatarUrl(user.avatar)}
                        alt={user.username}
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-semibold text-stone-600">
                        {user?.username.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </button>

                  {showUserMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowUserMenu(false)}
                      />
                      <div className="dropdown">
                        <div className="px-4 py-3 border-b border-stone-100">
                          <p className="font-semibold text-stone-900 truncate">{user?.username}</p>
                          <p className="text-sm text-stone-500 truncate">{user?.email}</p>
                        </div>
                        <Link
                          href={`/profile/${user?.id}`}
                          className="dropdown-item flex items-center space-x-2"
                        >
                          <FiUser className="w-4 h-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          href="/boards"
                          className="dropdown-item flex items-center space-x-2"
                        >
                          <FiGrid className="w-4 h-4" />
                          <span>My Boards</span>
                        </Link>
                        <div className="border-t border-stone-100 my-2" />
                        <button
                          onClick={handleLogout}
                          className="dropdown-item text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <FiLogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-stone-700 hover:text-stone-900 font-medium px-4 py-2.5 rounded-full hover:bg-stone-100 transition-colors"
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
          >
            {showMobileMenu ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-stone-200 animate-slide-up">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search designs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-stone-50 border-2 border-transparent rounded-full focus:border-stone-900 focus:outline-none transition-all"
                />
              </div>
            </form>

            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  href="/upload"
                  className="flex items-center space-x-3 px-4 py-3 text-stone-700 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  <FiUpload className="w-5 h-5" />
                  <span className="font-medium">Upload</span>
                </Link>
                <Link
                  href="/boards"
                  className="flex items-center space-x-3 px-4 py-3 text-stone-700 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  <FiGrid className="w-5 h-5" />
                  <span className="font-medium">My Boards</span>
                </Link>
                <Link
                  href={`/profile/${user?.id}`}
                  className="flex items-center space-x-3 px-4 py-3 text-stone-700 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  <FiUser className="w-5 h-5" />
                  <span className="font-medium">Profile</span>
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="flex items-center space-x-3 px-4 py-3 text-stone-700 hover:bg-stone-100 rounded-xl transition-colors"
                  >
                    <FiSettings className="w-5 h-5" />
                    <span className="font-medium">Admin</span>
                  </Link>
                )}
                <div className="border-t border-stone-200 my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="block text-center px-4 py-3 text-stone-700 hover:bg-stone-100 rounded-xl transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block text-center px-4 py-3 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
