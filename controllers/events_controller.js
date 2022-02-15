const events = require("express").Router();
const db = require("../models");
const { Op } = require("sequelize");
const { Event } = db;

events.get("/", async (req, res) => {
  try {
    const foundEvents = await Event.findAll({
      order: ["start_time"],
      where: [{ name: { [Op.like]: `%${req.query.name || ""}%` } }],
    });
    res.status(200).json(foundEvents);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

events.get("/:id", async (req, res) => {
  try {
    const foundEvent = await Event.findOne({
      where: { event_id: req.params.id },
    });
    res.status(200).json(foundEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

events.post("/", async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a new event",
      data: newEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

events.put("/:id", async (req, res) => {
  try {
    const updatedEvents = await Event.update(req.body, {
      where: { event_id: req.params.id },
    });

    res.status(200).json({
      message: `Successfully updated ${updatedEvents} event(s)`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

events.delete("/:id", async (req, res) => {
  try {
    const deletedEvents = await Event.destroy({
      where: { event_id: req.params.id },
    });

    res.status(200).json({
      message: `Successfully deleted ${deletedEvents} event(s)`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = events;
