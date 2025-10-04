import React from 'react'

const Floor = ({args, position, rotation}) => {
  return (
    <mesh receiveShadow rotation={rotation} position={position}>
        <planeGeometry args={args} />
        <meshStandardMaterial color="#b88b58" />
    </mesh>
  )
}

export default Floor