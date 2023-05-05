const express = require('express');
const { OrderModel } = require('../Model/Order.Model');
const orderRouter = express.Router();


// Get all orders
orderRouter.get('/', async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single order
orderRouter.get('/:id', getOrder, (req, res) => {
  res.json(res.order);
});

// Create a new order
orderRouter.post('/', async (req, res) => {
  const order = new OrderModel({
    category: req.body.category,
    services: req.body.services,
    link: req.body.link,
    quantity: req.body.quantity,
    averageTime: req.body.averageTime,
    costval: req.body.costval,
    // userId: req.body.userId,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing order
orderRouter.patch('/:id', getOrder, async (req, res) => {
  if (req.body.category != null) {
    res.order.category = req.body.category;
  }
  if (req.body.service != null) {
    res.order.service = req.body.service;
  }
  if (req.body.link != null) {
    res.order.link = req.body.link;
  }
  if (req.body.quantity != null) {
    res.order.quantity = req.body.quantity;
  }
  if (req.body.averageTime != null) {
    res.order.averageTime = req.body.averageTime;
  }
  if (req.body.charge != null) {
    res.order.charge = req.body.charge;
  }
  if (req.body.userId != null) {
    res.order.userId = req.body.userId;
  }
  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an order
orderRouter.delete('/:id', getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a single order by ID
async function getOrder(req, res, next) {
  let order;
  try {
    order = await OrderModel.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.order = order;
  next();
}

module.exports = orderRouter;
