import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeJSLogoAnimation = ({ width = 400, height = 400 }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Configuración básica
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Crear geometrías para los símbolos ) y (
    const createParenthesis = (isLeft = true) => {
      const curve = new THREE.EllipseCurve(
        0, 0,
        0.8, 1.2,
        0, Math.PI,
        false,
        0
      );

      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      
      const material = new THREE.LineBasicMaterial({
        color: 0xD8F9A0,
        linewidth: 8,
        transparent: true,
        opacity: 0.9
      });

      const line = new THREE.Line(geometry, material);
      
      if (!isLeft) {
        line.rotation.y = Math.PI;
      }
      
      return line;
    };

    // Crear los dos símbolos
    const leftParenthesis = createParenthesis(true);
    const rightParenthesis = createParenthesis(false);

    leftParenthesis.position.x = -1.5;
    rightParenthesis.position.x = 1.5;

    scene.add(leftParenthesis);
    scene.add(rightParenthesis);

    // Crear partículas de fondo
    const createParticles = () => {
      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 100;
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleMaterial = new THREE.PointsMaterial({
        color: 0xD8F9A0,
        size: 0.02,
        transparent: true,
        opacity: 0.6
      });

      return new THREE.Points(particleGeometry, particleMaterial);
    };

    const particles = createParticles();
    scene.add(particles);

    // Posicionar cámara
    camera.position.z = 5;

    // Variables de animación
    let time = 0;

    // Función de animación
    const animate = () => {
      time += 0.01;

      // Animación de los paréntesis - movimiento de respiración
      const breathScale = 1 + Math.sin(time * 2) * 0.1;
      leftParenthesis.scale.set(breathScale, breathScale, breathScale);
      rightParenthesis.scale.set(breathScale, breathScale, breathScale);

      // Rotación sutil
      leftParenthesis.rotation.z = Math.sin(time) * 0.1;
      rightParenthesis.rotation.z = -Math.sin(time) * 0.1;

      // Movimiento de las partículas
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;

      // Efecto de pulsación en las partículas
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + i) * 0.001;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Manejo de resize responsivo
    const handleResize = () => {
      const newWidth = mountRef.current?.offsetWidth || width;
      const newHeight = mountRef.current?.offsetHeight || height;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Iniciar animación
    animate();

    // Guardar referencias para cleanup
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Limpiar geometrías y materiales
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, [width, height]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full overflow-hidden rounded-2xl"
      style={{ width, height }}
    />
  );
};

export default ThreeJSLogoAnimation;