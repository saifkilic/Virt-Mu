import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';

interface ModelProps {
  url: string;
}

const ArtifactModel: React.FC<ModelProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

interface VirtualGalleryProps {
  modelUrl: string;
  skyboxColor?: string;
  intensity?: number;
}

export const VirtualGallery: React.FC<VirtualGalleryProps> = ({
  modelUrl,
  skyboxColor = '#141414',
  intensity = 0.5
}) => {
  return (
    <div className="w-full h-[60vh] bg-neutral-950 rounded-xl overflow-hidden relative border border-neutral-800">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={[skyboxColor]} />
        <ambientLight intensity={intensity} />
        <Suspense fallback={null}>
          <Stage environment="studio" intensity={0.5} adjustCamera={true}>
            <ArtifactModel url={modelUrl} />
          </Stage>
        </Suspense>
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          minDistance={1.5} 
          maxDistance={8} 
        />
      </Canvas>
    </div>
  );
};