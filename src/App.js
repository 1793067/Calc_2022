import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NaviBar from './components/NaviBar';

function App() {
  return (
    <BrowserRouter>
      <div className="fixed-top top"><NaviBar /></div>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

