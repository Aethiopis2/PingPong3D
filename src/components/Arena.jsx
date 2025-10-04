import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react'
import TennisTable from '../models/TennisTable';
import Racket from '../models/Racket';
import { Environment, OrbitControls } from '@react-three/drei';
import Floor from './Floor';
import CameraDebugger from './CameraDebugger';
import PlayerRacket from './PlayerRacket';

const BALL_SPEED = 3;
const GRAVITY = 9.8;
const BOUNCE_DAMPING = 0.7;

// fixed dimensions
const tableHeight = 2.6;    // wrt to ball
const tableLength = 5;      // front dim
const tableWidth = 9.1;

const Arena = ({playerColor, onExit}) => {
  const ballRef = useRef(null);
  const [ballVel, setBallVel] = useState([BALL_SPEED, 3, 0]);
  const [playerScore, setPlayerScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [playerPos, setPlayerPos] = useState([-1.3, 3, tableWidth / 2 + 1.5]);
  const oppRef = useRef(null);

  useState((state, delta) => {
    const ball = ballRef.current;
    if (!ball) return;

    let [vx, vy, vz] = ballVel;
    let pos = ball.position;

    // physics
    vy += GRAVITY * delta;
    pos.x += vx * delta;
    pos.y += vy * delta;
    pos.z += vz * delta;

    // bounce on table
    if (pos.y <= 1.4) {
      pos.y  = 1.5;
      vy = -vy * BOUNCE_DAMPING;
    } // end if


    // Racket collusion
    const playerZ = 2.5;
    const oppZ = -2.5;


    // player Racket hit
    if (pos.z > playerZ - 0.3 && pos.z  < playerZ + 0.3 && pos.y < 0.5 &&
        Math.abs(pos.x - playerPos[0]) < 0) {
          vy = Math.abs(vy) + 3;
          vz = -Math.abs(vz) - 2;
    } // end if

    // opponent Racket
    if (oppRef.current) {
      oppRef.current.position.x += (pos.x - oppRef.current.position.x) * 0.05;

      // opponent Racket hit
      if (pos.z < oppZ + 0.3 && pos.z > oppZ - 0.3 && pos.y  < 0.5 && 
          Math.abs(pos.x - oppRef.current.position.x) < 0.6) {
            vy = Math.abs(vy) + 3;
            vz = Math.abs(vz) + 2;
      } // end if opp Racket hit
    } // end if

    // socre
    if (pos.z > 4) {
      setOppScore(s => s + 1);
      resetBall(ball, setBallVel)
    } // end if
    else if (pos.z < -4) {
      setPlayerScore((s) => s + 1);
      resetBall(ball, setBallVel);
    } // end else

    // Apply updated velocity
    setBallVel([vx, vy, vz]);
  });

  function resetBall(ball, setBallVel) {
    ball.position.set(0, 2, 0);
    setBallVel([BALL_SPEED * (Math.random() > 0.5 ? 1 : -1), 3, 0]);
  } // end restBall

  return (
    <div className="w-full h-full bg-gray-900 relative">
      <Canvas shadows camera={{position: [0, 5.71, 11.92], fov: 40}}>
        <ambientLight intensity={2.8} />
        <directionalLight 
          position={[5, 10, 5]}
          intensity={3.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024} 
        />

        <Suspense fallback={null}>
          <TennisTable scale={1.65} position={[0, 0, 0]} />
          <Floor args={[80,40]} position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} />

          {/* front wall */}
          <Floor args={[80,20]} position={[0, -0.01, -20]} rotation={[0, 0, 0]} />

          {/* Player Racket */}
          {/* <Racket
            scale = {[0.05, 0.05, 0.05]} 
            position={playerPos} 
            rotation={[0, 0, Math.PI / 4]} /> */}
          <PlayerRacket color={playerColor} tableWidth={tableWidth} />

          {/* Opponent Racket */}
          <Racket
            scale = {[0.05, 0.05, 0.05]} 
            position={[1.3, 3, -(tableWidth / 2 + 1.5)]}
            rotation={[0, Math.PI, -Math.PI / 4]}
            color={playerColor === "red" ? "blue" : "red"} />

          {/* <Environment preset='warehouse' /> */}
        </Suspense>

        {/* Ball */}
        <mesh ref={ballRef} position={[0, 2.6, 0]} castShadow>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>

        <CameraDebugger />
        {/* <OrbitControls target={[0,0,0]} /> */}
      </Canvas>

      <button onClick={onExit}
        className='absolute top-4 left-4 bg-white text-black px-4 py-2 rounded-xl shadow-lg'>
          Exit
      </button>

      <div className="absolute top-4 right-4 text-white text-xl">
        <span className="mr-4">{playerScore}</span> :{" "}
        <span className="ml-4">{oppScore}</span>
      </div>
    </div>
  )
}

export default Arena