import React from 'react';
import {OrbitControls} from "@react-three/drei";
// import Model from "./Model.tsx";



const Cube: React.FC = () => {

    // const Model = () => {
    //     const gltf = useLoader(GLTFLoader, "../assets/Poimandress.gltf");
    //     return (
    //         <>
    //             <primitive object={gltf.scene} scale={0.4} />
    //         </>
    //     );
    // };
    return (
        <>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                {/*<Model/>*/}
                <meshStandardMaterial color="red" />
                <OrbitControls />
            </mesh>
        </>
    );
};

export default Cube;
