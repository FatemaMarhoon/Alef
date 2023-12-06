import { Media } from '@/types/preschool';
import React, { useState, ChangeEvent } from 'react';

interface GalleryProps {
    existingImages: Media[];
    onDelete: (index: number) => void;
    onUpload: (files: FileList | null) => void;
}

const Gallery: React.FC<GalleryProps> = ({ existingImages, onDelete, onUpload }) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const handleDelete = (index: number) => {
        onDelete(index);
    };

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        onUpload(e.target.files);
    };

    return (
        <div className="p-7">
            {existingImages.map((media, index) => (
                <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    <img src={media.file} alt={`Gallery Image ${index + 1}`} className="w-full h-40 object-cover" />
                    {hoverIndex === index && (
                        <div className="absolute top-0 right-0 p-2 bg-red-500 text-white cursor-pointer">
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
            <div className="col-span-5 xl:col-span-3">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    multiple
                    className="mt-4"
                />
            </div>
        </div>
    );
};

export default Gallery;
