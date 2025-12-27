const Cart = require('../models/cart.model');

async function getCart(req, res) {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) {
            return res.status(200).json({ items: [] });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function addToCart(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            // Cart exists for user
            let itemIndex = cart.items.findIndex(p => p.product == productId);

            if (itemIndex > -1) {
                // Product exists in the cart, update the quantity
                let productItem = cart.items[itemIndex];
                productItem.quantity = quantity;
                cart.items[itemIndex] = productItem;
            } else {
                // Product does not exist in cart, add new item
                cart.items.push({ product: productId, quantity });
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            // No cart for user, create new cart
            const newCart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity }],
            });

            return res.status(201).send(newCart);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
}

async function removeFromCart(req, res) {
    const { productId } = req.params;
    const userId = req.user._id;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            let itemIndex = cart.items.findIndex(p => p.product == productId);

            if (itemIndex > -1) {
                cart.items.splice(itemIndex, 1);
                cart = await cart.save();
                return res.status(200).send(cart);
            }
        }

        res.status(404).send('Item not found');
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
}

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
};
