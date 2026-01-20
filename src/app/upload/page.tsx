'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUpload, FiX } from 'react-icons/fi';
import { useAuthStore } from '@/lib/store';
import api from '@/lib/api';

export default function UploadPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('image', file);
      data.append('title', formData.title);
      if (formData.description) data.append('description', formData.description);
      if (formData.tags) {
        const tagsArray = formData.tags.split(',').map((tag) => tag.trim());
        data.append('tags', JSON.stringify(tagsArray));
      }

      const response = await api.post('/images', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Success - redirect to home
      router.push('/');
    } catch (err: any) {
      console.error('Upload error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Error uploading image';
      setError(`Upload failed: ${errorMessage}. Check backend console for details.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold mb-2">Upload Your Design</h1>
        <p className="text-stone-600">Share your architectural masterpiece with the community</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-stone-700 mb-2">Image *</label>
          {!preview ? (
            <label className="block w-full h-64 border-2 border-dashed border-stone-300 rounded-lg cursor-pointer hover:border-stone-400 transition-colors">
              <div className="flex flex-col items-center justify-center h-full">
                <FiUpload className="w-12 h-12 text-stone-400 mb-4" />
                <p className="text-stone-600 font-medium">Click to upload image</p>
                <p className="text-sm text-stone-500 mt-1">PNG, JPG, GIF, WEBP up to 10MB</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />
            </label>
          ) : (
            <div className="relative">
              <img src={preview} alt="Preview" className="w-full h-96 object-contain rounded-lg" />
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-stone-700 mb-2">Title *</label>
          <input
            type="text"
            required
            maxLength={200}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input"
            placeholder="e.g., Modern Villa Exterior"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-stone-700 mb-2">Description</label>
          <textarea
            maxLength={1000}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="input min-h-[120px]"
            placeholder="Describe your architectural design..."
          />
        </div>

        {/* Tags */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="input"
            placeholder="e.g., modern, residential, 3d render"
          />
          <p className="text-sm text-stone-500 mt-1">Maximum 10 tags</p>
        </div>

        {/* Submit Button */}
        <div className="flex space-x-4">
          <button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
