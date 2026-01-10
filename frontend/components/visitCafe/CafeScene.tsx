
import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  Html, 
  Environment, 
  ContactShadows, 
  Float, 
  RoundedBox,
  Cylinder
} from '@react-three/drei';
import * as THREE from 'three';
import { Coffee, Palette, Users, MapPin } from 'lucide-react';
// Fixed: NavigationState is now available in types.ts
import { NavigationState } from './types';

interface CafeSceneProps {
  onInteraction: (state: NavigationState) => void;
}

// Fixed: Defined the missing HangingPlant component
const HangingPlant = ({ index }: { index: number }) => {
  const position = useMemo(() => [
    (Math.random() - 0.5) * 16,
    -0.5 - Math.random() * 1.5,
    (Math.random() - 0.5) * 25
  ], []);

  return (
    <group position={position as [number, number, number]}>
      <mesh>
        <cylinderGeometry args={[0.01, 0.01, 2]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, -1, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#4a5d23" />
        </mesh>
      </Float>
    </group>
  );
};

const CafeScene: React.FC<CafeSceneProps> = ({ onInteraction }) => {
  const { camera } = useThree();
  const [targetPos, setTargetPos] = useState(new THREE.Vector3(0, 1.7, 5));
  const [targetRot, setTargetRot] = useState(0);

  // Smooth camera following
  useFrame((state, delta) => {
    state.camera.position.lerp(targetPos, delta * 3.5);
    const targetQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, targetRot, 0));
    state.camera.quaternion.slerp(targetQuaternion, delta * 3.5);
  });

  // movement methods exposed via window for the UI controls
  const moveForward = () => {
    const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const newPos = camera.position.clone().add(direction.multiplyScalar(2));
    // Boundaries
    newPos.z = Math.max(-12, Math.min(8, newPos.z));
    newPos.x = Math.max(-6, Math.min(6, newPos.x));
    setTargetPos(newPos);
  };

  const turnLeft = () => setTargetRot(prev => prev + Math.PI / 4);
  const turnRight = () => setTargetRot(prev => prev - Math.PI / 4);

  // Expose to window
  (window as any).moveForward = moveForward;
  (window as any).turnLeft = turnLeft;
  (window as any).turnRight = turnRight;

  return (
    <>
      <color attach="background" args={['#fdfbf7']} />
      
      {/* Cinematic Lighting matching the warm photos */}
      <ambientLight intensity={0.5} color="#fff1da" />
      <pointLight position={[0, 4, 0]} intensity={1.5} color="#ff9c42" castShadow />
      <pointLight position={[5, 3, -5]} intensity={1.2} color="#fff" />
      <pointLight position={[-5, 3, -5]} intensity={1.2} color="#fff" />
      <spotLight position={[0, 10, -5]} angle={0.4} penumbra={1} intensity={2} color="#ffdfb0" castShadow />

      {/* Global Environment */}
      {/* Fixed: Changed invalid preset "neutral" to "city" */}
      <Environment preset="city" />
      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.3} far={10} color="#3a261a" />

      {/* Café Core Geometry */}
      <group>
        {/* Floor - Light beige stone/tile */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 30]} />
          <meshStandardMaterial color="#efeadf" roughness={0.9} />
        </mesh>

        {/* Walls - Warm off-white */}
        <mesh position={[0, 2.5, -15]} receiveShadow>
          <planeGeometry args={[20, 5]} />
          <meshStandardMaterial color="#f7f3ee" />
        </mesh>
        <mesh position={[-10, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[30, 5]} />
          <meshStandardMaterial color="#f7f3ee" />
        </mesh>
        <mesh position={[10, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[30, 5]} />
          <meshStandardMaterial color="#f7f3ee" />
        </mesh>

        {/* Ceiling with Decorative Wooden Trellis & Hanging Plants */}
        <group position={[0, 5, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 30]} />
            <meshStandardMaterial color="#2a1b12" />
          </mesh>
          
          {/* Hanging Plants implementation */}
          {/* Fixed: HangingPlant component is now available */}
          {Array.from({ length: 45 }).map((_, i) => (
            <HangingPlant key={i} index={i} />
          ))}

          {/* Wooden Beams */}
          {Array.from({ length: 15 }).map((_, i) => (
            <mesh key={i} position={[0, -0.1, -12 + i * 2]}>
              <boxGeometry args={[20, 0.1, 0.2]} />
              <meshStandardMaterial color="#1a110a" />
            </mesh>
          ))}
        </group>

        {/* Interaction Points - Completed from truncated version */}
        <group position={[0, 1.5, -8]}>
          <Html center distanceFactor={10}>
             <button 
                onClick={() => onInteraction('menu')}
                className="flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all"
              >
                <Coffee size={20} className="text-[#3a261a]" />
                <span className="font-bold text-xs uppercase tracking-widest text-[#3a261a]">View Menu</span>
             </button>
          </Html>
        </group>

        <group position={[8, 1.5, -2]}>
          <Html center distanceFactor={10}>
             <button 
                onClick={() => onInteraction('art')}
                className="flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all"
              >
                <Palette size={20} className="text-[#3a261a]" />
                <span className="font-bold text-xs uppercase tracking-widest text-[#3a261a]">Art Gallery</span>
             </button>
          </Html>
        </group>
      </group>
    </>
  );
};

export default CafeScene;
