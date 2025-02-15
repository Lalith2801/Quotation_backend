import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());



// ✅ API to get board price
app.get("/api/get-board-price", (req, res) => {
  const { boardType, size, gsm } = req.query;
  
  if (!boardType || !size || !gsm) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const price = boardPrices[boardType]?.sizes[size]?.[gsm] ?? 0;
  res.json({ price });
});

// Printing Pricing Data
const pricingData = {
  M1: {
    "4_color": { basePrice: 7000, extraPricePerThousand: 700 },
    "4_color_varnish": { basePrice: 7000, extraPricePerThousand: 800 },
    "4_color_texture_UV": { basePrice: 12750, extraPricePerThousand: 1250 },
    "Metpet_4_color_texture_UV": { basePrice: 13300, extraPricePerThousand: 1250 },
  },
  M2: {
    "4_color": { basePrice: 2400, extraPricePerThousand: 350 },
  },
  M3: {
    "4_color": { basePrice: 3200, extraPricePerThousand: 450 },
  },
  M5: {
    "single_color": { basePrice: 250, extraPricePerThousand: 200 },
  },
  M6: {
    "4_color": { basePrice: 3200, extraPricePerThousand: 450 },
    "4_color_varnish": { basePrice: 3200, extraPricePerThousand: 700 },
    "4_color_texture_UV": { basePrice: 6750, extraPricePerThousand: 1000 },
    "Metpet_4_color_texture_UV": { basePrice: 7100, extraPricePerThousand: 1000 },
  },
};

// Pricing for Lamination
const laminationPricing = {
  Gloss: 0.38,
  Matt: 0.45,
};

// Pricing for Texture UV
const textureUVPricing = {
  "Texture_UV": 0.80,
};

// Pricing for Metpet
const metpetPricing = {
  "Metpet": 1.45,
};

app.get("/api/get-pricing", (req, res) => {
  res.json({ pricingData });
});

// Lamination API
app.post("/api/calculate-lamination", (req, res) => {
  const { type, height, width } = req.body;
  if (!laminationPricing[type]) {
    return res.status(400).json({ error: "Invalid lamination type" });
  }
  const price = height * width * laminationPricing[type];
  res.json({ price });
});

// Texture UV API
app.post("/api/calculate-textureUV", (req, res) => {
  const { height, width } = req.body;
  const price = height * width * textureUVPricing["Texture_UV"];
  res.json({ price });
});

// Metpet API
app.post("/api/calculate-metpet", (req, res) => {
  const { height, width } = req.body;
  const price = height * width * metpetPricing["Metpet"];
  res.json({ price });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
