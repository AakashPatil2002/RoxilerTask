const mongoose=require("mongoose");

const transactionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  dateOfSale: Date,
  sold: Boolean,
  category: String,
  image: String
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports=Transaction;