const productModel = require("../models/product.model");
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.createProduct = async (req, res) => {
  const newProduct = new productModel({
    name: req.body.name,
    price: req.body.price,
  });

  try {
    const product = await newProduct.save();
    return res.status(201).json(product);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updateProduct = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  const updatedRecord = {
    name: req.body.name,
    price: req.body.price,
  };

  productModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur update : " + err);
    }
  );
};


module.exports.deleteProduct = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  productModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Erreur delete : " + err);
  });
};
