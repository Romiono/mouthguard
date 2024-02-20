
import THREE, {Mesh, MeshStandardMaterial} from "three";
import {useGLTF} from "@react-three/drei";
import { Text } from "@react-three/drei";
import {useRef} from "react";



interface IModel {
    color: string,
    message: string
}

export default function Model({color, message} : IModel) {
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

    const meshRef = useRef<THREE.Mesh>();


    return (
        <>
            <group>
                <primitive
                    object={gltf1.scene}
                    scale={0.4}
                    castShadow={true}
                    receiveShadow={true}
                    ref={meshRef}
                />
                {message && (
                    <Text
                        position={[0, 2, 0]}
                        color="black"
                        fontSize={1}
                        maxWidth={10}
                        lineHeight={1}
                        letterSpacing={0.02}
                        textAlign="center"
                    >
                        {message}
                    </Text>
                )}
            </group>
        </>
    );
}



// import  { useRef } from "react";
// import { useGLTF } from "@react-three/drei";
// import {CanvasTexture, Mesh, MeshStandardMaterial} from "three";
//
// interface IModel {
//     color: string;
//     message: string;
// }
//
// export default function Model({ color, message }: IModel) {
//     const gltf1 = useGLTF('./papa.gltf');
//     gltf1.scene.rotation.set(1.5, 0, 0);
//
//     // Создаем текстуру из сообщения
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");
//     if (context){
//         context.font = "Bold 40px Arial";
//         context.fillStyle = color; // Используем переданный цвет для текста
//         context.fillText(message, 10, 50);
//     }
//     const texture = new CanvasTexture(canvas);
//
//     const material = new MeshStandardMaterial({ color, map: texture });
//
//     gltf1.scene.traverse((child: Mesh) => {
//         if (child.isMesh) {
//             child.material = material;
//             child.castShadow = true;
//             child.receiveShadow = true;
//         }
//     });
//
//     const meshRef = useRef<THREE.Mesh>();
//
//     return (
//         <>
//             <primitive
//                 object={gltf1.scene}
//                 scale={0.4}
//                 castShadow={true}
//                 receiveShadow={true}
//                 ref={meshRef}
//             />
//         </>
//     );
// }



