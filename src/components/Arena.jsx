import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react'
import TennisTable from '../models/TennisTable';
import Paddle from '../models/Paddle';
import { OrbitControls } from '@react-three/drei';

const Arena = ({playerColor, onExit}) => {
  const ballRef = useRef(null);

  return (
    <div className="w-full h-full bg-gray-900 relative">
      <button onClick={onExit}
        className='absolute top-4 left-4 bg-white text-black px-4 py-2 rounded-xl shadow-lg'>
          Exit
        </button>

        <Canvas shadows camera={{position: [0, 5, 10], fov: 50}}>
          <ambientLight intensity={0.3} />
          <directionalLight 
            position={[5, 10, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024} 
          />

          <Suspense fallback={null}>
            <TennisTable scale={1.0} />

             {/* Player Paddle */}
            <group position={[-2.5, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
              <Paddle color={playerColor === "red" ? "red" : "blue"} />
              
            </group>

            {/* Opponent Paddle */}
            <group position={[2.5, 0.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <Paddle color={playerColor === "red" ? "blue" : "red"} />
            </group>
          </Suspense>

          {/* Ball */}
          <mesh ref={ballRef} position={[0, 0.5, 0]} castShadow>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial color="white" />
          </mesh>

          <OrbitControls enablePan={false} enableZoom enableRotate />
        </Canvas>
    </div>
  )
}

export default Arena