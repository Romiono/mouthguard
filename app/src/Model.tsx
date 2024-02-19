// import { useRef } from "react";
// import { useGLTF } from "@react-three/drei";
//
// export default function Model() {
//     const group = useRef();
//     const { nodes, materials } = useGLTF("/Poimandres.gltf");
//     return (
//         <group ref={group} dispose={null} scale={0.4}>
//             <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Curve007_1.geometry}
//                 material={materials["Material.001"]}
//             />
//             <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Curve007_2.geometry}
//                 material={materials["Material.002"]}
//             />
//         </group>
//     );
// }
//
// useGLTF.preload("/Poimandres.gltf");

import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
// import {MeshBasicMaterial} from "three";

export default function Model() {
    // @ts-ignore
    const gltf = useLoader(GLTFLoader, "./papa.gltf");
    // const material = new MeshBasicMaterial({ color: '' });
    // gltf.scene.traverse((child:any) => {
    //     if (child.isMesh) {
    //         child.material = material;
    //     }
    // });
    return (
        <>
            <primitive object={gltf.scene} scale={0.4} />
        </>
    );
};