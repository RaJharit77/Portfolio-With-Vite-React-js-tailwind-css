import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const GalaxyBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Initialisation
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        // Post-processing
        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5,   // strength
            0.4,   // radius
            0.85   // threshold
        );
        composer.addPass(bloomPass);

        // Création des étoiles
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.7,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.8
        });

        const starVertices = [];
        for (let i = 0; i < 15000; i++) {
            const x = THREE.MathUtils.randFloatSpread(2000);
            const y = THREE.MathUtils.randFloatSpread(2000);
            const z = THREE.MathUtils.randFloatSpread(2000);
            starVertices.push(x, y, z);
        }

        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Création de la nébuleuse
        const nebulaGeometry = new THREE.BufferGeometry();
        const nebulaMaterial = new THREE.PointsMaterial({
            color: 0x5588ff,
            size: 2,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.1,
            blending: THREE.AdditiveBlending
        });

        const nebulaVertices = [];
        for (let i = 0; i < 5000; i++) {
            const radius = 100 + Math.random() * 300;
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI;

            const x = radius * Math.sin(theta) * Math.cos(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(theta);

            nebulaVertices.push(x, y, z);
        }

        nebulaGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nebulaVertices, 3));
        const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
        scene.add(nebula);

        // Création de Saturne
        const createSaturn = () => {
            // Planète principale
            const planetGeometry = new THREE.SphereGeometry(40, 64, 64);
            const planetMaterial = new THREE.MeshStandardMaterial({
                color: 0xE3B04B,
                roughness: 0.8,
                metalness: 0.2
            });
            const planet = new THREE.Mesh(planetGeometry, planetMaterial);
            planet.position.set(150, 100, -400);

            // Anneaux
            const ringGeometry = new THREE.RingGeometry(60, 100, 64);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xF1D3B3,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8
            });
            const rings = new THREE.Mesh(ringGeometry, ringMaterial);
            rings.rotation.x = Math.PI / 3;
            rings.position.set(150, 100, -400);

            scene.add(planet);
            scene.add(rings);

            return { planet, rings };
        };

        // Création de Mars
        const createMars = () => {
            const planetGeometry = new THREE.SphereGeometry(30, 64, 64);
            const planetMaterial = new THREE.MeshStandardMaterial({
                color: 0xff7a45,
                roughness: 0.9,
                metalness: 0.1
            });
            const planet = new THREE.Mesh(planetGeometry, planetMaterial);
            planet.position.set(-180, -120, -300);
            scene.add(planet);
            return planet;
        };

        // Création de Neptune
        const createNeptune = () => {
            const planetGeometry = new THREE.SphereGeometry(35, 64, 64);
            const planetMaterial = new THREE.MeshStandardMaterial({
                color: 0x4b70ff,
                roughness: 0.8,
                metalness: 0.2
            });
            const planet = new THREE.Mesh(planetGeometry, planetMaterial);
            planet.position.set(200, -150, -350);
            scene.add(planet);
            return planet;
        };

        const saturn = createSaturn();
        const mars = createMars();
        const neptune = createNeptune();

        // Animation
        const clock = new THREE.Clock();

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();

            // Rotation des étoiles et nébuleuses
            stars.rotation.x = elapsedTime * 0.0005;
            stars.rotation.y = elapsedTime * 0.0007;
            nebula.rotation.x = elapsedTime * 0.0003;
            nebula.rotation.y = elapsedTime * 0.0002;

            // Rotation des planètes
            saturn.planet.rotation.y = elapsedTime * 0.01;
            saturn.rings.rotation.y = elapsedTime * 0.012;
            mars.rotation.y = elapsedTime * 0.015;
            neptune.rotation.y = elapsedTime * 0.008;

            // Effet de pulsation
            const pulse = Math.sin(elapsedTime * 0.5) * 0.2 + 0.8;
            stars.material.opacity = 0.6 * pulse;
            nebula.material.opacity = 0.08 * pulse;

            composer.render();
            requestAnimationFrame(animate);
        };

        // Responsive
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        mountRef.current.appendChild(renderer.domElement);
        animate();

        // Nettoyage
        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default GalaxyBackground;