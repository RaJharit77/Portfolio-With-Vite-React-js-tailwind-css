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

        // Nébuleuse galactique
        const galaxyGeometry = new THREE.BufferGeometry();
        const galaxyVertices = [];
        const galaxyColors = [];

        for (let i = 0; i < 20000; i++) {
            const arm = Math.floor(Math.random() * 5);
            const distance = 100 + Math.random() * 1200;
            const angle = Math.random() * Math.PI * 2;
            const spiralOffset = Math.log(distance / 100) * 3.5;

            const x = Math.cos(angle + spiralOffset + arm * Math.PI/2) * distance;
            const y = (Math.random() - 0.5) * 80;
            const z = Math.sin(angle + spiralOffset + arm * Math.PI/2) * distance;

            galaxyVertices.push(x, y, z);

            const hue = 0.65 + Math.random() * 0.3;
            const saturation = 0.9 + Math.random() * 0.1;
            const lightness = 0.5 + Math.random() * 0.2;
            const color = new THREE.Color().setHSL(hue, saturation, lightness);
            galaxyColors.push(color.r, color.g, color.b);
        }

        galaxyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(galaxyVertices, 3));
        galaxyGeometry.setAttribute('color', new THREE.Float32BufferAttribute(galaxyColors, 3));

        const galaxyMaterial = new THREE.PointsMaterial({
            size: 12,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });

        const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
        scene.add(galaxy);

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

        // Planètes
        const createPlanet = (radius, color, position, emissive = 0x000000, emissiveIntensity = 0, roughness = 0.7, metalness = 0.3) => {
            const geometry = new THREE.SphereGeometry(radius, 128, 128);

            const material = new THREE.MeshStandardMaterial({
                color: color,
                emissive: emissive,
                emissiveIntensity: emissiveIntensity,
                roughness: roughness,
                metalness: metalness
            });

            const planet = new THREE.Mesh(geometry, material);
            planet.position.set(position.x, position.y, position.z);
            scene.add(planet);

            return planet;
        };

        // Lune
        const createMoon = (position) => {
            const moonGeometry = new THREE.SphereGeometry(8, 128, 128);

            const moonMaterial = new THREE.MeshStandardMaterial({
                color: 0xeeeeee,
                roughness: 0.95,
                metalness: 0.05
            });

            const moon = new THREE.Mesh(moonGeometry, moonMaterial);
            moon.position.set(position.x, position.y, position.z);
            scene.add(moon);

            for (let i = 0; i < 35; i++) {
                const craterSize = 0.4 + Math.random() * 1.2;
                const craterGeometry = new THREE.SphereGeometry(craterSize, 16, 16);
                const craterMaterial = new THREE.MeshStandardMaterial({
                    color: 0x999999,
                    roughness: 0.95
                });

                const crater = new THREE.Mesh(craterGeometry, craterMaterial);

                const phi = Math.random() * Math.PI;
                const theta = Math.random() * Math.PI * 2;
                const distance = 8 - craterSize * 0.5;

                crater.position.set(
                    distance * Math.sin(phi) * Math.cos(theta),
                    distance * Math.sin(phi) * Math.sin(theta),
                    distance * Math.cos(phi)
                );

                moon.add(crater);
            }

            return moon;
        };

        // CRISTAUX GALACTIQUES ULTRA-RÉALISTES (formations minérales spatiales)
        const createGalacticCrystals = () => {
            const crystalGroup = new THREE.Group();
            const crystalCount = 8; // Moins de cristaux pour plus de réalisme

            // Géométries de cristaux basées sur de vraies structures cristallines
            const createCrystalGeometry = (type, size) => {
                switch(type) {
                    case 'quartz': // Structure hexagonale
                        const quartz = new THREE.CylinderGeometry(size * 0.8, size * 0.6, size * 2, 6);
                        // Ajout d'une pointe pyramidale
                        const tip = new THREE.ConeGeometry(size * 0.6, size * 0.8, 6);
                        tip.translate(0, size * 1.4, 0);
                        quartz.merge ? quartz.merge(tip) : null;
                        return quartz;
                        
                    case 'fluorite': // Structure cubique avec imperfections
                        const base = new THREE.BoxGeometry(size * 1.2, size * 1.2, size * 1.2);
                        // Ajout d'irrégularités
                        const positions = base.attributes.position.array;
                        for (let i = 0; i < positions.length; i += 3) {
                            positions[i] += (Math.random() - 0.5) * size * 0.1;
                            positions[i + 1] += (Math.random() - 0.5) * size * 0.1;
                            positions[i + 2] += (Math.random() - 0.5) * size * 0.1;
                        }
                        base.attributes.position.needsUpdate = true;
                        return base;
                        
                    case 'beryl': // Structure prismatique hexagonale allongée
                        return new THREE.CylinderGeometry(size * 0.5, size * 0.5, size * 3, 6);
                        
                    default: // Octaèdre irrégulier
                        const octa = new THREE.OctahedronGeometry(size, 0);
                        const octaPositions = octa.attributes.position.array;
                        for (let i = 0; i < octaPositions.length; i += 3) {
                            const factor = 0.85 + Math.random() * 0.3;
                            octaPositions[i] *= factor;
                            octaPositions[i + 1] *= factor;
                            octaPositions[i + 2] *= factor;
                        }
                        octa.attributes.position.needsUpdate = true;
                        return octa;
                }
            };

            // Types de cristaux spatiaux basés sur de vrais minéraux
            const crystalTypes = [
                { 
                    type: 'ice_crystal', 
                    geometry: 'quartz',
                    baseColor: 0xd4e8ff, 
                    emissive: 0x001122, 
                    properties: { roughness: 0.02, metalness: 0, ior: 1.31, transmission: 0.9 } // Comme la glace
                },
                { 
                    type: 'space_quartz', 
                    geometry: 'quartz',
                    baseColor: 0xe8e8ff, 
                    emissive: 0x111122, 
                    properties: { roughness: 0.05, metalness: 0.1, ior: 1.54, transmission: 0.7 } // Comme le quartz
                },
                { 
                    type: 'cosmic_fluorite', 
                    geometry: 'fluorite',
                    baseColor: 0xcc88ff, 
                    emissive: 0x220033, 
                    properties: { roughness: 0.1, metalness: 0, ior: 1.43, transmission: 0.6 } // Comme la fluorite
                },
                { 
                    type: 'void_beryl', 
                    geometry: 'beryl',
                    baseColor: 0x88ffcc, 
                    emissive: 0x003322, 
                    properties: { roughness: 0.08, metalness: 0.2, ior: 1.57, transmission: 0.5 } // Comme le béryl
                }
            ];

            for (let i = 0; i < crystalCount; i++) {
                const crystalType = crystalTypes[Math.floor(Math.random() * crystalTypes.length)];
                const baseSize = 3 + Math.random() * 4; // Tailles plus petites et réalistes
                
                const crystalGeometry = createCrystalGeometry(crystalType.geometry, baseSize);
                
                // Matériau ultra-réaliste basé sur les propriétés physiques réelles
                const crystalMaterial = new THREE.MeshPhysicalMaterial({
                    color: crystalType.baseColor,
                    emissive: crystalType.emissive,
                    emissiveIntensity: 0.02 + Math.random() * 0.03, // Très subtil
                    transparent: true,
                    opacity: 0.92 + Math.random() * 0.05,
                    roughness: crystalType.properties.roughness + Math.random() * 0.02,
                    metalness: crystalType.properties.metalness,
                    clearcoat: 0.95,
                    clearcoatRoughness: 0.02 + Math.random() * 0.03,
                    transmission: crystalType.properties.transmission,
                    ior: crystalType.properties.ior + (Math.random() - 0.5) * 0.1,
                    thickness: 0.8 + Math.random() * 0.4,
                    reflectivity: 0.9,
                    sheen: 0.1,
                    sheenRoughness: 0.8,
                    specularIntensity: 0.9,
                    specularColor: new THREE.Color(crystalType.baseColor).multiplyScalar(1.2)
                });

                const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
                
                // Positionnement réaliste - comme des cristaux formés dans l'espace
                // Regroupement autour d'astéroïdes ou de débris spatiaux
                const clusterCenter = i < 3 ? 0 : (i < 6 ? 1 : 2);
                const clusterPositions = [
                    new THREE.Vector3(150, -50, -200),
                    new THREE.Vector3(-200, 100, -350),
                    new THREE.Vector3(250, 150, -450)
                ];
                
                const clusterPos = clusterPositions[clusterCenter];
                const localOffset = new THREE.Vector3(
                    (Math.random() - 0.5) * 60,
                    (Math.random() - 0.5) * 60,
                    (Math.random() - 0.5) * 60
                );
                
                crystal.position.copy(clusterPos).add(localOffset);

                // Orientation géologique réaliste
                // Les cristaux s'orientent souvent selon des axes préférentiels
                const preferredAxis = new THREE.Vector3(0, 1, 0);
                const randomAxis = new THREE.Vector3(
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5
                ).normalize();
                
                const finalAxis = preferredAxis.lerp(randomAxis, 0.3);
                crystal.lookAt(crystal.position.clone().add(finalAxis));
                
                // Ajout d'une rotation aléatoire légère
                crystal.rotateX((Math.random() - 0.5) * 0.5);
                crystal.rotateZ((Math.random() - 0.5) * 0.5);

                // Échelle avec variation naturelle
                const scaleVariation = 0.8 + Math.random() * 0.4;
                crystal.scale.set(scaleVariation, scaleVariation, scaleVariation);

                // Propriétés d'animation ultra-subtiles
                crystal.userData = {
                    rotationSpeed: new THREE.Vector3(
                        (Math.random() - 0.5) * 0.001, // Rotation extrêmement lente
                        (Math.random() - 0.5) * 0.002,
                        (Math.random() - 0.5) * 0.0005
                    ),
                    thermalExpansion: Math.random() * 0.0002 + 0.0001, // Expansion thermique
                    originalScale: scaleVariation,
                    originalY: crystal.position.y,
                    crystalType: crystalType.type,
                    formation: clusterCenter,
                    baseEmissive: 0.02 + Math.random() * 0.03,
                    resonanceFreq: Math.random() * 0.05 + 0.02, // Fréquence de résonance unique
                    lastFlash: 0,
                    flashCooldown: 5 + Math.random() * 10 // Cooldown entre les flash
                };

                crystalGroup.add(crystal);
            }

            scene.add(crystalGroup);
            return crystalGroup;
        };

        // VAISSEAU SPATIAL GALACTIQUE
        const createSpaceship = (position) => {
            const group = new THREE.Group();

            // Corps principal du vaisseau
            const bodyGeometry = new THREE.ConeGeometry(3, 8, 32);
            bodyGeometry.rotateX(Math.PI / 2);
            const bodyMaterial = new THREE.MeshStandardMaterial({
                color: 0x2266ff,
                metalness: 0.8,
                roughness: 0.2,
                emissive: 0x4488ff,
                emissiveIntensity: 0.5
            });
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            group.add(body);

            // Ailes
            const wingGeometry = new THREE.BoxGeometry(8, 0.5, 3);
            const wingMaterial = new THREE.MeshStandardMaterial({
                color: 0x1144aa,
                metalness: 0.7,
                roughness: 0.3
            });

            const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
            leftWing.position.set(-4, 0, 0);
            group.add(leftWing);

            const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
            rightWing.position.set(4, 0, 0);
            group.add(rightWing);

            // Propulseurs
            const engineGeometry = new THREE.CylinderGeometry(0.8, 0.8, 2, 16);
            const engineMaterial = new THREE.MeshStandardMaterial({
                color: 0xff5500,
                emissive: 0xff8800,
                emissiveIntensity: 2.0
            });

            const leftEngine = new THREE.Mesh(engineGeometry, engineMaterial);
            leftEngine.position.set(-2, -1, -2);
            leftEngine.rotateX(Math.PI / 2);
            group.add(leftEngine);

            const rightEngine = new THREE.Mesh(engineGeometry, engineMaterial);
            rightEngine.position.set(2, -1, -2);
            rightEngine.rotateX(Math.PI / 2);
            group.add(rightEngine);

            // Cockpit
            const cockpitGeometry = new THREE.SphereGeometry(1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
            const cockpitMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x88ccff,
                transparent: true,
                opacity: 0.8,
                clearcoat: 1.0,
                clearcoatRoughness: 0.05
            });
            const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
            cockpit.position.set(0, 0, 2);
            group.add(cockpit);

            // Position initiale
            group.position.copy(position);
            group.scale.set(5, 5, 5);
            group.rotation.x = Math.PI / 8;

            scene.add(group);
            return group;
        };

        // Création des corps célestes
        const sun = createSun();
        const earth = createPlanet(18, 0x4477ff, new THREE.Vector3(250, 0, -350), 0x112266, 0.3);
        const moon = createMoon(new THREE.Vector3(270, 0, -350));
        const mars = createPlanet(14, 0xff6633, new THREE.Vector3(-180, 120, -450), 0x552200, 0.4, 0.8, 0.2);
        const jupiter = createPlanet(30, 0xd8ca9d, new THREE.Vector3(-450, -180, -600), 0x3c3c3c, 0.2, 0.8, 0.1);
        const saturn = createPlanet(24, 0xe8e1d1, new THREE.Vector3(350, 200, -500), 0x000000, 0, 0.6, 0.4);
        const spaceship = createSpaceship(new THREE.Vector3(120, 50, -250));
        const galacticCrystals = createGalacticCrystals();

        // Anneaux de Saturne
        const saturnRings = () => {
            const ringsGroup = new THREE.Group();

            const mainRingGeometry = new THREE.RingGeometry(28, 46, 256);
            const mainRingMaterial = new THREE.MeshStandardMaterial({
                color: 0xf1e5c9,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.95,
                metalness: 0.9,
                roughness: 0.2
            });
            const mainRing = new THREE.Mesh(mainRingGeometry, mainRingMaterial);
            mainRing.rotation.x = Math.PI / 2.7;
            ringsGroup.add(mainRing);

            ringsGroup.position.copy(saturn.position);
            scene.add(ringsGroup);

            return ringsGroup;
        };

        const rings = saturnRings();

        // Ceinture d'astéroïdes
        const createAsteroidBelt = () => {
            const asteroidGroup = new THREE.Group();
            const asteroidCount = 2500;
            const innerRadius = 280;
            const outerRadius = 500;
            const height = 120;

            const colorPalette = [
                0x8a7f80, 0x7f7053, 0x787878, 0x5c4e44,
                0xa57c65, 0x8f7b71, 0x6d5d53, 0x9e8b7d,
                0xb8a99a, 0x7d6e64, 0x635a52, 0x4a4038,
                0x9d847b, 0x7a645c, 0xa99385, 0x8c796d
            ];

            for (let i = 0; i < asteroidCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
                const y = (Math.random() - 0.5) * height;

                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius - 500;

                const asteroidSize = 1.5 + Math.random() * 6;
                const detailLevel = Math.floor(Math.random() * 3);
                const asteroidGeometry = new THREE.IcosahedronGeometry(asteroidSize, detailLevel);

                const asteroidColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];

                const asteroidMaterial = new THREE.MeshStandardMaterial({
                    color: asteroidColor,
                    roughness: 0.8 + Math.random() * 0.2,
                    metalness: 0.1 + Math.random() * 0.1
                });

                const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
                asteroid.position.set(x, y, z);
                asteroid.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                );

                asteroid.userData = {
                    originalPosition: new THREE.Vector3(x, y, z),
                    rotationSpeed: new THREE.Vector3(
                        Math.random() * 0.02,
                        Math.random() * 0.04,
                        Math.random() * 0.02
                    )
                };

                asteroidGroup.add(asteroid);
            }

            scene.add(asteroidGroup);
            return asteroidGroup;
        };

        const asteroidBelt = createAsteroidBelt();

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
        let spaceshipMoveDirection = 1;
        let spaceshipRotation = 0;

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            const deltaTime = clock.getDelta();

            stars.rotation.y = elapsedTime * 0.00025;
            galaxy.rotation.y = elapsedTime * 0.0002;

            if (sun) sun.rotation.y = elapsedTime * 0.01;
            if (earth) earth.rotation.y = elapsedTime * 0.02;
            if (moon) moon.rotation.y = elapsedTime * 0.015;
            if (mars) mars.rotation.y = elapsedTime * 0.025;
            if (jupiter) jupiter.rotation.y = elapsedTime * 0.008;
            if (saturn) saturn.rotation.y = elapsedTime * 0.015;
            if (rings) rings.rotation.y = elapsedTime * 0.018;

            // Animation des cristaux ultra-réalistes
            if (galacticCrystals) {
                galacticCrystals.children.forEach(crystal => {
                    // Rotation quasi-imperceptible (comme de vrais cristaux dans l'espace)
                    crystal.rotation.x += crystal.userData.rotationSpeed.x;
                    crystal.rotation.y += crystal.userData.rotationSpeed.y;
                    crystal.rotation.z += crystal.userData.rotationSpeed.z;
                    
                    // Expansion/contraction thermique très subtile
                    const thermalCycle = Math.sin(elapsedTime * 0.1) * crystal.userData.thermalExpansion;
                    const thermalScale = crystal.userData.originalScale * (1 + thermalCycle);
                    crystal.scale.setScalar(thermalScale);
                    
                    // Résonance cristalline - vibration interne très légère
                    const resonance = Math.sin(elapsedTime * crystal.userData.resonanceFreq) * 0.001;
                    crystal.position.y = crystal.userData.originalY + resonance;
                    
                    // Réfraction de la lumière stellaire (changement d'émission basé sur l'angle avec le soleil)
                    if (sun) {
                        const distanceToSun = crystal.position.distanceTo(sun.position);
                        const lightIntensity = Math.max(0, 1 - (distanceToSun / 1000));
                        const angleToSun = crystal.position.angleTo(sun.position);
                        const refractionEffect = Math.cos(angleToSun) * lightIntensity * 0.01;
                        
                        crystal.material.emissiveIntensity = crystal.userData.baseEmissive + refractionEffect;
                    }
                    
                    // Flash de résonance cristalline très rare et réaliste
                    if (elapsedTime - crystal.userData.lastFlash > crystal.userData.flashCooldown) {
                        if (Math.random() < 0.0005) { // Extrêmement rare
                            crystal.userData.lastFlash = elapsedTime;
                            crystal.userData.flashCooldown = 5 + Math.random() * 15; // Nouveau cooldown
                            
                            // Flash graduel et naturel
                            const originalIntensity = crystal.material.emissiveIntensity;
                            const flashIntensity = originalIntensity + 0.1;
                            
                            // Montée progressive
                            let flashTime = 0;
                            const flashInterval = setInterval(() => {
                                flashTime += 16; // ~60fps
                                const progress = flashTime / 200; // Flash sur 200ms
                                
                                if (progress < 0.5) {
                                    // Montée
                                    const intensity = originalIntensity + (flashIntensity - originalIntensity) * (progress * 2);
                                    if (crystal.material) crystal.material.emissiveIntensity = intensity;
                                } else if (progress < 1) {
                                    // Descente
                                    const intensity = flashIntensity - (flashIntensity - originalIntensity) * ((progress - 0.5) * 2);
                                    if (crystal.material) crystal.material.emissiveIntensity = intensity;
                                } else {
                                    // Fin du flash
                                    if (crystal.material) crystal.material.emissiveIntensity = originalIntensity;
                                    clearInterval(flashInterval);
                                }
                            }, 16);
                        }
                    }
                    
                    // Variation d'opacité basée sur l'angle de vue (effet de Fresnel réaliste)
                    const viewVector = new THREE.Vector3().subVectors(camera.position, crystal.position).normalize();
                    const normalVector = new THREE.Vector3(0, 1, 0).applyQuaternion(crystal.quaternion);
                    const fresnelEffect = Math.abs(viewVector.dot(normalVector));
                    crystal.material.opacity = 0.92 + fresnelEffect * 0.05;
                    
                    // Ajustement de la transmission basé sur l'épaisseur perçue
                    crystal.material.thickness = 0.8 + (1 - fresnelEffect) * 0.4;
                });
            }

            if (sun) {
                const pulse = 1 + Math.sin(elapsedTime * 0.8) * 0.2;
                sun.scale.set(pulse, pulse, pulse);
            }

            if (asteroidBelt) {
                asteroidBelt.children.forEach(asteroid => {
                    asteroid.rotation.x += asteroid.userData.rotationSpeed.x;
                    asteroid.rotation.y += asteroid.userData.rotationSpeed.y;
                    asteroid.rotation.z += asteroid.userData.rotationSpeed.z;
                });
            }

            if (earth) {
                earth.position.x = 250 * Math.cos(elapsedTime * 0.07);
                earth.position.z = -350 + 250 * Math.sin(elapsedTime * 0.07);
            }

            if (moon && earth) {
                moon.position.copy(earth.position);
                moon.position.x += 60 * Math.cos(elapsedTime * 0.5);
                moon.position.z += 60 * Math.sin(elapsedTime * 0.5);
            }

            if (mars) {
                mars.position.x = -180 * Math.cos(elapsedTime * 0.05);
                mars.position.z = -450 + 120 * Math.sin(elapsedTime * 0.05);
                mars.position.y = 100 * Math.sin(elapsedTime * 0.06);
            }

            if (jupiter) {
                jupiter.position.x = -450 * Math.cos(elapsedTime * 0.03);
                jupiter.position.z = -600 + 180 * Math.sin(elapsedTime * 0.03);
                jupiter.position.y = -150 * Math.cos(elapsedTime * 0.04);
            }

            if (saturn) {
                saturn.position.x = 350 * Math.cos(elapsedTime * 0.04);
                saturn.position.z = -500 + 200 * Math.sin(elapsedTime * 0.04);
                saturn.position.y = 180 * Math.sin(elapsedTime * 0.05);
            }

            if (rings && saturn) {
                rings.position.copy(saturn.position);
                rings.rotation.y = elapsedTime * 0.018;
            }

            // Animation du vaisseau spatial
            if (spaceship) {
                spaceshipRotation += deltaTime * 0.3;

                spaceship.rotation.x = Math.sin(spaceshipRotation * 0.8) * 0.3;
                spaceship.rotation.y = spaceshipRotation;
                spaceship.rotation.z = Math.cos(spaceshipRotation * 0.6) * 0.2;

                const floatHeight = Math.sin(elapsedTime * 1.5) * 30;
                spaceship.position.y = 50 + floatHeight;

                spaceship.position.x += spaceshipMoveDirection * deltaTime * 8;
                if (Math.abs(spaceship.position.x) > 250) {
                    spaceshipMoveDirection *= -1;
                }
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

            // Nettoyage des cristaux galactiques
            if (galacticCrystals) {
                galacticCrystals.children.forEach(crystal => {
                    if (crystal.geometry) crystal.geometry.dispose();
                    if (crystal.material) crystal.material.dispose();
                });
                scene.remove(galacticCrystals);
            }
        };
    }, []);

    return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ThreeBackground;