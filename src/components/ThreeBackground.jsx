import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const ThreeBackground = () => {
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
            2.5,
            0.6,   
            0.8    
        );
        composer.addPass(bloomPass);

        // Création des étoiles
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.9,
            sizeAttenuation: true,
            transparent: true,
            opacity: 1.0
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
            size: 3,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.2,
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

        // Lumière pour améliorer le rendu des sphères
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
        scene.add(ambientLight);

        // Création de Mars - amélioration du relief
        const createMars = () => {
            const planetGeometry = new THREE.SphereGeometry(40, 128, 128);
            // Ajout de bruit pour le relief
            const positionAttribute = planetGeometry.attributes.position;
            const vertex = new THREE.Vector3();
            
            for (let i = 0; i < positionAttribute.count; i++) {
                vertex.fromBufferAttribute(positionAttribute, i);
                const noise = 0.5 + 0.5 * Math.random();
                vertex.multiplyScalar(1 + 0.02 * noise);
            }
            
            const planetMaterial = new THREE.MeshStandardMaterial({
                color: 0xc1440e,
                roughness: 0.7,
                metalness: 0.3,
                emissive: 0x8c2e0a,
                emissiveIntensity: 0.8,
                flatShading: false
            });
            const planet = new THREE.Mesh(planetGeometry, planetMaterial);
            planet.position.set(-160, -120, -240);
            scene.add(planet);
            return planet;
        };

        // Création de Saturne - amélioration du relief
        const createSaturn = () => {
            const planetGeometry = new THREE.SphereGeometry(55, 128, 128);
            // Ajout de bruit pour le relief
            const positionAttribute = planetGeometry.attributes.position;
            const vertex = new THREE.Vector3();
            
            for (let i = 0; i < positionAttribute.count; i++) {
                vertex.fromBufferAttribute(positionAttribute, i);
                const noise = 0.5 + 0.5 * Math.random();
                vertex.multiplyScalar(1 + 0.03 * noise);
            }
            
            const saturnMaterial = new THREE.MeshStandardMaterial({
                color: 0xe3b04b,
                roughness: 0.5,
                metalness: 0.5,
                emissive: 0xd4a025,
                emissiveIntensity: 0.8,
                flatShading: false
            });
            
            const planet = new THREE.Mesh(planetGeometry, saturnMaterial);
            planet.position.set(200, 120, -280);

            // Anneaux avec relief
            const ringGeometry = new THREE.RingGeometry(80, 140, 128);
            const ringColors = [];
            const colorInner = new THREE.Color(0xf1d3b3);
            const colorOuter = new THREE.Color(0x886633);
            
            for (let i = 0; i < ringGeometry.attributes.position.count; i++) {
                const ratio = i / ringGeometry.attributes.position.count;
                const color = colorInner.clone().lerp(colorOuter, ratio);
                ringColors.push(color.r, color.g, color.b);
            }
            
            ringGeometry.setAttribute('color', new THREE.Float32BufferAttribute(ringColors, 3));
            
            const ringMaterial = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                vertexColors: true,
                transparent: true,
                opacity: 0.95,
                metalness: 0.6,
                roughness: 0.4,
                emissive: 0x886633,
                emissiveIntensity: 0.5
            });
            
            const rings = new THREE.Mesh(ringGeometry, ringMaterial);
            rings.rotation.x = Math.PI / 3;
            rings.position.set(200, 120, -280);

            scene.add(planet);
            scene.add(rings);

            return { planet, rings };
        };

        // Création de Neptune - amélioration du relief
        const createNeptune = () => {
            const planetGeometry = new THREE.SphereGeometry(45, 128, 128);
            // Ajout de bruit pour le relief
            const positionAttribute = planetGeometry.attributes.position;
            const vertex = new THREE.Vector3();
            
            for (let i = 0; i < positionAttribute.count; i++) {
                vertex.fromBufferAttribute(positionAttribute, i);
                const noise = 0.5 + 0.5 * Math.random();
                vertex.multiplyScalar(1 + 0.025 * noise);
            }
            
            const neptuneMaterial = new THREE.MeshStandardMaterial({
                color: 0x1a5bff,
                roughness: 0.7,
                metalness: 0.3,
                emissive: 0x0a3bbf,
                emissiveIntensity: 0.8,
                flatShading: false
            });
            
            const planet = new THREE.Mesh(planetGeometry, neptuneMaterial);
            planet.position.set(240, -160, -280);
            scene.add(planet);
            return planet;
        };

        // Création de Jupiter - amélioration du relief
        const createJupiter = () => {
            const planetGeometry = new THREE.SphereGeometry(65, 128, 128);
            // Ajout de bruit pour le relief
            const positionAttribute = planetGeometry.attributes.position;
            const vertex = new THREE.Vector3();
            
            for (let i = 0; i < positionAttribute.count; i++) {
                vertex.fromBufferAttribute(positionAttribute, i);
                const noise = 0.5 + 0.5 * Math.random();
                vertex.multiplyScalar(1 + 0.035 * noise);
            }
            
            const colors = [];
            const positions = planetGeometry.attributes.position.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                const y = positions[i + 1];
                const normalizedY = (y + 50) / 100;
                
                let color;
                if (normalizedY < 0.3) {
                    color = new THREE.Color(0xd8ca9d);
                } else if (normalizedY < 0.6) {
                    color = new THREE.Color(0xb86f50);
                } else {
                    color = new THREE.Color(0xd87c45);
                }
                
                colors.push(color.r, color.g, color.b);
            }
            
            planetGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            
            const jupiterMaterial = new THREE.MeshStandardMaterial({
                vertexColors: true,
                roughness: 0.6,
                metalness: 0.4,
                emissive: 0xb86f50,
                emissiveIntensity: 0.5,
                flatShading: false
            });
            
            const planet = new THREE.Mesh(planetGeometry, jupiterMaterial);
            planet.position.set(-280, 200, -320);
            
            // Grande Tache Rouge avec relief
            const spotGeometry = new THREE.SphereGeometry(18, 64, 64);
            const spotMaterial = new THREE.MeshStandardMaterial({
                color: 0xcc4444,
                transparent: true,
                opacity: 0.9,
                roughness: 0.7,
                metalness: 0.2
            });
            
            const redSpot = new THREE.Mesh(spotGeometry, spotMaterial);
            redSpot.position.set(45, 15, 0);
            planet.add(redSpot);
            
            scene.add(planet);
            return planet;
        };

        // Création de la Terre - amélioration du relief
        const createEarth = () => {
            const planetGeometry = new THREE.SphereGeometry(50, 128, 128);
            // Ajout de bruit pour le relief
            const positionAttribute = planetGeometry.attributes.position;
            const vertex = new THREE.Vector3();
            
            for (let i = 0; i < positionAttribute.count; i++) {
                vertex.fromBufferAttribute(positionAttribute, i);
                const noise = 0.5 + 0.5 * Math.random();
                vertex.multiplyScalar(1 + 0.015 * noise);
            }
            
            const earthMaterial = new THREE.MeshStandardMaterial({
                color: 0x3a86ff,
                roughness: 0.6,
                metalness: 0.3,
                emissive: 0x2a76ef,
                emissiveIntensity: 0.6,
                flatShading: false
            });
            
            const planet = new THREE.Mesh(planetGeometry, earthMaterial);
            planet.position.set(40, -40, -200);
            
            // Continents avec relief
            const continentGeometry = new THREE.SphereGeometry(50.5, 128, 128);
            const continentMaterial = new THREE.MeshStandardMaterial({
                color: 0x4caf50,
                transparent: true,
                opacity: 0.4,
                roughness: 0.8,
                metalness: 0.1
            });
            
            const continents = new THREE.Mesh(continentGeometry, continentMaterial);
            planet.add(continents);
            
            // Nuages avec relief
            const cloudGeometry = new THREE.SphereGeometry(51, 128, 128);
            const cloudMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.3,
                roughness: 0.9,
                metalness: 0.05
            });
            
            const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
            planet.add(clouds);
            
            scene.add(planet);
            return planet;
        };

        const saturn = createSaturn();
        const mars = createMars();
        const neptune = createNeptune();
        const jupiter = createJupiter();
        const earth = createEarth();

        // Correction des étoiles filantes - version visible et rapide
        const shootingStars = [];
        
        const createShootingStar = () => {
            // Utilisation d'une géométrie de ligne avec un dégradé
            const geometry = new THREE.BufferGeometry();
            
            // Position de départ aléatoire (dans le haut de l'écran)
            const startX = THREE.MathUtils.randFloatSpread(window.innerWidth * 0.8);
            const startY = window.innerHeight * 0.8 + Math.random() * window.innerHeight * 0.2;
            const startZ = -100; // Devant la caméra
            
            // Direction vers le bas
            const endX = startX + THREE.MathUtils.randFloatSpread(300) - 150;
            const endY = startY - 1500;
            const endZ = startZ + THREE.MathUtils.randFloatSpread(200) - 100;

            const vertices = new Float32Array([
                startX, startY, startZ,
                endX, endY, endZ
            ]);

            geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
            
            // Création d'un dégradé de couleur pour la traînée
            const colors = new Float32Array([
                1, 1, 1,  // Blanc au début
                0.5, 0.7, 1.0 // Bleu à la fin
            ]);
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            
            const material = new THREE.LineBasicMaterial({
                vertexColors: true,
                linewidth: 2,
                transparent: true,
                opacity: 1.0,
                blending: THREE.AdditiveBlending
            });
            
            const star = new THREE.Line(geometry, material);
            scene.add(star);
            
            return {
                mesh: star,
                life: 1.0,
                speed: THREE.MathUtils.randFloat(100, 150) // Très rapide
            };
        };

        // Animation
        const clock = new THREE.Clock();
        let lastShootingStarTime = 0;

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            const deltaTime = clock.getDelta();

            // Rotation des étoiles et nébuleuses
            stars.rotation.x = elapsedTime * 0.0007;
            stars.rotation.y = elapsedTime * 0.0009;
            nebula.rotation.x = elapsedTime * 0.0005;
            nebula.rotation.y = elapsedTime * 0.0004;

            // Rotation des planètes
            saturn.planet.rotation.y = elapsedTime * 0.03;
            saturn.rings.rotation.y = elapsedTime * 0.036;
            mars.rotation.y = elapsedTime * 0.04;
            neptune.rotation.y = elapsedTime * 0.024;
            jupiter.rotation.y = elapsedTime * 0.02;
            earth.rotation.y = elapsedTime * 0.05;

            // Rotation supplémentaire sur l'axe X pour plus de réalisme
            mars.rotation.x = Math.sin(elapsedTime * 0.01) * 0.3;
            neptune.rotation.x = Math.sin(elapsedTime * 0.008) * 0.4;
            earth.rotation.x = 0.4 + Math.sin(elapsedTime * 0.015) * 0.1;

            // Effet de pulsation
            const pulse = Math.sin(elapsedTime * 0.5) * 0.3 + 0.7;
            stars.material.opacity = 0.9 * pulse;
            nebula.material.opacity = 0.2 * pulse;

            // Génération d'étoiles filantes (une seule à la fois)
            if (shootingStars.length === 0 && elapsedTime - lastShootingStarTime > THREE.MathUtils.randFloat(1, 3)) {
                const newStar = createShootingStar();
                shootingStars.push(newStar);
                lastShootingStarTime = elapsedTime;
            }

            // Animation des étoiles filantes (ultra-rapide)
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const star = shootingStars[i];
                star.life -= deltaTime * star.speed * 0.5; // Vie très courte
                
                if (star.life <= 0) {
                    scene.remove(star.mesh);
                    star.mesh.geometry.dispose();
                    star.mesh.material.dispose();
                    shootingStars.splice(i, 1);
                } else {
                    // Mise à jour de l'opacité
                    star.mesh.material.opacity = star.life;
                    
                    // Déplacement ultra-rapide
                    const positions = star.mesh.geometry.attributes.position.array;
                    const speedFactor = 25; // Facteur de vitesse très élevé
                    
                    positions[0] -= deltaTime * 2000 * speedFactor;
                    positions[1] -= deltaTime * 4000 * speedFactor;
                    positions[2] -= deltaTime * 1000 * speedFactor;
                    
                    positions[3] -= deltaTime * 2000 * speedFactor;
                    positions[4] -= deltaTime * 4000 * speedFactor;
                    positions[5] -= deltaTime * 1000 * speedFactor;
                    
                    star.mesh.geometry.attributes.position.needsUpdate = true;
                }
            }

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
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            
            // Nettoyage des étoiles filantes
            shootingStars.forEach(star => {
                scene.remove(star.mesh);
                if (star.mesh.geometry) star.mesh.geometry.dispose();
                if (star.mesh.material) star.mesh.material.dispose();
            });
        };
    }, []);

    return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ThreeBackground;