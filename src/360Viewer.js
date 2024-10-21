import React, { useEffect, useRef } from 'react';
import * as PANOLENS from 'panolens';

const Viewer360 = ({ imageUrl, onImageChange, hotspots = [] }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    viewerRef.current.innerHTML = '';

    const panorama = new PANOLENS.ImagePanorama(imageUrl);
    const viewer = new PANOLENS.Viewer({
      container: viewerRef.current,
      autoRotate: true,
      autoRotateSpeed: 0.5,
      controlBar: false,
      output: 'none',
    });

    if (hotspots && hotspots.length > 0) {
      hotspots.forEach((hotspot) => {
        const infospot = new PANOLENS.Infospot(50, PANOLENS.DataImage.Info);
        infospot.position.set(hotspot.x, hotspot.y, hotspot.z);
        infospot.addHoverText(hotspot.tooltip);

        infospot.material.opacity = 0.7; 
        infospot.material.color.set(0xffcc00); 

        infospot.addEventListener('mouseover', () => {
          infospot.material.emissive.set(0xffcc00); 
          infospot.material.emissiveIntensity = 1.5; 
        });
        infospot.addEventListener('mouseout', () => {
          infospot.material.emissive.set(0x000000); 
          infospot.material.emissiveIntensity = 0; 
        });

        infospot.addEventListener('click', () => {
          onImageChange(hotspot.targetImage);
        });
        panorama.add(infospot);
      });
    }

    viewer.add(panorama);

    return () => {
      viewer.dispose();
    };
  }, [imageUrl, hotspots, onImageChange]);

  return (
    <div
      ref={viewerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        backgroundColor: '#000',
      }}
    />
  );
};

export default Viewer360;
