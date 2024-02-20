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

import {Mesh, MeshStandardMaterial} from "three";
import {useGLTF} from "@react-three/drei";

interface IModel {
    color: string
}

export default function Model({color} : IModel) {
    const gltf1 = useGLTF('./papa.gltf');
    gltf1.scene.rotation.set(1.5, 0, 0 );
        const material = new MeshStandardMaterial({ color: color });
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
        </>
    );
}