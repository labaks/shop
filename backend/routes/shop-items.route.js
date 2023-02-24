const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../database/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const dbName = "shop";
const shopItems = "shop-items";


// This section will help you get a list of all the records.
recordRoutes.route("/shop-items").get(function (req, res) {
    let db_connect = dbo.getDb(dbName);
    db_connect
        .collection(shopItems)
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single record by id
recordRoutes.route("/shop-items/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection(shopItems)
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
recordRoutes.route("/shop-items/add-item").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        img: req.body.img,
        price: req.body.price,
        description: req.body.description
    };
    db_connect.collection(shopItems).insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you update a record by id.
recordRoutes.route("/shop-items/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            img: req.body.img,
            price: req.body.price,
            description: req.body.description
        },
    };
    db_connect
        .collection(shopItems)
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 item updated");
            response.json(res);
        });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection(shopItems).deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 item deleted");
        response.json(obj);
    });
});

module.exports = recordRoutes;