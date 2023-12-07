import React, { useState, ChangeEvent, useEffect } from 'react';
import { Media } from '@/types/preschool';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface GalleryProps {
    existingImages: Media[];
    onDeleteExisting: (id: number) => void;
    onUpload: (files: FileList | null) => void;
    selectedMedia:File[] ;
}

const Gallery: React.FC<GalleryProps> = ({ existingImages,selectedMedia, onDeleteExisting, onUpload }) => {
    const [hoverIndexExisting, setHoverIndexExisting] = useState<number | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>(selectedMedia);
    const [hoverIndexSelected, setHoverIndexSelected] = useState<number | null>(null);

    useEffect(() => {
        setSelectedFiles(selectedMedia);
    }, [selectedMedia])
    const handleDeleteExisting = (id: number) => {
        onDeleteExisting(id);
    };

    const handleDeleteSelected = (index: number) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            onUpload(files);
            const newFiles = Array.from(files);
            setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

    return (
        <div>
            <ImageList sx={{ width: '100%', height: '100%' }} cols={3}>
                {existingImages.map((media, index) => (
                    <ImageListItem
                        key={index}
                        onMouseEnter={() => setHoverIndexExisting(index)}
                        onMouseLeave={() => setHoverIndexExisting(null)}
                    >
                        <img src={media.file} alt={`Gallery Image ${index + 1}`}
                            className={`w-full h-40 object-cover hover:bg-gray bg-opacity-30`}
                        // className={`w-full h-40 object-cover ${hoverIndexSelected ? 'bg-gray bg-opacity-30' : ''}`}
                        />
                        {hoverIndexExisting === index && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray bg-opacity-70">
                                <IconButton onClick={() => handleDeleteExisting(media.id ? media.id : index)}>
                                    <DeleteIcon color='error' />
                                </IconButton>
                            </div>
                        )}
                    </ImageListItem>
                ))}

                {selectedFiles.map((file, index) => (
                    <ImageListItem
                        key={index + existingImages.length}
                        onMouseEnter={() => setHoverIndexSelected(index)}
                        onMouseLeave={() => setHoverIndexSelected(null)}
                    >
                        <img
                            src={URL.createObjectURL(file)}
                            alt={`Selected File ${index + 1}`}
                            className={`w-full h-40 object-cover hover:bg-gray hover:bg-opacity-30'`}
                        // className={`w-full h-40 object-cover ${hoverIndexSelected ? 'bg-gray bg-opacity-30' : ''}`}
                        />
                        {hoverIndexSelected === index && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray bg-opacity-30">
                                <IconButton onClick={() => handleDeleteSelected(index)}>
                                    <DeleteIcon color='error' />
                                </IconButton>
                            </div>
                        )}
                    </ImageListItem>
                ))}
            </ImageList>

            <div className="col-span-5 xl:col-span-3 mt-4">
                <input type="file" accept="image/*" onChange={handleUpload} multiple />
            </div>
        </div>
    );
};

export default Gallery;
