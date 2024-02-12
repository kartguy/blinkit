import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = ({update}) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:2000/img/view', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [update]);

  return (
    <div>
      <h2 className='text-3xl font-semibold'>Your Images:</h2>
      <div className='flex'>
        {images.map((image) => (
          <div key={image._id} className='m-2'>
            <img src={`http://localhost:2000/images/${image.filename}`} alt={image.filename}
            className=" h-96 w-96"
             />
            <p>{image.filename}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
