import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NaviBar from "./components/NaviBar";

function App() {
  return (
    //Calc_2022 - название репо на github
    <BrowserRouter basename="/Calc_2022">
      <div className="fixed-top top">
        <NaviBar />
      </div>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
