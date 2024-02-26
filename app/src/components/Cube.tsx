import React, {ChangeEvent, Suspense,  useState} from 'react';
import {Environment, OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import '../App.css';
// import {Capa} from "../Capa.tsx";
import {MG} from "../Mouthguard.tsx";





const Cube: React.FC = () => {
    const [color, setColor] = useState('green');
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
                        <MG color={color} message={messege}/>
                        {/*<Capa color={color} message={messege}/>*/}
                        <OrbitControls enablePan={false} />
                        <Environment preset="sunset" background/>
                    </mesh>
                </Suspense>
            </Canvas>
        </>
    );
};

export default Cube;
