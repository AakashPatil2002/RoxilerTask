const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/main-routes");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/transactionsDB").then(() => {
    console.log("mongodb connected to database successfully");
});


app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
