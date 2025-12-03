import React, { useRef, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'

const ModelViewer = ({ modelInfo }) => {
  const meshRef = useRef()
  
  // ایجاد یک مدل ساده مکعب به عنوان نمونه
  return (
    <div style={{ width: '100%', height: '400px', border: '2px solid #40916c', borderRadius: '10px' }}>
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* مدل مکعب نمونه */}
        <mesh ref={meshRef} rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#40916c" />
        </mesh>
        
        <OrbitControls enableZoom={true} />
        
        {/* نمایش اطلاعات مدل */}
        <Text
          position={[0, -3, 0]}
          fontSize={0.5}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {modelInfo || 'مدل نمونه'}
        </Text>
      </Canvas>
    </div>
  )
}

export default ModelViewer
