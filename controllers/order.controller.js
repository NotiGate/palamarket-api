const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");
const ObjectID = require("mongoose").Types.ObjectId;
const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config({path: "./config/.env"});

client.login(process.env.BOT_TOKEN);

client.once('ready', () => {
  console.log("PalaMarket bot started !");
});

module.exports.createOrder = async (req, res) => {

  let price_article_raw = 0;
  let price_article_raw2 = 0;
  let price_article_raw3 = 0;
  let price_article = 0;

  await productModel.find({ name: req.body.article }, {price:1} ,function (err, data) {
    if (err) {
      console.log(err);
    }
      try {
        price_article_raw = data
        price_article_raw = price_article_raw + ""
        price_article_raw2 = price_article_raw.split(':');
        price_article_raw2 = price_article_raw2 + ""
        price_article_raw3 = price_article_raw2.split(' ')
        try {
          price_article = price_article_raw3[4]
        }catch(e) {
          console.log(e)
        }
      } catch(e) {
        console.log("Saving error : " + e)
      }    
  });  


  const newOrder = new orderModel({
    pseudo: req.body.pseudo,
    article: req.body.article,
    quantity: req.body.quantity,
    price: price_article * req.body.quantity,
  });

  try {
    const order = await newOrder.save();
    client.channels.cache.get("917117047979270156").send(`New order : \n ID : ${order._id} \n Il faut : ${order.quantity} ${order.article}`)
    return res.status(201).json(order);
  } catch (err) {
    return res.status(400).send(err);
  }
};


module.exports.farmOrder = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  let ifpayed = false;

  await orderModel.findById(
    req.params.id,
    (err, docs) => {
        try {
          ifpayed = docs.payed
        }catch(e) {
          console.log(e)
        }
    }
  )

  if(ifpayed == false) {
    return res.status(400).send("La commmande doit être payée avant que son état sois modifiée !");
  }

  const updatedRecord = {
    track: "Vos ressources sont entrain d'être farmées.",
    manager: req.body.manager,
  };

  orderModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur update : " + err);
    }
  );
};

module.exports.readyOrder = async(req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  let ifpayed = false;

  await orderModel.findById(
    req.params.id,
    (err, docs) => {
        try {
          ifpayed = docs.payed
        }catch(e) {
          console.log(e)
        }
    }
  )

  if(ifpayed == false) {
    return res.status(400).send("La commmande doit être payée avant que son état sois modifiée !");
  }

  const updatedRecord = {
    track: "Vos ressources sont prêtes à être livrée.",
    manager: req.body.manager,
  };

  orderModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur update : " + err);
    }
  );
};

module.exports.deliveryOrder = async(req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  let ifpayed = false;

  await orderModel.findById(
    req.params.id,
    (err, docs) => {
        try {
          ifpayed = docs.ready
        }catch(e) {
          console.log(e)
        }
    }
  )

  if(ifpayed == false) {
    return res.status(400).send("La commmande doit être prête avant qu'elle sois livrée !");
  }

  const updatedRecord = {
    track: "Vos ressources sont en livraison.",
    manager: req.body.manager,
  };

  orderModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur update : " + err);
    }
  );
};

module.exports.deliveredOrder = async(req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  let ifpayed = false;

  await orderModel.findById(
    req.params.id,
    (err, docs) => {
        try {
          ifpayed = docs.ready
        }catch(e) {
          console.log(e)
        }
    }
  )

  if(ifpayed == false) {
    return res.status(400).send("La commmande doit être prête avant qu'elle sois livrée !");
  }

  const updatedRecord = {
    track: "Vos ressources ont été livrés.",
    manager: req.body.manager,
    delivered: true,
  };

  orderModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Erreur update : " + err);
    }
  );
};

module.exports.deleteOrder = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  orderModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Erreur delete : " + err);
  });
};

module.exports.payementOrder = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknow : " + req.params.id);
  }

  if(req.body.password != process.env.ADMIN_PASS) {
    return res.status(400).send("Le mot de passe est invalide");
  }

  try {
    const updatedOrder = {
      payed: true,
    };
    await orderModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedOrder },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Erreur update : " + err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
