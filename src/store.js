import { configureStore } from "@reduxjs/toolkit";
import warehouseReducer from "./././WarehouseSlice";

export default configureStore({
  reducer: {
    warehouses: warehouseReducer,
  },
});
