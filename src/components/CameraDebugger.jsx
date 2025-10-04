import { useThree, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useState } from 'react'

const CameraDebugger = () => {
  const { camera } = useThree()
  const [pos, setPos] = useState([0, 0, 0])
  const [rot, setRot] = useState([0, 0, 0])

  useFrame(() => {
    camera.rotation.x = -0.31;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
    setPos([camera.position.x, camera.position.y, camera.position.z])
    setRot([camera.rotation.x, camera.rotation.y, camera.rotation.z])
  })

  return (
    <Html fullscreen>
      <div style={{
        position: 'absolute',
        bottom: 400,
        left: 10,
        background: 'rgba(0,0,0,0.6)',
        color: 'white',
        padding: '6px 10px',
        borderRadius: '8px',
        fontSize: '0.8rem',
        fontFamily: 'monospace',
        pointerEvents: 'none'
      }}>
        <div>Pos: {pos.map(v => v.toFixed(2)).join(', ')}</div>
        <div>Rot: {rot.map(v => v.toFixed(2)).join(', ')}</div>
      </div>
    </Html>
  )
}

export default CameraDebugger