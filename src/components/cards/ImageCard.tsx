'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiMessageCircle, FiEye, FiBookmark } from 'react-icons/fi';
import { Image as ImageType } from '@/types';
import { useAuthStore } from '@/lib/store';
import api from '@/lib/api';

interface ImageCardProps {
  image: ImageType;
}

export default function ImageCard({ image }: ImageCardProps) {
  const { isAuthenticated, user } = useAuthStore();
  const [isLiked, setIsLiked] = useState(
    Array.isArray(image.likes) && image.likes.includes(user?.id || '')
  );
  const [likesCount, setLikesCount] = useState(image.likes.length);
  const [showSaveMenu, setShowSaveMenu] = useState(false);

  // Build full image URL for local storage
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const BASE_URL = API_URL.replace('/api', '');
  const imageUrl = image.imageUrl.startsWith('http') 
    ? image.imageUrl 
    : `${BASE_URL}${image.imageUrl}`;

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    try {
      const response = await api.post(`/images/${image._id}/like`);
      setIsLiked(response.data.isLiked);
      setLikesCount(response.data.likesCount);
    } catch (error) {
      console.error('Error liking image:', error);
    }
  };

  return (
    <Link href={`/image/${image._id}`} className="group block">
      <div className="card overflow-hidden cursor-pointer">
        {/* Image */}
        <div className="relative aspect-[3/4] bg-stone-100">
          <Image
            src={imageUrl}
            alt={image.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLike}
                    className="flex items-center space-x-1 hover:scale-110 transition-transform"
                  >
                    <FiHeart
                      className={`w-5 h-5 ${isLiked ? 'fill-red-500 stroke-red-500' : ''}`}
                    />
                    <span className="text-sm font-medium">{likesCount}</span>
                  </button>
                  <div className="flex items-center space-x-1">
                    <FiEye className="w-5 h-5" />
                    <span className="text-sm font-medium">{image.views}</span>
                  </div>
                </div>

                {isAuthenticated && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowSaveMenu(!showSaveMenu);
                    }}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    <FiBookmark className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <h3 className="font-semibold text-stone-900 line-clamp-2 mb-2">{image.title}</h3>

          {image.description && (
            <p className="text-sm text-stone-600 line-clamp-2 mb-3">{image.description}</p>
          )}

          {/* Tags */}
          {image.tags && image.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {image.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-stone-100 text-stone-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* User Info */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center overflow-hidden">
              {image.user.avatar ? (
                <Image src={image.user.avatar} alt={image.user.username} width={32} height={32} />
              ) : (
                <span className="text-sm font-medium text-stone-600">
                  {image.user.username.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-stone-700">{image.user.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
