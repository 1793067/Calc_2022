import 'bootstrap/dist/css/bootstrap.min.css';
import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ConditionsStore from './store/ConditionsStore';
import CalculationStore from './store/CalculationStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Context.Provider value={{
        conditions: new ConditionsStore(),
        tableProps: new CalculationStore()
    }}>
        <App />
    </Context.Provider>
);