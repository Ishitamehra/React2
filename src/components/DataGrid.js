import React, { useState, useEffect } from "react";
import {
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import jsonData from "../data/data.json";

const DataGrid = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    setData(jsonData);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (columnName) => {
    if (sortBy === columnName) {
      setData([...data].reverse());
    } else {
      const sortedData = [...data].sort((a, b) =>
        a[columnName] > b[columnName] ? 1 : -1
      );
      setData(sortedData);
      setSortBy(columnName);
    }
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <TextField
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell onClick={() => handleSort("id")}>ID</TableCell>
            <TableCell onClick={() => handleSort("customer")}>
              Customer
            </TableCell>
            <TableCell onClick={() => handleSort("lastSeen")}>
              Last Seen
            </TableCell>
            <TableCell onClick={() => handleSort("orders")}>Orders</TableCell>
            <TableCell onClick={() => handleSort("totalSpent")}>
              Total Spent
            </TableCell>
            <TableCell onClick={() => handleSort("latestPurchase")}>
              Latest Purchase
            </TableCell>
            <TableCell onClick={() => handleSort("news")}>News</TableCell>
            <TableCell onClick={() => handleSort("segments")}>
              Segments
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.customer}</TableCell>
              <TableCell>{item.lastSeen}</TableCell>
              <TableCell>{item.orders}</TableCell>
              <TableCell>{item.totalSpent}</TableCell>
              <TableCell>{item.latestPurchase}</TableCell>
              <TableCell>{item.news ? "✔️" : "❌"}</TableCell>
              <TableCell>{item.segments.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataGrid;
