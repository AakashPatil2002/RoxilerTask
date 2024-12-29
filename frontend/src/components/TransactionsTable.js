import React, { useState, useEffect } from "react";
import axios from "axios";

function TransactionsTable({ month }) {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/transactions", {
        params: { month, page, search },
      })
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [month, page, search]);

  return (
    <div>
        
      <h2 className="stat-heading text-center">Transactions</h2>
      <div className="col-md-6 mx-auto mb-5">
      <input
        className="form-control"
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Date of Sale</th>
            <th scope="col">Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.title}</td>
              <td>{tx.description}</td>
              <td>{tx.price}</td>
              <td>{new Date(tx.dateOfSale).toLocaleDateString()}</td>
              <td>{tx.sold ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-primary me-4" onClick={() => setPage((p) => Math.max(p - 1, 1))}>
        Previous
      </button>
      <button className="btn btn-primary" onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  );
}

export default TransactionsTable;
