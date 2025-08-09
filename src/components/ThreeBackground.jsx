import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const ThreeBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
        camera.position.set(0, 0, 500);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.4;

        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            4.0,
            0.9,
            0.4
        );
        composer.addPass(bloomPass);

        // Étoiles de fond
        const starGeometry = new THREE.BufferGeometry();
        const starVertices = [];
        const starColors = [];
        const starSizes = [];

        for (let i = 0; i < 30000; i++) {
            const distance = 500 + Math.random() * 2000;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = distance * Math.sin(phi) * Math.cos(theta);
            const y = distance * Math.sin(phi) * Math.sin(theta);
            const z = distance * Math.cos(phi);

            starVertices.push(x, y, z);

            const hue = Math.random() * 0.2 + 0.7;
            const saturation = 0.8 + Math.random() * 0.2;
            const lightness = 0.9 + Math.random() * 0.1;
            const starColor = new THREE.Color().setHSL(hue, saturation, lightness);
            starColors.push(starColor.r, starColor.g, starColor.b);

            starSizes.push(0.5 + Math.random() * 2.5);
        }

        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
        starGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1));

        const starMaterial = new THREE.PointsMaterial({
            size: 2.0,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 1.0,
            blending: THREE.AdditiveBlending
        });

        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Lumière
        const sunLight = new THREE.PointLight(0xffffbb, 6, 5000, 2.0);
        sunLight.position.set(0, 0, 0);
        scene.add(sunLight);

        const ambientLight = new THREE.AmbientLight(0x505050, 1.2);
        scene.add(ambientLight);

        // Soleil
        const createSun = () => {
            const sunGroup = new THREE.Group();

            const sunGeometry = new THREE.SphereGeometry(40, 128, 128);
            const sunMaterial = new THREE.MeshStandardMaterial({
                color: 0xffdd55,
                emissive: 0xffaa33,
                emissiveIntensity: 6.0,
                roughness: 0.01,
                metalness: 0.97
            });

            const sunCore = new THREE.Mesh(sunGeometry, sunMaterial);
            sunGroup.add(sunCore);

            const coronaLayers = [
                { radius: 48, opacity: 0.7, color: 0xffaa44 },
                { radius: 60, opacity: 0.6, color: 0xff8844 },
                { radius: 75, opacity: 0.5, color: 0xff5566 },
                { radius: 90, opacity: 0.4, color: 0xff3366 }
            ];

            coronaLayers.forEach(layer => {
                const coronaGeometry = new THREE.SphereGeometry(layer.radius, 64, 64);
                const coronaMaterial = new THREE.MeshBasicMaterial({
                    color: layer.color,
                    transparent: true,
                    opacity: layer.opacity,
                    blending: THREE.AdditiveBlending
                });

                const corona = new THREE.Mesh(coronaGeometry, coronaMaterial);
                sunGroup.add(corona);
            });

            const flareCount = 30;
            for (let i = 0; i < flareCount; i++) {
                const flareLength = 120 + Math.random() * 50;
                const flareGeometry = new THREE.ConeGeometry(10, flareLength, 32);
                flareGeometry.translate(0, flareLength / 2, 0);

                const flareMaterial = new THREE.MeshBasicMaterial({
                    color: 0xff5500,
                    transparent: true,
                    opacity: 0.85,
                    blending: THREE.AdditiveBlending
                });

                const flare = new THREE.Mesh(flareGeometry, flareMaterial);
                flare.rotation.z = (i / flareCount) * Math.PI * 2;
                flare.position.set(
                    Math.sin(flare.rotation.z) * 60,
                    Math.cos(flare.rotation.z) * 60,
                    0
                );
                sunGroup.add(flare);
            }

            scene.add(sunGroup);
            return sunGroup;
        };

        const sun = createSun();

        // Étoiles filantes
        const shootingStars = [];

        const createShootingStar = () => {
            const group = new THREE.Group();

            const colors = [0x88aaff, 0xaaff88, 0xff88aa, 0xffff88, 0xffaa88];
            const starColor = colors[Math.floor(Math.random() * colors.length)];

            const bodyGeometry = new THREE.CylinderGeometry(0.6, 2.0, 150, 8, 1, true);
            bodyGeometry.translate(0, 75, 0);

            const bodyMaterial = new THREE.MeshBasicMaterial({
                color: starColor,
                transparent: true,
                opacity: 1.0,
                blending: THREE.AdditiveBlending,
                side: THREE.DoubleSide
            });

            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            group.add(body);

            const headGeometry = new THREE.SphereGeometry(6, 24, 24);
            const headMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 1.0,
                blending: THREE.AdditiveBlending
            });

            const head = new THREE.Mesh(headGeometry, headMaterial);
            head.position.y = 150;
            group.add(head);

            group.position.set(
                THREE.MathUtils.randFloatSpread(1600) - 800,
                THREE.MathUtils.randFloat(500, 800),
                THREE.MathUtils.randFloatSpread(700) - 350
            );

            group.rotation.x = -Math.PI/4 + Math.random() * Math.PI/2;
            group.rotation.z = Math.random() * Math.PI * 2;

            scene.add(group);

            return {
                mesh: group,
                life: 1.0,
                speed: THREE.MathUtils.randFloat(150, 220)
            };
        };

        const clock = new THREE.Clock();
        let lastShootingStarTime = 0;

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            const deltaTime = clock.getDelta();

            stars.rotation.y = elapsedTime * 0.00025;

            if (sun) {
                sun.rotation.y = elapsedTime * 0.01;
                const pulse = 1 + Math.sin(elapsedTime * 0.8) * 0.2;
                sun.scale.set(pulse, pulse, pulse);
            }

            const pulse = Math.sin(elapsedTime * 0.8) * 0.4 + 0.6;
            stars.material.opacity = 0.95 * pulse;

            if (elapsedTime - lastShootingStarTime > THREE.MathUtils.randFloat(0.8, 3.5)) {
                const newStar = createShootingStar();
                shootingStars.push(newStar);
                lastShootingStarTime = elapsedTime;
            }

            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const star = shootingStars[i];
                star.life -= deltaTime * star.speed * 0.12;

                if (star.life <= 0) {
                    scene.remove(star.mesh);
                    star.mesh.children.forEach(child => {
                        if (child.geometry) child.geometry.dispose();
                        if (child.material) child.material.dispose();
                    });
                    shootingStars.splice(i, 1);
                } else {
                    star.mesh.position.y -= deltaTime * 1000;

                    if (star.mesh.children[0]?.material) {
                        star.mesh.children[0].material.opacity = star.life * 0.6;
                    }
                    if (star.mesh.children[1]?.material) {
                        star.mesh.children[1].material.opacity = star.life;
                    }

                    if (star.mesh.children[0]) {
                        star.mesh.children[0].scale.y = 1 + (1 - star.life) * 8;
                    }
                }
            }

            composer.render();
            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();

            shootingStars.forEach(star => {
                scene.remove(star.mesh);
                star.mesh.children.forEach(child => {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) child.material.dispose();
                });
            });
        };
    }, []);

    return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ThreeBackground;