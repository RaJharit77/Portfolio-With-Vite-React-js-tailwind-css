import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';

const Stars = (props) => {
    const ref = useRef();

    // Génération des positions pour les particules bleues
    const [blueSphere] = React.useState(() => {
        const positions = new Float32Array(3000 * 3);
        for (let i = 0; i < positions.length; i += 3) {
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 2.0;

            positions[i] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = radius * Math.cos(phi);
        }
        return positions;
    });

    // Génération des positions pour les particules jaunes
    const [yellowSphere] = React.useState(() => {
        const positions = new Float32Array(2000 * 3);
        for (let i = 0; i < positions.length; i += 3) {
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 1.5;

            positions[i] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = radius * Math.cos(phi);
        }
        return positions;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            {/* Particules bleues */}
            <Points
                ref={ref}
                positions={blueSphere}
                stride={3}
                frustumCulled={false}
            >
                <PointMaterial
                    transparent
                    color="#3B82F6" // Bleu vif
                    size={0.015}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={1}
                />
            </Points>

            {/* Particules jaunes */}
            <Points
                positions={yellowSphere}
                stride={3}
                frustumCulled={false}
            >
                <PointMaterial
                    transparent
                    color="#FBBF24" // Jaune vif
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={1}
                />
            </Points>
        </group>
    );
};

const ThreeBackground = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10">
            <Canvas style={{ background: '#000' }}> {/* Fond noir */}
                <Suspense fallback={null}>
                    <Stars />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;