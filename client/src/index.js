import 'bootstrap/dist/css/bootstrap.min.css';
import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ConditionsStore from './store/ConditionsStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Context.Provider value={{
        conditions: new ConditionsStore()
    }}>
        <App />
    </Context.Provider>
);