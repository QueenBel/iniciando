const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var Product = require("../../../database/collections/../../database/collections/product");

router.get("/producto", (req, res, next) => {
  var r=[];
  Product.find()
    .select("name price _id")
    .exec()
    .then(docs => {
      var suma=0;
      //var r=[];
      docs.forEach((doc)=>{
        r.push(doc.price);
      })
      console.log(r);
      for (var i = 0; i < r.length; i++) {
//        r[i];
        suma=r[i]+suma
      }
      const response = {
        products: docs.map((doc, i)=> {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id
          };
        }),
        total:suma
      };
      const response1 = {
        count: 'docs.price',
        products: docs.map((doc, i)=> {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id
          };
        }),
        total:8
      };
      res.status(200).json({lab:response,
      cuest:response1});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/producto", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
            name: result.name,
            price: result.price,
            _id: result._id,
            request: {
                type: 'GET',
                url: "http://localhost:3000/products/" + result._id
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/pruducto/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/producto/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Product updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/products/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("producto/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Product deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/products',
              body: { name: 'String', price: 'Number' }
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
