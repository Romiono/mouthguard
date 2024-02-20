import React, {ChangeEvent, Suspense,  useState} from 'react';
import {Environment, OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import Model from "../Model.tsx";
import '../App.css';




const Cube: React.FC = () => {
    const [color, setColor] = useState('white');
    const [messege, setMessege] = useState('');


    const handleColor = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked) {
            setColor(e.target.value);
        }
    }

    const handleMessege = (e:ChangeEvent<HTMLInputElement>) => {
            setMessege(e.target.value);
            console.log(messege)
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
                </form>
            </div>
            <Canvas>
            <Suspense fallback={null}>
                    <mesh>
                        <meshStandardMaterial color="red"/>
                        <Model color={color} message={messege}/>
                        <OrbitControls enablePan={false} enableZoom={false}/>
                        <Environment preset="sunset" background/>
                        {/*<spotLight position={[10, 10, 10]} int   ensity={1} castShadow/>*/}
                        {/*<spotLight position={[-10, -10, 0]} intensity={1} castShadow/>*/}
                    </mesh>
                </Suspense>
            </Canvas>
        </>
    );
};

export default Cube;
