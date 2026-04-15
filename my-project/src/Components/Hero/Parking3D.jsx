import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';

// This component handles the car's 3D logic and animation
const MovingCar3D = () => {
  const carRef = useRef();

  // GSAP Animation Logic
  React.useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // 1. Entrance
    tl.set(carRef.current.position, { x: 5, z: 0 })
      .set(carRef.current.rotation, { y: Math.PI / 2 })
      .to(carRef.current.position, { x: 0, duration: 2, ease: "power2.out" })
      
    // 2. The Turn (Swerve)
      .to(carRef.current.rotation, { y: 0, duration: 0.8 })
      .to(carRef.current.position, { x: -0.5, z: 0.5, duration: 0.8 }, "<")

    // 3. The Park (Reverse into slot)
      .to(carRef.current.position, { z: 1.5, duration: 1.2, ease: "back.out(1.2)" })
      
    // 4. Reset
      .to(carRef.current, { opacity: 0, duration: 0.5, delay: 2 });
  }, []);

  return (
    <group ref={carRef}>
      {/* REPLACING WITH ACTUAL MODEL: 
         If you download a car.gltf, replace the Mesh below with:
         <primitive object={useGLTF('/car_model.gltf').scene} scale={0.5} />
      */}
      <mesh castShadow>
        <boxGeometry args={[0.6, 0.4, 1.2]} />
        <meshStandardMaterial color="white" roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Simple Windshield */}
      <mesh position={[0, 0.2, 0.1]}>
        <boxGeometry args={[0.5, 0.2, 0.4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
};

const Parking3D = () => {
  return (
    <div className="w-full h-[500px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />

        {/* The Parking Lot Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.2, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>

        {/* Parking Lines (Drawn as thin planes) */}
        <gridHelper args={[20, 20, 0xffffff, 0x444444]} position={[0, -0.19, 0]} />

        {/* The Animated Car */}
        <MovingCar3D />

        {/* Realistic Shadows on the ground */}
        <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.75} far={10} color="#000000" />
      </Canvas>
    </div>
  );
};

export default Parking3D;