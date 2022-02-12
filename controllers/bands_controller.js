const bands = require("express").Router();
const db = require("../models");
const { Op } = require("sequelize");
const { Band } = db;

// Get all bands
bands.get("/", async (req, res) => {
  try {
    const foundBands = await Band.findAll({
      order: [["available_start_time", "ASC"]],
      where: [{ name: { [Op.like]: `%${req.query.name || ""}%` } }],
    });
    res.status(200).json(foundBands);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get one band
bands.get("/:id", async (req, res) => {
  try {
    const { id: bandId } = req.params;

    const foundBand = await Band.findOne({
      where: { band_id: bandId },
    });
    res.status(200).json(foundBand);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Create a band
bands.post("/", async (req, res) => {
  try {
    const newBand = await Band.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a new band",
      data: newBand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Update a band
bands.put("/:id", async (req, res) => {
  try {
    const { id: bandId } = req.params;

    const updatedBands = await Band.update(req.body, {
      where: { band_id: bandId },
    });

    res.status(200).json({
      message: `Successfully updated ${updatedBands} band(s)`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Delete a band
bands.delete("/:id", async (req, res) => {
  try {
    const { id: bandId } = req.params;

    const deletedBands = await Band.destroy({
      where: { band_id: bandId },
    });

    res.status(200).json({
      message: `Successfully deleted ${deletedBands} band(s)`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = bands;
