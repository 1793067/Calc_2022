
import List from '../components/List';
import CalcTable from '../components/Table';
import Conditions from '../components/Conditions';


const Home = () => {
    return (
        <>
                <div className="left">
                    <List />
                    <br/>
                    <Conditions />
                </div>
            <div className="right"><CalcTable /></div>
        </>
        
    );
};

export default Home;