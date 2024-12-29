const axios = require("axios");
const Transaction=require('../models/transactionModel');

exports.Initialize=(req, res) => {
    axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
        .then((response) => {
            Transaction.deleteMany({}).then((success)=>{
                if(success){
                    Transaction.insertMany(response.data)
                        .then(() => {
                            res.status(200).json({ message: "Database initialized with seed data." });
                        })
                        .catch((error) => {
                            res.status(500).json({ error: error.message });
                        });
                }
            }).catch((err)=>{console.log(err)})
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};


exports.Transactioncon=(req, res) => {
    const { search = "", page = 1, perPage = 10, month } = req.query;

    if (!month) {
        return res.status(400).json({ error: "Month is required." });
    }

    const regex = new RegExp(search, "i");
    const query = {
        $and: [
            {
                $or: [
                    { title: { $regex: regex } },
                    { description: { $regex: regex } },
                    { price: { $regex: regex } },
                ]
            },
            {
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, Number(month)]
                }
            }
        ]
    };

    Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(Number(perPage))
        .then((transactions) => {
            res.status(200).json(transactions);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};


exports.Statistic=(req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: "Month is required." });
    }

    Transaction.find({
        $expr: {
            $eq: [{ $month: "$dateOfSale" }, Number(month)]
        }
    })
        .then((transactions) => {
            const totalSale = transactions.reduce((sum, item) => sum + Number(item.price), 0);
            const soldItems = transactions.filter((item) => item.sold).length;
            const unsoldItems = transactions.length - soldItems;
            res.status(200).json({
                totalSale,
                soldItems,
                unsoldItems
            });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

exports.Barchart=(req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: "Month is required." });
    }

    Transaction.find({
        $expr: {
            $eq: [{ $month: "$dateOfSale" }, Number(month)]
        }
    })
        .then((transactions) => {
            const priceRanges = {
                "0-100": 0,
                "101-200": 0,
                "201-300": 0,
                "301-400": 0,
                "401-500": 0,
                "501-600": 0,
                "601-700": 0,
                "701-800": 0,
                "801-900": 0,
                "901-above": 0
            };

            transactions.forEach((item) => {
                const price = Number(item.price);
                if (price <= 100) priceRanges["0-100"]++;
                else if (price <= 200) priceRanges["101-200"]++;
                else if (price <= 300) priceRanges["201-300"]++;
                else if (price <= 400) priceRanges["301-400"]++;
                else if (price <= 500) priceRanges["401-500"]++;
                else if (price <= 600) priceRanges["501-600"]++;
                else if (price <= 700) priceRanges["601-700"]++;
                else if (price <= 800) priceRanges["701-800"]++;
                else if (price <= 900) priceRanges["801-900"]++;
                else priceRanges["901-above"]++;
            });

            res.status(200).json(priceRanges);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};


exports.Piechart=(req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: "Month is required." });
    }

    Transaction.find({
        $expr: {
            $eq: [{ $month: "$dateOfSale" }, Number(month)]
        }
    })
        .then((transactions) => {
            const categories = {};
            transactions.forEach((item) => {
                if (!categories[item.category]) categories[item.category] = 0;
                categories[item.category]++;
            });

            res.status(200).json(categories);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};
