// src/components/VirtualGallery.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Html } from '@react-three/drei';

interface VirtualGalleryProps {
  modelUrl?: string;
  skyboxColor?: string;
  intensity?: number;
}

export const VirtualGallery: React.FC<VirtualGalleryProps> = ({
  modelUrl,
  skyboxColor = '#1a1a1a',
  intensity = 0.6
}) => {
  // No model available → Show nice placeholder
  if (!modelUrl) {
    return (
      <div className="w-full h-[60vh] bg-neutral-950 rounded-xl flex items-center justify-center border border-neutral-800">
        <div className="text-center text-cream/70">
          <div className="text-6xl mb-6 opacity-40">🏛️</div>
          <p className="text-xl font-medium">3D Model Coming Soon</p>
          <p className="text-sm mt-2">This artifact doesn't have a 3D model yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[60vh] bg-neutral-950 rounded-xl overflow-hidden relative border border-neutral-800">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={[skyboxColor]} />
        <ambientLight intensity={intensity} />

        <Suspense fallback={
          <Html center>
            <div className="text-white text-center">
              Loading 3D Model...
            </div>
          </Html>
        }>
          <Stage environment="studio" intensity={0.5} adjustCamera>
            {/* We will safely handle missing model inside ArtifactModel later if needed */}
            <primitive object={null} /> 
          </Stage>
        </Suspense>

        <OrbitControls enablePan enableZoom minDistance={1.5} maxDistance={12} />
      </Canvas>
    </div>
  );
};