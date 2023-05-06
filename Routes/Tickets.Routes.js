const express = require("express");
const router = express.Router();
const { TicketModel } = require("../Model/Ticket.Model");

// Create a new ticket
router.post("/", async (req, res) => {
  try {
    const { subject, message, orderId, userId } = req.body;

    const ticket = new TicketModel({
      subject,
      message,
      orderId,
      userId,
    });

    await ticket.save();

    res.status(201).send(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Get all tickets
router.get("/tickets", async (req, res) => {
  try {
    const tickets = await TicketModel.find();
    res.status(200).send(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/userTicket/:id", async (req, res) => {
    try {
      const tickets = await TicketModel.find({userId:req.params.id});
      res.status(200).send(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });

// Get a ticket by ID
router.get("/tickets/:id", async (req, res) => {
  try {
    const ticket = await TicketModel.findById(req.params.id);
    if (!ticket) {
      return res.status(404).send("Ticket not found");
    }
    res.status(200).send(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Update a ticket by ID
router.patch("/tickets/:id", async (req, res) => {
  try {
    const ticket = await TicketModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!ticket) {
      return res.status(404).send("Ticket not found");
    }
    res.status(200).send(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Delete a ticket by ID
router.delete("/tickets/:id", async (req, res) => {
  try {
    const ticket = await TicketModel.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).send("Ticket not found");
    }
    res.status(200).send(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
