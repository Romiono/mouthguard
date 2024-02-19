import React, {Suspense} from 'react';
import Cube from "./components/Cube.tsx";
import {Canvas} from "@react-three/fiber";
import {Environment} from "@react-three/drei";
import { Html, useProgress } from '@react-three/drei'


const App: React.FC = () => {

    function Loader() {
        const { progress } = useProgress()
        return <Html center>{progress} % loaded</Html>
    }
    return (
        <Canvas style={{height: '100vh'}}>
            <Suspense fallback={<Loader/>}>
                <Cube/>
                <Environment preset="sunset" background />
            </Suspense>
        </Canvas>
    );
};

export default App;

// import { Canvas } from "@react-three/fiber";
// import { useLoader } from "@react-three/fiber";
// import { Environment, OrbitControls } from "@react-three/drei";
// import  { Suspense } from "react";
// import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
//
// const Model = () => {
//     const gltf = useLoader(GLTFLoader, "../assets/Poimandress.gltf");
//     return (
//         <>
//             <primitive object={gltf.scene} scale={0.4} />
//         </>
//     );
// };
//
// export default function App() {
//     return (
//         <div className="App">
//             <Canvas style={{width: 1000, height: 1000}}>
//                 <Suspense fallback={null}>
//                     <Model.tsx/>
//                     <OrbitControls />
//                     <Environment preset="sunset" background />
//                 </Suspense>
//             </Canvas>
//         </div>
//     );
// }