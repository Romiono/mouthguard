import React, { useRef } from 'react';
import { Mesh } from 'three';
import {useFrame} from "@react-three/fiber";
// import {useGLTF} from "@react-three/drei";


const Cube: React.FC = () => {
    // const {nodes, materials} = useGLTF('../assets/obj.obj');

    const cubeRef = useRef<Mesh>();

    // Используйте useFrame для анимации
    useFrame(() => {
        if (cubeRef.current) {
            cubeRef.current.rotation.x += 0.01;
            cubeRef.current.rotation.y += 0.01;
        }
    }, );
    return (
        <>
            <mesh ref={cubeRef}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="red" />
                {/*<primitive object={nodes}></primitive>*/}
            </mesh>

            {/*<OrbitControls />*/}

        </>
    );
};

export default Cube;
