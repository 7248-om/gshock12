
import React, { useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  Html, 
  Environment, 
  Float, 
  ContactShadows, 
  RoundedBox,
  Text
} from '@react-three/drei';
import * as THREE from 'three';
import { Coffee, Palette, Users } from 'lucide-react';

interface SceneProps {
  onNavigate: (page: 'home' | 'menu' | 'art' | 'workshops') => void;
}

const Scene: React.FC<SceneProps> = ({ onNavigate }) => {
  const { camera } = useThree();
  const [targetPos, setTargetPos] = useState(new THREE.Vector3(0, 1.7, 5));
  const [targetRot, setTargetRot] = useState(0);

  // Smooth camera following
  useFrame((state, delta) => {
    state.camera.position.lerp(targetPos, delta * 4);
    const targetQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, targetRot, 0));
    state.camera.quaternion.slerp(targetQuaternion, delta * 4);
  });

  const moveForward = () => {
    const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const newPos = camera.position.clone().add(direction.multiplyScalar(2));
    newPos.z = Math.max(-12, Math.min(8, newPos.z));
    newPos.x = Math.max(-7, Math.min(7, newPos.x));
    setTargetPos(newPos);
  };

  const moveBackward = () => {
    const direction = new THREE.Vector3(0, 0, 1).applyQuaternion(camera.quaternion);
    const newPos = camera.position.clone().add(direction.multiplyScalar(2));
    newPos.z = Math.max(-12, Math.min(8, newPos.z));
    newPos.x = Math.max(-7, Math.min(7, newPos.x));
    setTargetPos(newPos);
  };

  const turn = (dir: number) => setTargetRot(prev => prev + dir);

  // Bind globals for NavigationUI
  (window as any).moveForward = moveForward;
  (window as any).moveBackward = moveBackward;
  (window as any).turnLeft = () => turn(Math.PI / 4);
  (window as any).turnRight = () => turn(-Math.PI / 4);

  return (
    <>
      <color attach="background" args={['#fdfbf7']} />
      <Environment preset="apartment" />
      
      {/* Cinematic Lighting - Warm and Intimate */}
      <ambientLight intensity={0.4} color="#fff1da" />
      
      {/* Main warm focal light */}
      <pointLight position={[0, 4, 2]} intensity={2.5} color="#ff9c42" castShadow />
      
      {/* Light spills for "Stone" wall texture definition */}
      <pointLight position={[9, 1.5, -3]} intensity={1.5} color="#ffb061" />
      <pointLight position={[-9, 1.5, -3]} intensity={1.5} color="#ffb061" />
      
      {/* Soft ceiling highlight */}
      <spotLight position={[0, 10, -5]} angle={0.4} penumbra={1} intensity={4} color="#ffdfb0" castShadow />
      
      {/* Warm floor glow */}
      <pointLight position={[0, 0.5, -8]} intensity={1.2} color="#ff9c42" />

      <group>
        {/* Floor - Light beige matte stone */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[25, 35]} />
          <meshStandardMaterial color="#efeadf" roughness={0.8} metalness={0.05} />
        </mesh>

        {/* Walls - Realistic Warm Stucco / Stone finish */}
        <mesh position={[0, 2.5, -15]} receiveShadow>
          <planeGeometry args={[25, 5]} />
          <meshStandardMaterial color="#f5f2eb" roughness={1} metalness={0} />
        </mesh>
        <mesh position={[-12.5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[35, 5]} />
          <meshStandardMaterial color="#f5f2eb" roughness={1} metalness={0} />
        </mesh>
        <mesh position={[12.5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[35, 5]} />
          <meshStandardMaterial color="#f5f2eb" roughness={1} metalness={0} />
        </mesh>

        {/* Ceiling + Trellis + Vine Plants */}
        <group position={[0, 4.9, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[25, 35]} />
            <meshStandardMaterial color="#2a1b12" roughness={1} />
          </mesh>
          {/* Detailed Dark Wood Beams */}
          {Array.from({ length: 25 }).map((_, i) => (
            <mesh key={i} position={[0, -0.05, -16 + i * 1.4]}>
              <boxGeometry args={[25, 0.1, 0.15]} />
              <meshStandardMaterial color="#2d1d13" roughness={0.9} />
            </mesh>
          ))}
          {/* High-Quality Organic Hanging Vines */}
          {Array.from({ length: 70 }).map((_, i) => (
            <OrganicHangingVine 
              key={i} 
              position={[
                (Math.random() - 0.5) * 22, 
                -0.1, 
                (Math.random() - 0.5) * 32
              ]} 
            />
          ))}
        </group>

        {/* COUNTER (MENU) with Rich Wood Finish */}
        <group position={[0, 0, -12]}>
          <RealisticCounter />
          <InteractionPoint 
            position={[0, 2.4, 0]} 
            label="Menu - Rabusta Café" 
            icon={<Coffee size={24} />} 
            onClick={() => onNavigate('menu')} 
          />
        </group>

        {/* ART WALL (RIGHT) with Gallery Text */}
        <group position={[12.4, 1.2, -3]}>
          <DetailedArtWall />
          <InteractionPoint 
            position={[-0.8, 1.6, 0]} 
            label="Art Gallery" 
            icon={<Palette size={24} />} 
            onClick={() => onNavigate('art')} 
          />
        </group>

        {/* WORKSHOP AREA (LEFT) with Matte Seating */}
        <group position={[-7.5, 0, -3]}>
          <SeatingArea />
          <InteractionPoint 
            position={[0.5, 1.6, 0]} 
            label="Workshops" 
            icon={<Users size={24} />} 
            onClick={() => onNavigate('workshops')} 
          />
        </group>

        {/* Foreground Depth Plants */}
        <group position={[5, 0, 4]}>
          <OrganicHangingVine position={[0, 0, 0]} scale={3} rotation={[0, 0, Math.PI]} />
        </group>
        <group position={[-5, 0, 7]}>
          <OrganicHangingVine position={[0, 0, 0]} scale={3.5} rotation={[0, 0, Math.PI]} />
        </group>
      </group>

      <ContactShadows resolution={1024} scale={30} blur={2.5} opacity={0.4} far={10} color="#3a261a" />
    </>
  );
};

const OrganicHangingVine = ({ position, scale = 1, rotation = [0, 0, 0] }: { position: [number, number, number], scale?: number, rotation?: [number, number, number] }) => {
  const segments = useMemo(() => 4 + Math.floor(Math.random() * 6), []);
  const vineLength = segments * 0.4;
  
  return (
    <group position={position} rotation={rotation}>
      {/* Main vine stem */}
      <mesh>
        <cylinderGeometry args={[0.012, 0.008, vineLength]} />
        <meshStandardMaterial color="#2d1d13" roughness={0.9} />
      </mesh>
      
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[0, -vineLength / 2, 0]}>
          {/* Leaf clusters for organic depth */}
          {Array.from({ length: segments * 4 }).map((_, i) => (
            <group 
              key={i} 
              position={[
                (Math.random() - 0.5) * 0.2, 
                -i * 0.1, 
                (Math.random() - 0.5) * 0.2
              ]}
              rotation={[
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
              ]}
            >
              <mesh>
                <planeGeometry args={[0.15 * scale, 0.25 * scale]} />
                <meshStandardMaterial 
                  color={i % 2 === 0 ? "#4f632d" : "#3d4f23"} 
                  side={THREE.DoubleSide} 
                  roughness={0.8}
                />
              </mesh>
            </group>
          ))}
        </group>
      </Float>
    </group>
  );
};

const RealisticCounter = () => {
  return (
    <group>
      {/* Dark Walnut Wood Counter Base with grain simulation */}
      <RoundedBox args={[10, 1.1, 2]} radius={0.05} smoothness={4} position={[0, 0.55, 0]}>
        <meshStandardMaterial color="#2d1d13" roughness={0.9} metalness={0} />
      </RoundedBox>
      {/* Subtle wood-grain detailing overlays */}
      <mesh position={[0, 0.55, 1.01]}>
        <planeGeometry args={[9.8, 0.9]} />
        <meshStandardMaterial color="#1a110a" transparent opacity={0.1} />
      </mesh>
      
      {/* Light Stone Counter Top */}
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[10.2, 0.05, 2.2]} />
        <meshStandardMaterial color="#efeadf" roughness={0.2} />
      </mesh>
      
      {/* Glass Pastry Display Case */}
      <group position={[2, 1.2, 0]}>
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[3.5, 0.9, 1.2]} />
          <meshStandardMaterial color="#88ccff" transparent opacity={0.1} metalness={1} roughness={0} />
        </mesh>
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[3.4, 0.02, 1.1]} />
          <meshStandardMaterial color="#fff" emissive="#ffddaa" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* Coffee Machine (Matte Black & Chrome) */}
      <mesh position={[-2.5, 1.5, -0.2]}>
        <boxGeometry args={[1.2, 0.6, 0.9]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

const DetailedArtWall = () => {
  return (
    <group rotation={[0, -Math.PI / 2, 0]}>
      <Text
        position={[0, 2.3, 0.01]}
        fontSize={0.28}
        color="#3a261a"
        anchorX="center"
        maxWidth={8}
        textAlign="center"
      >
        Good Vibes Are Free,{"\n"}But the Art's for Sale!
      </Text>

      {/* Gallery Frames with Wood Finishes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <group key={i} position={[(i % 4 - 1.5) * 1.8, Math.floor(i / 4) * 1.3 - 0.5, 0]}>
          <mesh>
            <boxGeometry args={[1.2, 1, 0.05]} />
            <meshStandardMaterial color={i % 3 === 0 ? "#1a110a" : "#ffffff"} roughness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[1.05, 0.85]} />
            <meshStandardMaterial color="#eee" roughness={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const SeatingArea = () => {
  return (
    <group>
      {/* Matte White Table Top */}
      <mesh position={[0, 0.75, 0]} receiveShadow castShadow>
        <boxGeometry args={[5, 0.04, 2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.95} metalness={0} />
      </mesh>
      
      {/* Carbon Black Matte Stools */}
      {[[-2, -1], [0, -1], [2, -1], [-2, 1], [0, 1], [2, 1]].map((pos, i) => (
        <group key={i} position={[pos[0], 0, pos[1]]}>
          {/* Seat */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.45, 0.04, 0.45]} />
            <meshStandardMaterial color="#0a0a0a" roughness={1} metalness={0.2} />
          </mesh>
          {/* Minimalist Frame */}
          <mesh position={[-0.2, 0.25, 0]}>
            <boxGeometry args={[0.02, 0.5, 0.4]} />
            <meshStandardMaterial color="#0a0a0a" roughness={1} metalness={0.2} />
          </mesh>
          <mesh position={[0.2, 0.25, 0]}>
            <boxGeometry args={[0.02, 0.5, 0.4]} />
            <meshStandardMaterial color="#0a0a0a" roughness={1} metalness={0.2} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, 0.75, 0.22]}>
            <boxGeometry args={[0.45, 0.5, 0.02]} />
            <meshStandardMaterial color="#0a0a0a" roughness={1} metalness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const InteractionPoint = ({ position, label, icon, onClick }: { 
  position: [number, number, number], 
  label: string, 
  icon: React.ReactNode, 
  onClick: () => void 
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Html position={position} center distanceFactor={12}>
      <button 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        className={`flex items-center space-x-3 px-6 py-4 rounded-full border border-white/40 shadow-2xl transition-all duration-300 transform ${
          hovered ? 'bg-white scale-110 shadow-orange-200/50' : 'bg-white/80 backdrop-blur-md scale-100'
        }`}
      >
        <span className="text-[#3a261a] transition-colors">{icon}</span>
        <span className="whitespace-nowrap font-bold text-xs tracking-widest text-[#3a261a] uppercase">
          {label}
        </span>
      </button>
    </Html>
  );
};

export default Scene;

declare global {
  interface Window {
    moveForward: () => void;
    moveBackward: () => void;
    turnLeft: () => void;
    turnRight: () => void;
  }
}
