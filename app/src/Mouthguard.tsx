
import {Decal, useAnimations, useGLTF, useTexture} from '@react-three/drei';
import {CanvasTexture, MeshStandardMaterial} from "three";
import {useControls} from "leva";
import {useRef, useState} from "react";
import {degToRad} from "three/src/math/MathUtils.js";
// @ts-ignore
import {DecalGeometry} from "three/examples/jsm/geometries/DecalGeometry";
// @ts-ignore
import {Geometry} from "three/examples/jsm/deprecated/Geometry";

interface IModel {
    color: string;
    message: string;
}

export function MG({color, message}: IModel) {
    const group = useRef<Geometry>();
    const { nodes, animations } = useGLTF("/MG.glb");
    const { actions } = useAnimations(animations, group);

    const [pos, setPos] = useState<DecalGeometry>([0, 1, 0]);
    const [rotation, setRotation] = useState<DecalGeometry>([0,  0, 0]);
    const [scale, setScale] = useState<DecalGeometry>([1, 1, 1]);

    const [postext, setPostext] = useState<DecalGeometry>([0, 1, 0]);
    const [rotationtext, setRotationtext] = useState<DecalGeometry>([0, 0, 0]);
    const [scaletext, setScaletext] = useState<DecalGeometry>([1, 1, 1]);

    const node: Geometry = nodes["16934_athletic_mouthguard_V1"];
    useControls({
        angle: {
            min: degToRad(180),
            max:  degToRad( 360),
            value: 0,
            step: 0.01,
            onChange: (value) => {
                const x = Math.cos(value) * 3.5;
                const z = Math.sin(value) * 3.5;
                const rot = Math.atan2(x,z);
                setRotation(() => [0, rot, 0]);
                setPos(() => [x, 1, z]);
            }
        },
        angleText: {
            min: degToRad(180),
            max:  degToRad(360),
            value: 0,
            step: 0.01,
            onChange: (value) => {
                const x = Math.cos(value) * 3.5;
                const z = Math.sin(value) * 3.5;
                const rot = Math.atan2(x,z);
                setRotationtext(() => [0, rot, 0]);
                setPostext(() => [x, 1, z]);
            }
        },
        scale: {
            min: 1,
            max: 3,
            value: 1,
            step: 0.01,
            onChange: (value) => {
                setScale(() => [value, value, value])
            }
        }, scaleText: {
            min: 1,
            max: 3,
            value: 1,
            step: 0.01,
            onChange: (value) => {
                setScaletext(() => [value, value, value])
            }
        }

    })

    const material = new MeshStandardMaterial({color: color});
    const texture = useTexture('/vite.svg')

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const fontSize = 40;
    const fontFamily = "Bold Arial";

    if (context) {
        context.font = `${fontSize}px ${fontFamily}`;

        // Если message не пуст, измеряем его ширину
        const textWidth = message ? context.measureText(message).width : 0;

        // Установка размеров canvas вручную
        canvas.width = Math.max(textWidth, 1); // Минимальная ширина 1, чтобы избежать нулевой ширины
        canvas.height = fontSize;

        context.fillStyle = 'white';
        context.font = `${fontSize}px ${fontFamily}`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        // Установка прозрачности (альфа-канала) в зависимости от того, есть ли текст
        context.globalAlpha = message ? 1 : 0;

        // Отрисовка текста в центре canvas
        if (message) {
            context.fillText(message, canvas.width / 2, canvas.height / 2);
        }

        // Восстановление полной прозрачности
        context.globalAlpha = 1;
    }

// Использование canvas для создания текстуры
    const textureText = new CanvasTexture(canvas);


    return (
        <group ref={group} dispose={null}>
            <group name="Scene">
                <mesh
                    name="16934_athletic_mouthguard_V1"
                    rotation={[0, 3, 0]}
                    scale={[0.5, 0.5, 0.5]}
                    castShadow
                    receiveShadow
                    geometry={node.geometry}
                    material={material}
                    morphTargetDictionary={
                        node.morphTargetDictionary
                    }
                    morphTargetInfluences={
                        node.morphTargetInfluences
                    }
                >
                    <Decal
                        debug
                        position={pos}
                        rotation={rotation}
                        scale={scale}
                    >
                        <meshBasicMaterial

                            map={texture}
                            polygonOffset
                            polygonOffsetFactor={-1}/>
                    </Decal>
                    <Decal
                        debug
                        position={postext}
                        rotation={rotationtext}
                        scale={scaletext}
                    >
                        <meshBasicMaterial
                            map={textureText}
                            polygonOffset
                            polygonOffsetFactor={-1}
                            transparent
                        />
                    </Decal>
                </mesh>
            </group>
        </group>
    );
}

useGLTF.preload("/MG.glb");