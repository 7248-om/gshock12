const Menu = require('../models/menu.model');

// Get all menu items
exports.getMenu = async (req, res, next) => {
  try {
    const { category, tag } = req.query;
    // Admin needs to see all items, even those out of stock, so we remove the filter
    const query = {}; 

    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag.toLowerCase()] };

    const items = await Menu.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// Get single item
exports.getMenuItem = async (req, res, next) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// Create new item
exports.createMenuItem = async (req, res, next) => {
  try {
    const newItem = await Menu.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

// Update item
exports.updateMenuItem = async (req, res, next) => {
  try {
    const updatedItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

// Delete item
exports.deleteMenuItem = async (req, res, next) => {
  try {
    const deletedItem = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    next(error);
  }
};