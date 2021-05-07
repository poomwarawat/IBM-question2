import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";

function App() {
  const [initLists, setInitLists] = useState([]);
  const [showLists, setShowLists] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const res = await axios.get("https://api.publicapis.org/categories");
      const data = await res.data;
      setInitLists(data);
      setShowLists(data);
    };

    getList();
  }, []);

  const handleFilterChange = (e) => {
    let value = e.target.value;
    value = value.toLowerCase();
    const finded = initLists.filter((list) =>
      list.toLowerCase().includes(value)
    );
    setShowLists(finded);
  };
  return (
    <div className="App">
      <h3>Filter categories</h3>
      <input
        type="text"
        placeholder="typing categories"
        className="input-text"
        onChange={handleFilterChange}
      />
      <Table striped>
        <thead>
          <tr>
            <th>No</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {showLists.length > 0 &&
            showLists.map((list, index) => {
              return (
                <tr key={index + 1}>
                  <th scope="row">{index + 1}</th>
                  <td>{list}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
