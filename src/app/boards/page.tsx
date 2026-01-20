'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiPlus, FiLock, FiUnlock, FiGrid } from 'react-icons/fi';
import { useAuthStore } from '@/lib/store';
import { Board } from '@/types';
import api from '@/lib/api';

export default function BoardsPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPublic: true,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    loadBoards();
  }, [isAuthenticated]);

  const loadBoards = async () => {
    try {
      const response = await api.get('/boards');
      setBoards(response.data.boards);
    } catch (error) {
      console.error('Error loading boards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/boards', formData);
      setShowCreateModal(false);
      setFormData({ name: '', description: '', isPublic: true });
      loadBoards();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error creating board');
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">My Boards</h1>
          <p className="text-stone-600">Organize your favorite architectural designs</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-stone-900 text-white px-6 py-3 rounded-full font-medium hover:bg-stone-800 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          <span>Create Board</span>
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Boards Grid */}
      {!loading && (
        <>
          {boards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {boards.map((board) => (
                <Link
                  key={board._id}
                  href={`/board/${board._id}`}
                  className="card overflow-hidden group cursor-pointer"
                >
                  {/* Board Preview Images */}
                  <div className="grid grid-cols-2 gap-1 aspect-square bg-stone-100">
                    {board.images && board.images.length > 0 ? (
                      <>
                        {board.images.slice(0, 4).map((image, idx) => (
                          <div key={idx} className="relative overflow-hidden">
                            <img
                              src={image.imageUrl}
                              alt={image.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                        {board.images.length < 4 &&
                          Array(4 - board.images.length)
                            .fill(0)
                            .map((_, idx) => (
                              <div
                                key={`empty-${idx}`}
                                className="bg-stone-50 flex items-center justify-center"
                              >
                                <FiGrid className="w-8 h-8 text-stone-300" />
                              </div>
                            ))}
                      </>
                    ) : (
                      <div className="col-span-2 flex flex-col items-center justify-center">
                        <FiGrid className="w-12 h-12 text-stone-300 mb-2" />
                        <p className="text-sm text-stone-500">Empty board</p>
                      </div>
                    )}
                  </div>

                  {/* Board Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-stone-900 line-clamp-1">{board.name}</h3>
                      {board.isPublic ? (
                        <FiUnlock className="w-4 h-4 text-stone-400 flex-shrink-0" />
                      ) : (
                        <FiLock className="w-4 h-4 text-stone-600 flex-shrink-0" />
                      )}
                    </div>
                    {board.description && (
                      <p className="text-sm text-stone-600 line-clamp-2 mb-2">
                        {board.description}
                      </p>
                    )}
                    <p className="text-xs text-stone-500">
                      {board.images?.length || 0} image{board.images?.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiGrid className="w-12 h-12 text-stone-400" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">No boards yet</h3>
              <p className="text-stone-600 mb-6">
                Create your first board to start organizing designs
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <FiPlus className="w-5 h-5" />
                <span>Create Your First Board</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* Create Board Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-display font-bold mb-6">Create New Board</h2>
            <form onSubmit={handleCreateBoard} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Board Name *
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="e.g., Modern Architecture"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Description
                </label>
                <textarea
                  maxLength={500}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input min-h-[100px]"
                  placeholder="What's this board about?"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  className="w-5 h-5 rounded border-stone-300"
                />
                <label htmlFor="isPublic" className="text-sm text-stone-700">
                  Make this board public
                </label>
              </div>

              <div className="flex space-x-4">
                <button type="submit" className="btn-primary flex-1">
                  Create Board
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
