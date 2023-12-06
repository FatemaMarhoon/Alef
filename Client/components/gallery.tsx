import React, { useState, ChangeEvent } from 'react';
import { Media } from '@/types/preschool';

interface GalleryProps {
  existingImages: Media[];
  onDeleteExisting: (id: number) => void;
  onUpload: (files: FileList | null) => void;
}

const Gallery: React.FC<GalleryProps> = ({ existingImages, onDeleteExisting, onUpload }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [hoverIndexSelected, setHoverIndexSelected] = useState<number | null>(null);

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
      onUpload(files); // Pass the selected files to the parent component
      const newFiles = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };


    return (
        <div >
            <h2>Existing Images:</h2>
            {existingImages.map((media, index) => (
                <div
                    key={index}
                    className="relative group "
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    <img src={media.file} alt={`Gallery Image ${index + 1}`} className="w-full h-40 object-cover" />
                    {hoverIndex === index && (
                        <div className="absolute top-0 right-0 p-2 bg-red-500 text-white cursor-pointer">
                            <button onClick={() => handleDeleteExisting(media.id? media.id : index)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
            <h2 className="mt-4">Selected Files:</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group" onMouseEnter={() => setHoverIndexSelected(index)} onMouseLeave={() => setHoverIndexSelected(null)}>
                        <img src={URL.createObjectURL(file)} alt={`Selected File ${index + 1}`} className={`w-full h-40 object-cover ${hoverIndexSelected? "bg-danger bg-opacity-100":""}`} />
                        {hoverIndexSelected === index && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="absolute top-0 right-0 p-2 bg-red-500 text-white cursor-pointer rounded opacity-75">
                                    <button onClick={() => handleDeleteSelected(index)}>
                                        <svg
                                            className="fill-danger "
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                                fill=""
                                            />
                                            <path
                                                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                                fill=""
                                            />
                                            <path
                                                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                                fill=""
                                            />
                                            <path
                                                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                                fill=""
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="col-span-5 xl:col-span-3 mt-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    multiple
                />
            </div>
        </div>
    );
};

export default Gallery;
