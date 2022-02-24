import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./WarehouseList.module.css";

function WarehouseList() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [spaceAvailable, setspaceAvailable] = useState("");
  const [cluster, setCluster] = useState("");

  const handleName = (e) => {
    console.log(e.target.value);
    const searched = searchedWarehouses.filter((warehouse) => {
      const matched = warehouse.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      return matched ?? warehouse;
    });
    setName(e.target.value);
    console.log(searched, name);
    setsearchedWarehouses([...searched]);
  };
  const handleCity = (e) => setCity(e.target.value);
  const handleSpaceAvailable = (e) => setspaceAvailable(e.target.value);
  const handleCluster = (e) => setCluster(e.target.value);

  const warehouses = useSelector((state) => state.warehouses);
  const [searchedWarehouses, setsearchedWarehouses] = useState([...warehouses]);

  const openWarehouse = (id) => {
    navigate(`${id}`);
  };

  const handleFilter = () => {
    console.log("clicked");
    const searched = warehouses
      .filter((warehouse) => {
        const matchedCity = warehouse.city
          .toLowerCase()
          .includes(city.toLowerCase());
        return matchedCity ?? warehouse;
      })
      .filter((warehouse) => {
        const matchedCluster = warehouse.cluster
          .toLowerCase()
          .includes(cluster.toLowerCase());

        return (matchedCluster || !cluster) ?? warehouse;
      })
      .filter((warehouse) => {
        const low = spaceAvailable.split("-")[0];
        const high = spaceAvailable.split("-")[1];
        const matchedSpace =
          warehouse.space_available <= parseInt(high) &&
          warehouse.space_available >= parseInt(low);
        return (matchedSpace || !spaceAvailable) ?? warehouse;
      });
    setsearchedWarehouses([...searched]);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleName}
        value={name}
        placeholder="Search warehouse..."
      />
      <h4>Filter</h4>
      <div className={styles.filter_methods_container}>
        <select id="type" name="type" value={city} onChange={handleCity}>
          <option>City</option>
          <option value="Delhi">Delhi</option>
          <option value="Chennai">Chennai</option>
          <option value="Indore">Indore</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Guwahati">Guwahati</option>
        </select>
        <select
          id="cluster"
          name="cluster"
          value={cluster}
          onChange={handleCluster}
        >
          <option>Cluster</option>
          <option value="cluster-a-1">cluster-a-1</option>
          <option value="cluster-a-2">cluster-a-2</option>
          <option value="cluster-a-21">cluster-a-21</option>
          <option value="cluster-a-32">cluster-a-32</option>
          <option value="cluster-v-2">cluster-v-2</option>
        </select>
        <select
          id="space"
          name="space"
          onChange={handleSpaceAvailable}
          value={spaceAvailable}
        >
          <option>Space available</option>
          <option value={"0-100"}>0-100</option>
          <option value={"100-500"}>100-500</option>
          <option value={"500-1000"}>500-1000</option>
          <option value={"1000-1500"}>1000-1500</option>
          <option value={"1500-2000"}>1500-2000</option>
        </select>
        <input type="button" value="Filter" onClick={handleFilter} />
      </div>
      <h4>Warehouses</h4>
      {searchedWarehouses.map((warehouse) => {
        return (
          <div
            className={styles.card}
            key={warehouse.id}
            onClick={() => openWarehouse(warehouse.id)}
          >
            <div className={styles.card_container}>
              <p className={styles.warehouse_name}>{warehouse.name}</p>
              <div className={styles.subtitle}>
                <p>
                  City: <b>{warehouse.city}</b>
                </p>
                <p>
                  Space available: <b>{warehouse.space_available}</b>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WarehouseList;
