
import {Decal, useGLTF, useTexture} from '@react-three/drei';
import {CanvasTexture, MeshStandardMaterial} from "three";
import {useControls} from "leva";
import {useState} from "react";
import {degToRad} from "three/src/math/MathUtils.js";
// @ts-ignore
import {DecalGeometry} from "three/examples/jsm/geometries/DecalGeometry";
// @ts-ignore
import {Geometry} from "three/examples/jsm/deprecated/Geometry";

interface IModel {
    color: string;
    message: string;
}



export function Capa({color, message}: IModel) {
    const node: Geometry = useGLTF('/capa.glb');
    const [pos, setPos] = useState<DecalGeometry>([-2, 3, 1]);
    const [rotation, setRotation] = useState<DecalGeometry>([0,  Math.PI/2, 3.2]);

    const [postext, setPostext] = useState<DecalGeometry>([-2, 3, 1]);
    const [rotationtext, setRotationtext] = useState<DecalGeometry>([0,  Math.PI/2, 3.2]);

    useControls({
        angle: {
            min: degToRad(0),
            max:  degToRad(180),
            value: 0,
            step: 0.01,
            onChange: (value) => {
                const x = Math.cos(value) * 3;
                const z = Math.sin(value) * 3;
                const rot = Math.atan2(x,z);
                setRotation((rotation: DecalGeometry) => [rotation[0], rotation[1], rot]);
                setPos((pos: DecalGeometry) => [x, z, pos[2]]);
            }
        },
        angleText: {
            min: degToRad(0),
            max:  degToRad(180),
            value: 0,
            step: 0.01,
            onChange: (value) => {
                const x = Math.cos(value) * 3;
                const z = Math.sin(value) * 3;
                const rot = Math.atan2(x,z);
                setRotationtext((rotationtext: DecalGeometry) => [rotationtext[0], rotationtext[1], rot]);
                setPostext((postext: DecalGeometry) => [x, z, postext[2]]);
            }
        }

    })

    const material = new MeshStandardMaterial({color: color});
    const texture = useTexture('/vite.svg')

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
        context.font = "Bold 40px Arial";
        context.fillStyle = 'white'; //
        context.textAlign = 'center';
        context.fillText(message, 10, 50);
    }
    const textureText = new CanvasTexture(canvas);

    return (
        <group dispose={null}>
            <mesh geometry={node.nodes['16934_athletic_mouthguard'].geometry} material={material} rotation={[1.57,0,0]}  scale={[0.5, 0.5, 0.5]}>
                <Decal
                    debug
                    position={pos}
                    rotation={rotation}
                    scale={[1, 1, 1]}
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
                    scale={[1, 1, 1]}
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
    )
}

useGLTF.preload('/capa.glb')
