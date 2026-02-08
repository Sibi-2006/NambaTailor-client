import { BrowserRouter , Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GlobalVariableProvider } from "./Context/GlobalContext";
import HomePage from "./Components/HomePage";
import Nav from "./Components/Nav";
import AddClient from "./Components/AddClient";
import Login from "./Components/Login";
import SearchClient from "./Components/SearchClient";
import OneClientData from "./Components/OneClientData";
import ShirtMeasurement from "./Components/ShirtMeasurement";
import PantsMeasurement from "./Components/PantsMeasurement";
import ChuridarMeasurements from "./Components/ChuridarMeasurements";
import KurthiMeasurements from "./Components/KurthiMeasurements";
import DeleteOneClient from "./Components/DeleteOneClient";

function App() {
  return (
    <div>
      <GlobalVariableProvider>
        <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
          <Nav/>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/add-new-client" element={<AddClient/>}/>
            <Route path="/search-client" element={<SearchClient/>}/>
            <Route path="/one-client/data/:id" element={<OneClientData/>} />

            {/* delete client */}
            <Route path="/delete/client/:id/:cId" element={<DeleteOneClient/>}/>

            {/* for male dress */}
            <Route path="/add-shirt-measurement/:id/:usedFor" element={<ShirtMeasurement/>}/>
            <Route path="/add-pant-measurement/:id/:usedFor" element={<PantsMeasurement/>}/>

            {/* for female dress */}
            <Route path="/add-chudi-measurement/:id/:usedFor" element={<ChuridarMeasurements/>}/>
            <Route path="/add-kurti-measurement/:id/:usedFor" element={<KurthiMeasurements/>}/>
          </Routes>
        </BrowserRouter>
      </GlobalVariableProvider>
      
    </div>
  );
}
export default App;
