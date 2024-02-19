import React, { } from 'react';
import Cube from "./components/CubeScreen.tsx";
import {Canvas} from "@react-three/fiber";

const CubeScreen: React.FC = () => {
    return (
        <Canvas style={{ height: '100vh' }}>
            <Cube/>
        </Canvas>
    );
};

export default CubeScreen;
