import React, {ChangeEvent, Suspense, useRef, useState} from 'react';
import {Environment, OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import '../App.css';
import {MG} from "../Mouthguard.tsx";
import vite from '../../public/vite.svg';
import react from '../assets/react.svg';

const Cube: React.FC = () => {
    const [color, setColor] = useState('green');
    const [messege, setMessege] = useState('');
    const [checked, setChecked] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(vite);
    const [cost, setCost] = useState(5000);
    const [isMessage, setIsMessage] = useState(false)
    const orbitControlsRef = useRef(null);

    const handleColor = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setColor(e.target.value);
        }
    }

    const handleMessege = (e: ChangeEvent<HTMLInputElement>) => {
        setMessege(e.target.value);
    }

    const handleIsMessege = () => {
        setIsMessage(!isMessage)
        setCost(!isMessage ? cost + 1000 : cost - 1000);

    }

    const handleChecked = () => {
        setChecked(!checked);
        setCost(!checked ? cost + 3000 : cost - 3000);
    }
    const handleIsImage = () => {
        setIsImage(!isImage);
        setCost(!isImage ? cost + 1000 : cost - 1000);
    }

    const handleChangeImage = (e: React.MouseEvent<HTMLImageElement>) => {
        setImage(e.currentTarget.src);
        console.log(image);
    };

    return (
        <>
            <div>
                <form className={'form'}>
                    <div>
                        <p style={{marginBottom: '10px'}}>Выберите цвет</p>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
                            <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px'}}><input name="dzen" type="radio" value="green" onChange={handleColor}/> зеленный</p>
                            <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px'}}><input name="dzen" type="radio" value="red" onChange={handleColor}/> красный</p>
                            <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px'}}><input name="dzen" type="radio" value="grey" onChange={handleColor}/> серый</p>
                        </div>
                    </div>
                    <div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <p>Нанести картинку:</p>
                            <input type={"checkbox"} onChange={handleIsImage}/>
                        </div>
                        <img onClick={handleChangeImage} src={vite} alt={'vite'}/>
                        <img onClick={handleChangeImage} src={react} alt={'react'}/>
                    </div>
                    <div style={{width: '100%'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <p>нанести надпись: </p>
                            <input type={"checkbox"} onChange={handleIsMessege}/>
                        </div>
                        <input className={'styled-input'} onChange={handleMessege} placeholder={'введите желаемое слово'}/>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <p>Стабилизаторы:</p>
                        <input type={"checkbox"} onChange={handleChecked}/>
                    </div>
                    <div>
                        <h3>Цена: {cost}</h3>
                    </div>
                </form>
            </div>
            <Canvas style={{width: '70vw', position: "absolute", right: '0'}}>
                <Suspense fallback={null}>
                    <group>
                        <mesh>
                            <meshStandardMaterial color="red"/>
                            <MG color={color} message={messege} isAnimationEnabled={checked} isImage={isImage} image={image} isMessage={isMessage}/>
                            <OrbitControls
                                ref={orbitControlsRef}
                                enablePan={false}
                                enableZoom={false}/>
                            <Environment preset="apartment" background={false}/>
                        </mesh>
                    </group>

                </Suspense>
            </Canvas>
        </>
    );

};

export default Cube;
