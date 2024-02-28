import {Decal, useAnimations, useGLTF, useTexture} from '@react-three/drei';
import {CanvasTexture, MeshStandardMaterial} from "three";
import {useControls} from "leva";
import {useEffect, useRef, useState} from "react";
import {degToRad} from "three/src/math/MathUtils.js";
// @ts-ignore
import {DecalGeometry} from "three/examples/jsm/geometries/DecalGeometry";
// @ts-ignore
import {Geometry} from "three/examples/jsm/deprecated/Geometry";

interface IModel {
    color: string;
    message: string;
    isAnimationEnabled: boolean;
}

export function MG({color, message, isAnimationEnabled}: IModel) {
    const group = useRef<Geometry>();
    const {nodes, animations} = useGLTF("/MG.glb");
    const {actions, names} = useAnimations(animations, group);

    const [pos, setPos] = useState<DecalGeometry>([0, 1, 0]);
    const [rotation, setRotation] = useState<DecalGeometry>([0, 0, 0]);
    const [scale, setScale] = useState<DecalGeometry>([1, 1, 1]);

    const [postext, setPostext] = useState<DecalGeometry>([0, 1, 0]);
    const [rotationtext, setRotationtext] = useState<DecalGeometry>([0, 0, 0]);
    const [scaletext, setScaletext] = useState<DecalGeometry>([1, 1, 1]);

    const node: Geometry = nodes["16934_athletic_mouthguard_V1"];
    // const [animationTime, setAnimationTime] = useState(0);

    useEffect(() => {
        const action = actions[names[0]];
        if (isAnimationEnabled){
            if(action){
                action.timeScale = 1
                action.clampWhenFinished = true;
                action.repetitions = 1
                action.reset().play();
            }
        }
        else {
            if (action){
                action.timeScale = -1;
                action.clampWhenFinished = true;
                action.repetitions = 1;
                action?.reset().play();
            }
        }
    }, [isAnimationEnabled]);


    useControls({
        angle: {
            min: degToRad(180),
            max: degToRad(360),
            value: 0,
            step: 0.01,
            onChange: (value) => {
                const x = Math.cos(value) * 3.5;
                const z = Math.sin(value) * 3.5;
                const rot = Math.atan2(x, z);
                setRotation(() => [0, rot, 0]);
                setPos(() => [x, 1, z]);
            }
        },
        angleText: {
            min: degToRad(180),
            max: degToRad(360),
            value: 0,
            step: 0.01,
            onChange: (value) => {
                const x = Math.cos(value) * 3.5;
                const z = Math.sin(value) * 3.5;
                const rot = Math.atan2(x, z);
                setRotationtext(() => [0, rot, 0]);
                setPostext(() => [x, 1, z]);
            }
        },
        scale: {
            min: 0,
            max: 3,
            value: 1,
            step: 0.01,
            onChange: (value) => {
                setScale(() => [value, value, value])
            }
        }, scaleText: {
            min: 0,
            max: 3,
            value: 1,
            step: 0.01,
            onChange: (value) => {
                setScaletext(() => [value * 3, value, value])
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

        canvas.width = Math.max(230, 1);
        canvas.height = fontSize;

        context.fillStyle = 'white';
        context.font = `${fontSize}px ${fontFamily}`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        context.globalAlpha = message ? 1 : 0;

        if (message) {
            // Center the text horizontally and vertically
            const x = canvas.width / 2;
            const y = canvas.height / 2;
            context.fillText(message, x, y);
        }
        context.globalAlpha = 1;
    }

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