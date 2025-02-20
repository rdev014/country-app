import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationFrameId: number;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create a timeline for orchestrating animations
    const mainTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0,
      defaults: { ease: "none" }
    });

    // Enhanced geometric shapes with more variety
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.TorusKnotGeometry(1.2, 0.5, 128, 32, 2, 5),
      new THREE.DodecahedronGeometry(1.3, 2),
      new THREE.IcosahedronGeometry(1, 2),
      new THREE.TorusGeometry(1.5, 0.4, 32, 100),
      new THREE.SphereGeometry(1.2, 32, 32),
    ];

    // Enhanced color palette with gradients
    const colorPairs = [
      ['#4facfe', '#00f2fe'], // Blue gradient
      ['#fa709a', '#fee140'], // Pink to yellow
      ['#43e97b', '#38f9d7'], // Green to cyan
      ['#f83600', '#f9d423'], // Orange to yellow
      ['#6a11cb', '#2575fc'], // Purple to blue
    ];

    // Create enhanced shapes with better materials
    for (let i = 0; i < 30; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      
      // Create gradient material
      const colorPair = colorPairs[Math.floor(Math.random() * colorPairs.length)];
      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(colorPair[0]),
        transparent: true,
        opacity: 0.7,
        metalness: 0.9,
        roughness: 0.1,
        wireframe: Math.random() > 0.7,
        emissive: new THREE.Color(colorPair[1]),
        emissiveIntensity: 0.5,
        envMapIntensity: 1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      });

      const shape = new THREE.Mesh(geometry, material);
      
      // Improved distribution pattern
      const radius = 20 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      shape.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      // Add floating animation with GSAP
      const duration = 3 + Math.random() * 4;
      const delay = Math.random() * 2;
      
      // Improved floating animation
      mainTimeline.to(shape.position, {
        y: `+=${1.5 + Math.random() * 2.5}`,
        x: `+=${Math.random() * 2 - 1}`,
        z: `+=${Math.random() * 2 - 1}`,
        duration: duration,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        delay: delay
      }, 0);

      // Enhanced rotation animation
      mainTimeline.to(shape.rotation, {
        x: `+=${Math.PI * (1 + Math.random())}`,
        y: `+=${Math.PI * (1 + Math.random())}`,
        z: `+=${Math.PI * (1 + Math.random())}`,
        duration: duration * 2,
        repeat: -1,
        ease: "none",
        delay: delay
      }, 0);

      // Improved breathing effect
      mainTimeline.to(shape.scale, {
        x: shape.scale.x * (1.1 + Math.random() * 0.2),
        y: shape.scale.y * (1.1 + Math.random() * 0.2),
        z: shape.scale.z * (1.1 + Math.random() * 0.2),
        duration: duration * 0.75,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        delay: delay
      }, 0);

      shapes.push(shape);
      scene.add(shape);
    }

    // Enhanced lighting setup
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // Dynamic point lights with TypeScript-safe position arrays
    const pointLights = [
      { color: 0x4facfe, intensity: 1.5, distance: 30, position: [10, 10, 10] as const },
      { color: 0xf83600, intensity: 1.5, distance: 30, position: [-10, -10, -10] as const },
      { color: 0x43e97b, intensity: 1.5, distance: 30, position: [10, -10, 10] as const },
    ] as const;

    const lights = pointLights.map(({ color, intensity, distance, position }) => {
      const light = new THREE.PointLight(color, intensity, distance);
      light.position.set(position[0], position[1], position[2]);
      scene.add(light);
      return light;
    });

    // Enhanced lighting animation
    lights.forEach((light, index) => {
      const duration = 4 + index;
      
      gsap.to(light.position, {
        x: 15,
        y: 10,
        z: 15,
        duration: duration,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      });

      gsap.to(light, {
        intensity: 2,
        duration: duration * 0.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      });
    });

    camera.position.z = 25;

    // Enhanced camera animation
    gsap.to(camera.position, {
      x: 8,
      y: 5,
      duration: 12,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      onUpdate: () => {
        camera.lookAt(scene.position);
      }
    });

    // Improved animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Enhanced resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      containerRef.current?.removeChild(renderer.domElement);
      // Enhanced cleanup
      shapes.forEach(shape => {
        shape.geometry.dispose();
        if (shape.material instanceof THREE.Material) {
          shape.material.dispose();
        }
      });
      // Additional cleanup for GSAP
      mainTimeline.kill();
      gsap.killTweensOf(camera.position);
      lights.forEach(light => {
        gsap.killTweensOf(light.position);
        gsap.killTweensOf(light);
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 bg-gradient-to-b from-gray-900/50 via-purple-900/30 to-gray-900/50
                backdrop-blur-[2px] transition-all duration-1000" 
    />
  );
};