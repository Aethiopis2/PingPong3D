import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import Racket from '../models/Racket'

const PlayerRacket = ({ color, tableWidth }) => {
  const racketRef = useRef()
  const { camera, gl, mouse } = useThree()
  const raycaster = new THREE.Raycaster()
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -tableWidth / 2 - 1.5) // z = Z
  const target = new THREE.Vector3()
  const speed = 0.15

  // Touch support: update mouse manually
  useEffect(() => {
    const handleTouchMove = (e) => {
      if (!e.touches.length) return
      const touch = e.touches[0]
      const rect = gl.domElement.getBoundingClientRect()
      mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1
    }

    gl.domElement.addEventListener('touchmove', handleTouchMove)
    return () => gl.domElement.removeEventListener('touchmove', handleTouchMove)
  }, [gl, mouse])

  useFrame(() => {
    raycaster.setFromCamera(mouse, camera)
    raycaster.ray.intersectPlane(plane, target)

    if (racketRef.current) {
      racketRef.current.position.lerp(target, speed);
      racketRef.current.rotation.z = racketRef.current.position.x >= 0 ?
        Math.PI / 4 : -Math.PI / 4;
    }
  })

  return (
    <Racket
        ref={racketRef}
        scale = {[0.04, 0.04, 0.04]} 
        position={[0, 0, tableWidth / 2 + 1.5]}
        rotation={[0, color === "red" ? 0 : Math.PI, Math.PI / 4]} /> 
    // <mesh ref={racketRef} position={[0, 0, tableWidth / 2 + 1.5]} scale={[0.5, 7.1, 0.7]}>
    //   <boxGeometry args={[1, 0.2, 1]} />
    //   <meshStandardMaterial color={color} />
    // </mesh>
  )
}

export default PlayerRacket