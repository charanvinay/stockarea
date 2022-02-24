import { Route, Routes } from "react-router-dom";
import "./App.css";
import WarehouseDetails from "./WarehouseDetails/WarehouseDetails";
import WarehouseList from "./WarehouseList/WarehouseList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WarehouseList />} />
        <Route path="/:id" element={<WarehouseDetails />} />
      </Routes>
    </div>
  );
}

export default App;
