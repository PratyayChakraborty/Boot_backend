const express = require("express");
const { servicesModel } = require("../Model/Services.Model");
const ServicesRoutes = express.Router();

ServicesRoutes.get("/", async (req, res) => {
  const payload = req.body;
  try {
    const product = await servicesModel.find();
    console.log(product);
    res.send({ data: product, total: product.length });
  } catch (error) {
    console.log(error, error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});
ServicesRoutes.get("/:id", async (req, res) => {
  const payload = req.body;
  console.log(req.params.id);
  try {
    const product = await servicesModel.findById({ _id: req.params.id });
    console.log(product);
    res.send({ data: product });
  } catch (error) {
    console.log(error, error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

ServicesRoutes.get("/alltypes/:id", async (req, res) => {
  const payload = req.body;
  const Id = req.headers.Id;
  console.log(req.params.id);
  try {
    const product = await servicesModel.findById({ _id: req.params.id });
    product.alltypes.map((el) => {
      if (el._id == "644cfd4ed7b791b631a73b0b") {
        console.log(el);
      }
    });
    // res.send({ data: val });
  } catch (error) {
    console.log(error, error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

ServicesRoutes.post("/add", async (req, res) => {
  const payload = req.body;

  let payload1 = {
    subservices: payload.alltypes[0].subservices,
    days: payload.alltypes[0].days,
    minPrice: payload.alltypes[0].minPrice,
    maxPrices: payload.alltypes[0].maxPrices,
    minorder: payload.alltypes[0].minorder,
    maxorder: payload.alltypes[0].maxorder,
    likes: payload.alltypes[0].likes,
    likesPrices: payload.alltypes[0].likesPrices,
    averageTime: payload.alltypes[0].averageTime,
    startTime: payload.alltypes[0].startTime,
    speed: payload.alltypes[0].speed,
    refill: payload.alltypes[0].refill,
    quality: payload.alltypes[0].quality,
    props: payload.alltypes[0].props,
    Instructions: payload.alltypes[0].Instructions,
  };

  try {
    const data = await servicesModel.findOne({ services: payload.services });
    if (!data) {
      const hotel = new servicesModel(payload);
      await hotel.save();
      res.send({ msg: "Data is Added " });
    } else {
      data.alltypes.push(payload1);
      await data.save();
      // do something with the updated data, such as saving it to a database
      res.send("Data added successfully");
    }
  } catch (error) {
    res.status(400).send({ msg: "something went wrong", error });
    console.log(error);
  }
});

// ServicesRoutes.patch(/update/:id, async (req, res) => {
//   const Id = req.params.id;
//   const payload = req.body;

//   const hotel = await servicesModel.findOne({ _id: Id });

//   const hotelId = hotel.created_by;
//   console.log(hotelId);
//   const userId_making_req = req.body.created_by;
//   try {
//     if (userId_making_req !== hotelId) {
//       res.send({ msg: You are not authorized });
//     } else {
//       await servicesModel.findByIdAndUpdate({ _id: Id }, payload);
//       res.send({ msg: updated Sucessfully });
//     }
//   } catch (err) {
//     console.log(err);
//     res.send({ err: Something went wrong });
//   }
// });

// ServicesRoutes.delete(/delete/:id, async (req, res) => {
//   const Id = req.params.id;
//   const note = await servicesModel.findOne({ _id: Id });
//   const hotelId = note.created_by;
//   const userId_making_req = req.body.created_by;
//   try {
//     if (userId_making_req !== hotelId) {
//       res.send({ msg: You are not Recognized });
//     } else {
//       await servicesModel.findByIdAndDelete({ _id: Id });
//       res.send(Deleted the Data);
//     }
//   } catch (err) {
//     console.log(err);
//     res.send({ msg: Something went wrong });
//   }
// });

module.exports = {
  ServicesRoutes,
};
