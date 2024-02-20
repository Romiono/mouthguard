import React, {Suspense} from 'react';
import {Environment, OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import Model from "../Model.tsx";




const Cube: React.FC = () => {

    return (
        <>
            <Canvas>
                <Suspense fallback={null}>
                    <mesh>
                        <meshStandardMaterial color="red"/>
                        <Model/>
                        <OrbitControls/>
                        <Environment preset="sunset" background/>
                    </mesh>

                </Suspense>
            </Canvas>
        </>
    );
};

export default Cube;
