const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Property = require("../models/Property");
const auth = require("../middleware/auth");

// Optional auth: sets req.admin if valid token present, but doesn't block
function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    try {
      req.admin = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
    } catch {
      // invalid token — treat as unauthenticated
    }
  }
  next();
}

// GET /api/properties
// Admin with showAll=true sees all properties; public sees only isAvailable: true
router.get("/", optionalAuth, async (req, res) => {
  try {
    const {
      category,
      transactionType,
      city,
      minPrice,
      maxPrice,
      minRooms,
      search,
      showAll,
    } = req.query;

    const query = {};
    if (!(req.admin && showAll === "true")) {
      query.isAvailable = true;
    }

    if (category) query.category = category;
    if (transactionType) query.transactionType = transactionType;
    if (city) query.city = city;
    if (minRooms) query.rooms = { $gte: Number(minRooms) };

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
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

// POST /api/properties — auth protected
router.post("/", auth, async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// exports.addProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       category,
//       subcategory,
//       bestseller,
//       sizes,
//     } = req.body;

//     const imageUrls = req.files?.map((file) => file.path) || [];
//     console.log(req.files);
//     const newProduct = {
//       name,
//       description,
//       price,
//       category,
//       subcategory,
//       bestseller: bestseller === "true" ? true : false,
//       sizes: JSON.parse(sizes),
//       image: imageUrls,
//     };

//     const product = await Product.create(newProduct);
//     res.status(201).json({
//       status: "success",
//       message: "Product was created successfully",
//       data: product,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       status: "fail",
//       message: "Something went wrong while creating a new product",
//     });
//   }
// };

// productRouter.post(
//   "/",
//   adminAuth,
//   (req, res, next) => {
//     upload.array("image", 5)(req, res, (err) => {
//       if (err) {
//         console.error("Upload Error:", err);
//         return res.status(400).json({ status: "fail", message: err.message });
//       }
//       next();
//     });
//   },
//   addProduct
// );

// PATCH /api/properties/:id — auth protected, partial update
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

// DELETE /api/properties/:id — auth protected
router.delete("/:id", auth, async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
