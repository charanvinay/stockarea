import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { warehouseUpdated } from "../WarehouseSlice";
import styles from "./WarehouseDetails.module.css";

function WarehouseDetails() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const naviagate = useNavigate();
  const warehouseId = parseInt(pathname.split("/")[1]);

  const warehouse = useSelector((state) =>
    state.warehouses.find((warehouse) => warehouse.id === warehouseId)
  );

  // const [name, setName] = useState("");
  // const [code, setCode] = useState("");
  // const [city, setCity] = useState("");
  // const [spaceAvailable, setspaceAvailable] = useState(null);
  // const [type, setType] = useState("");
  // const [cluster, setCluster] = useState("");
  // const [isRegistered, setisRegistered] = useState(false);
  // const [isLive, setisLive] = useState(false);
  // const [error, setError] = useState(null);

  const [name, setName] = useState(warehouse.name);
  const [code, setCode] = useState(warehouse.code);
  const [city, setCity] = useState(warehouse.city);
  const [spaceAvailable, setspaceAvailable] = useState(
    warehouse.space_available
  );
  const [type, setType] = useState(warehouse.type);
  const [cluster, setCluster] = useState(warehouse.cluster);
  const [isRegistered, setisRegistered] = useState(warehouse.is_registered);
  const [isLive, setisLive] = useState(warehouse.is_live);

  const handleName = (e) => setName(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleSpaceAvailable = (e) =>
    setspaceAvailable(parseInt(e.target.value));
  const handleType = (e) => setType(e.target.value);
  const handleCluster = (e) => setCluster(e.target.value);
  const handleIsRegistered = (e) => {
    console.log(e.target.value);
    setisRegistered(e.target.value === "true" ? true : false);
  };
  const handleIsLive = (e) =>
    setisLive(e.target.value === "true" ? true : false);

  const handleSave = (e) => {
    e.preventDefault();
    console.log(
      warehouse.id,
      name,
      code,
      city,
      spaceAvailable,
      type,
      cluster,
      isRegistered,
      isLive
    );
    if (
      name &&
      code &&
      city &&
      spaceAvailable &&
      type &&
      cluster
      // isRegistered &&
      // isLive
    ) {
      console.log("Success");
      dispatch(
        warehouseUpdated({
          id: warehouseId,
          name,
          code,
          city,
          spaceAvailable,
          type,
          cluster,
          isRegistered,
          isLive,
        })
      );
      console.log("Success");
      naviagate(`${"/"}`);
      console.log("Success");
      setName("");
      setCode("");
      setCity("");
      setspaceAvailable(null);
      setType("");
      setCluster("");
      setisRegistered(false);
      setisLive(false);
    } else {
      alert("Fill in all fields");
    }

    console.log(warehouse);
  };
  return (
    <div className={styles.container}>
      <div className={styles.close_container}>
        <p className={styles.close} onClick={() => naviagate(`${"/"}`)}>
          &#10006;
        </p>
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSave}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleName}
            value={name}
            placeholder="Warehouse name"
          />
          <label htmlFor="city">City</label>
          {/* <input
            type="text"
            id="city"
            name="city"
            onChange={handleCity}
            value={city}
            placeholder="Warehouse City"
          /> */}
          <select id="city" name="city" value={city} onChange={handleCity}>
            <option>Select</option>
            <option value="Delhi">Delhi</option>
            <option value="Chennai">Chennai</option>
            <option value="Indore">Indore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Guwahati">Guwahati</option>
          </select>
          <br />
          <br />
          <label htmlFor="space_available">Space available</label>
          <input
            type="text"
            id="space_available"
            name="space_available"
            onChange={handleSpaceAvailable}
            value={spaceAvailable}
            placeholder="Warehouse space available"
          />
          <label htmlFor="type">Type</label>
          <select id="type" name="type" value={type} onChange={handleType}>
            <option>Select</option>
            <option value="Warehouse Service">Warehouse Service</option>
            <option value="Leasable Space">Leasable Space</option>
          </select>
          <br />
          <br />
          <label htmlFor="cluster">Cluster</label>
          <select
            id="cluster"
            name="cluster"
            value={cluster}
            onChange={handleCluster}
          >
            <option>Select</option>
            <option value="cluster-a-1">cluster-a-1</option>
            <option value="cluster-a-2">cluster-a-2</option>
            <option value="cluster-a-21">cluster-a-21</option>
            <option value="cluster-a-32">cluster-a-32</option>
            <option value="cluster-v-2">cluster-v-2</option>
          </select>
          <br />
          <br />

          <div style={{ display: "flex", marginBottom: "20px" }}>
            Is registered?
            <input
              type="radio"
              id="is_registered_true"
              name="is_registered_true"
              value={true}
              checked={isRegistered}
              onChange={handleIsRegistered}
            />
            <label htmlFor="is_registered_true">True</label>
            <input
              type="radio"
              id="is_registered_false"
              name="is_registered_true"
              value={false}
              checked={!isRegistered}
              onChange={handleIsRegistered}
            />
            <label htmlFor="is_registered_false">False</label>
          </div>
          <div style={{ display: "flex" }}>
            Is live?
            <input
              type="radio"
              id="is_live_true"
              name="is_live_true"
              value={true}
              checked={isLive}
              onChange={handleIsLive}
            />
            <label htmlFor="is_live_true">True</label>
            <input
              type="radio"
              id="is_live_false"
              name="is_live_true"
              value={false}
              checked={!isLive}
              onChange={handleIsLive}
            />
            <label htmlFor="is_live_false">False</label>
          </div>
          <br />
          <div className={styles.btn_container}>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default WarehouseDetails;
