import React, {ChangeEvent, Suspense, useRef, useState} from 'react';
import {Environment, OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import '../App.css';
import {MG} from "../Mouthguard.tsx";

const Cube: React.FC = () => {
    const [color, setColor] = useState('green');
    const [messege, setMessege] = useState('');
    const [checked, setChecked] = useState(false);
    const orbitControlsRef = useRef(null);

    const handleColor = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setColor(e.target.value);
        }
    }

    const handleMessege = (e: ChangeEvent<HTMLInputElement>) => {
        setMessege(e.target.value);
        console.log(messege)
    }

    const handleChecked = () => {
        setChecked(!checked);
    }

        return (
            <>
                <div>
                    <form className={'form'}>
                        <p style={{marginBottom: '10px'}}>Выберите цвет</p>
                        <div style={{display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px'}}>
                            <p><input name="dzen" type="radio" value="green" onChange={handleColor}/> зеленный</p>
                            <p><input name="dzen" type="radio" value="red" onChange={handleColor}/> красный</p>
                            <p><input name="dzen" type="radio" value="grey" onChange={handleColor}/> серый</p>
                        </div>
                        <p style={{marginBottom: '10px'}}>нанести надпись</p>
                        <input onChange={handleMessege} placeholder={'введите желаемое слово'}/>
                        <p>Стабилизаторы</p>
                        <input type={"checkbox"} onChange={handleChecked}/>
                        <p>повороты</p>
                        <button> 90 градусов</button>
                    </form>
                </div>
                <Canvas>
                    <Suspense fallback={null}>
                        <group>
                            <mesh>
                                <meshStandardMaterial color="red"/>
                                <MG color={color} message={messege} isAnimationEnabled={checked}/>
                                <OrbitControls
                                    ref={orbitControlsRef}
                                    enablePan={false}
                                    enableZoom={false}/>
                                <Environment preset="sunset" background/>
                            </mesh>
                        </group>

                    </Suspense>
                </Canvas>
            </>
        );

};

export default Cube;
