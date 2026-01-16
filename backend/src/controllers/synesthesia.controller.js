const Menu = require('../models/menu.model');
const Artwork = require('../models/artwork.model');

// Configuration: Which database tags map to which user vibe
const VIBE_CONFIG = {
  bold: {
    menuTags: ['bold', 'strong', 'robusta', 'intense', 'spicy', 'dark'],
    artTags: ['abstract', 'bold', 'chaotic', 'high_contrast', 'urban'],
    reasoning: "The intense profile of this selection mirrors the high-contrast, bold strokes of the artwork. A pairing for those who seek clarity in chaos."
  },
  smooth: {
    menuTags: ['smooth', 'mild', 'creamy', 'sweet', 'milk', 'comfort'],
    artTags: ['minimalist', 'soft', 'calm', 'pastel', 'modern'],
    reasoning: "Velvety textures on the palate complement the soft gradients on the canvas. A low-arousal pairing designed for contemplation and slow living."
  },
  earthy: {
    menuTags: ['earthy', 'nutty', 'herbal', 'rustic', 'traditional'],
    artTags: ['nature', 'landscape', 'organic', 'green', 'texture'],
    reasoning: "Rooted flavors meet organic visuals. The earthy notes ground the sensory experience, echoing the natural elements in the art."
  }
};

async function getPairing(req, res) {
  try {
    const { vibe } = req.query;
    const config = VIBE_CONFIG[vibe] || VIBE_CONFIG['bold']; // Fallback to bold

    // 1. Find a Menu Item (Coffee preferred, but food works if tagged)
    // We use $in to find ANY item that has at least one matching tag
    // We search for 'In Stock' items only
    const menuItem = await Menu.findOne({
      stockStatus: 'In Stock',
      tags: { $in: config.menuTags }
    });

    // 2. Find an Available Artwork
    const artItem = await Artwork.findOne({
      status: 'Available',
      tags: { $in: config.artTags }
    });

    // 3. Fallbacks (If specific tags fail, just get any available item to prevent errors)
    const finalMenu = menuItem || await Menu.findOne({ stockStatus: 'In Stock' });
    const finalArt = artItem || await Artwork.findOne({ status: 'Available' });

    if (!finalMenu || !finalArt) {
      return res.status(404).json({ message: "Not enough inventory to generate a pairing." });
    }

    // 4. Return the combined result
    res.status(200).json({
      coffee: finalMenu, // We call it 'coffee' in frontend, but it can be any menu item
      art: finalArt,
      reasoning: config.reasoning
    });

  } catch (error) {
    console.error("Synesthesia Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

module.exports = { getPairing };