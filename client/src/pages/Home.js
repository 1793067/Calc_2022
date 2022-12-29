import React, {createContext} from 'react';
import List from '../components/List';
import CalcTable from '../components/Table';
import Conditions from '../components/Conditions';

export const CalcContext = createContext(null);

const Home = () => {
    return (
        <>
            <div className="left" >
                <List />
                <br/>
                <Conditions />
            </div>
            <div className="right"><CalcTable /></div>
        </>
            
    );
};

export default Home;