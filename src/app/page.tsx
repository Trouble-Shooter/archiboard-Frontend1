'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Masonry from 'react-masonry-css';
import ImageCard from '@/components/ImageCard';
import api from '@/lib/api';
import { Image } from '@/types';

export default function HomePage() {
  const searchParams = useSearchParams();
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const searchQuery = searchParams.get('search');
  const tag = searchParams.get('tag');

  useEffect(() => {
    loadImages(1);
  }, [searchQuery, tag]);

  const loadImages = async (pageNum: number) => {
    try {
      setLoading(true);
      const params: any = { page: pageNum, limit: 20 };
      if (searchQuery) params.search = searchQuery;
      if (tag) params.tag = tag;

      const response = await api.get('/images', { params });
      const newImages = response.data.images;

      if (pageNum === 1) {
        setImages(newImages);
      } else {
        setImages((prev) => [...prev, ...newImages]);
      }

      setHasMore(response.data.pagination.page < response.data.pagination.pages);
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const breakpointColumns = {
    default: 4,
    1536: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1,
  };

  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      {!searchQuery && !tag && (
        <div className="page-header text-center">
          <h1 className="page-title">
            Discover{' '}
            <span className="gradient-text">Architectural</span>
            <br />
            Excellence
          </h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Explore stunning 3D renders and architectural designs from creators around the world
          </p>
        </div>
      )}

      {/* Search/Filter Results Header */}
      {(searchQuery || tag) && (
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold mb-2">
            {searchQuery && `Search results for "${searchQuery}"`}
            {tag && `Images tagged with "${tag}"`}
          </h2>
          <p className="text-stone-600">{images.length} images found</p>
        </div>
      )}

      {/* Loading State */}
      {loading && page === 1 && (
        <div className="flex justify-center items-center py-20">
          <div className="spinner"></div>
        </div>
      )}

      {/* Masonry Grid */}
      {!loading && images.length > 0 && (
        <>
          <Masonry
            breakpointCols={breakpointColumns}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {images.map((image) => (
              <ImageCard key={image._id} image={image} />
            ))}
          </Masonry>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => loadImages(page + 1)}
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && images.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📐</span>
          </div>
          <h3 className="text-2xl font-display font-bold mb-2">No images found</h3>
          <p className="text-stone-600">
            {searchQuery || tag
              ? 'Try adjusting your search terms'
              : 'Be the first to upload an architectural design!'}
          </p>
        </div>
      )}
    </div>
  );
}
