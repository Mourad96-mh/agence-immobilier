const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Property = require("../models/Property");
const auth = require("../middleware/auth");

const CITY_CODE_MAP = {
  Casablanca: "CA",
  Marrakech: "MA",
  Rabat: "RA",
  Agadir: "AG",
  Tanger: "TA",
  "Fès": "FE",
  "Meknès": "ME",
  Oujda: "OU",
  Mohammedia: "MO",
  "El Jadida": "EJ",
  Safi: "SA",
  Kenitra: "KE",
  "Tétouan": "TE",
  "Beni Mellal": "BM",
};

function getCityPrefix(city) {
  const normalized = city.trim();
  if (CITY_CODE_MAP[normalized]) return CITY_CODE_MAP[normalized];
  return normalized.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase().padEnd(2, 'X');
}

async function generatePropertyCode(city) {
  const prefix = getCityPrefix(city);
  const count = await Property.countDocuments({
    propertyCode: new RegExp('^' + prefix + '[0-9]+$')
  });
  let num = count + 1;
  for (let attempts = 0; attempts < 200; attempts++) {
    const code = prefix + String(num).padStart(2, '0');
    const exists = await Property.findOne({ propertyCode: code });
    if (!exists) return code;
    num++;
  }
  throw new Error("Impossible de generer un code unique pour cette propriete");
}

// Optional auth: sets req.admin if valid token present, but does not block
function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    try {
      req.admin = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
    } catch {
      // invalid token -- treat as unauthenticated
    }
  }
  next();
}

// GET /api/properties
router.get("/", optionalAuth, async (req, res) => {
  try {
    const {
      category,
      transactionType,
      city,
      quartier,
      minPrice,
      maxPrice,
      minRooms,
      search,
      showAll,
      code,
    } = req.query;

    const query = {};
    if (!(req.admin && showAll === "true")) {
      query.isAvailable = true;
    }

    if (category) query.category = category;
    if (transactionType) query.transactionType = transactionType;
    if (city) query.city = city;
    if (quartier) query.quartier = quartier;
    if (minRooms) query.rooms = { $gte: Number(minRooms) };

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (code && code.trim()) {
      query.propertyCode = code.trim().toUpperCase();
    }

    if (search && search.trim()) {
      query.$text = { $search: search.trim() };
    }

    const properties = await Property.find(query).sort({
      featured: -1,
      createdAt: -1,
    });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/properties/quartiers?city=Casablanca
router.get("/quartiers", async (req, res) => {
  try {
    const { city } = req.query;
    const match = { isAvailable: true, quartier: { $nin: ['', null] } };
    if (city) match.city = city;
    const quartiers = await Property.distinct("quartier", match);
    res.json(quartiers.filter(Boolean).sort());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/properties/:id
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/properties -- auth protected
router.post("/", auth, async (req, res) => {
  try {
    const code = await generatePropertyCode(req.body.city);
    const property = new Property({ ...req.body, propertyCode: code });
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/properties/:id -- auth protected, partial update
router.patch("/:id", auth, async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/properties/:id -- auth protected
router.delete("/:id", auth, async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;