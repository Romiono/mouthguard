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
//
// import {useLoader} from "@react-three/fiber";
// import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {Mesh, MeshStandardMaterial} from "three";
import {useGLTF} from "@react-three/drei";

export default function Model() {
    // const gltf = useLoader(GLTFLoader, "./papa.gltf");
    //
    const gltf1 = useGLTF('./papa.gltf');

    //
        const material = new MeshStandardMaterial({ color: 'green' });
        gltf1.scene.traverse((child: Mesh) => {
            if (child.isMesh) {
                child.material = material;
                child.castShadow = true; // Разрешаем объекту отбрасывать тени
                child.receiveShadow = true; // Разрешаем объекту принимать тени
            }
        });
    return (
        <>
            <primitive object={gltf1.scene} scale={0.4} castShadow={true} receiveShadow={true}/>
            {/*<spotLight position={[10, 10, 10]} intensity={1} castShadow/>*/}
        </>
    );
}