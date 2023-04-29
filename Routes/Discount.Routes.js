const express = require("express");
const { DiscountModel } = require("../Model/Discount.Model");

const DiscountRoutes = express.Router();

DiscountRoutes.get("/", async (req, res) => {
  const payload = req.body;
  try {
    const product = await DiscountModel.find();
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
DiscountRoutes.get("/:id", async (req, res) => {
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

DiscountRoutes.get("/alltypes/:id", async (req, res) => {
  const payload = req.body;
  const Id=req.headers.Id;
  console.log(req.params.id);
  try {
    const product = await servicesModel.findById({ _id: req.params.id });
    product.alltypes.map((el) => {
      if(el._id=="644cfd4ed7b791b631a73b0b"){

        console.log(el)
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

DiscountRoutes.post("/add", async (req, res) => {
  const payload = req.body;

  let payload1 = {
    type: payload.type,
  };

  try {
    const data = await DiscountModel.findOne({ discountName: payload.discountName });
    if (!data) {
      const val = new DiscountModel(payload);
      await val.save();
      res.send({ msg: "Data is Added " });
    } else {
    //   data.type.push(payload1);
    //   await data.save();
    //   res.send("Data added successfully");
    data.type.push(payload.type)
    await data.save();
    res.send("Data added successfully");
    }
  } catch (error) {
    res.status(400).send({ msg: "something went wrong", error });
    console.log(error);
  }
});

// DiscountRoutes.patch(/update/:id, async (req, res) => {
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

// DiscountRoutes.delete(/delete/:id, async (req, res) => {
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
  DiscountRoutes,
};
