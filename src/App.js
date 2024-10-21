import React, { useState } from 'react';
import Viewer360 from './360Viewer';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const App = () => {
  const [currentImage, setCurrentImage] = useState('/3608.jpg');

  const images = [
    '360.jpg',
    '3603.jpg',
    '3604.jpg',
    '3605.jpg',
    '3606.jpg',
    '3607.jpg',
    '3608.jpg',
    '3609.jpg',
    '36010.jpg'
  ];

  const hotspots = [
    {
      x: 500, y: 0, z: -500,
      targetImage: '3609.jpg',
      tooltip: 'View Image 2'
    },
    {
      x: -500, y: 0, z: 500,
      targetImage: '3604.jpg',
      tooltip: 'View Image 3'
    },
    {
      x: -500, y: 500, z: 500,
      targetImage: '3605.jpg',
      tooltip: 'View Image 4'
    },
  ];

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Viewer360 imageUrl={currentImage} onImageChange={setCurrentImage} hotspots={hotspots} />

      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '5px',
          borderRadius: '20px',
          width: '90%',
          maxWidth: '700px',
          zIndex: 1,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Carousel
          showThumbs={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay={false}
          swipeable
          dynamicHeight={false}
          showStatus={false}
          centerMode={true}
          centerSlidePercentage={20}
        >
          {images.map((img, index) => (
            <div key={index} onClick={() => setCurrentImage(img)} style={{ margin: '0 10px' }}> {/* Add margin here */}
              <img
                src={img}
                style={{
                  height: '70px',
                  cursor: 'pointer',
                  border: currentImage === img ? '3px solid #fff' : 'none',
                  borderRadius: '10px',
                }}
                alt={`Thumbnail ${index + 1}`}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default App;
