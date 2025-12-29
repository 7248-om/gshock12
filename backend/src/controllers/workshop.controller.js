const Workshop = require('../models/workshop.model');
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function getWorkshops(req, res) {
    try {
        const workshops = await Workshop.find().sort({ date: 1 });
        res.status(200).json(workshops);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function getWorkshopById(req, res) {
    try {
        const workshop = await Workshop.findById(req.params.id);
        if (!workshop) {
            return res.status(404).json({ message: 'Workshop not found' });
        }
        res.status(200).json(workshop);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function createWorkshop(req, res) {
    try {
        const workshop = await Workshop.create(req.body);
        res.status(201).json(workshop);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function createWorkshopWithImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        const buffer = req.file.buffer;

        // Upload image to ImageKit
        const uploadResult = await imagekit.upload({
            file: buffer,
            fileName: req.file.originalname,
            folder: '/gshock/workshops/',
        });

        // Create workshop with image URL
        const workshopData = {
            ...req.body,
            image: uploadResult.url,
            primaryImageUrl: uploadResult.url,
        };

        const workshop = await Workshop.create(workshopData);
        res.status(201).json(workshop);
    } catch (error) {
        console.error('Workshop creation with image failed:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function updateWorkshop(req, res) {
    try {
        const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!workshop) {
            return res.status(404).json({ message: 'Workshop not found' });
        }
        res.status(200).json(workshop);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function updateWorkshopWithImage(req, res) {
    try {
        if (!req.file) {
            // No file, just update text fields
            const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!workshop) {
                return res.status(404).json({ message: 'Workshop not found' });
            }
            return res.status(200).json(workshop);
        }

        const buffer = req.file.buffer;

        // Upload image to ImageKit
        const uploadResult = await imagekit.upload({
            file: buffer,
            fileName: req.file.originalname,
            folder: '/gshock/workshops/',
        });

        // Update workshop with new image URL
        const workshopData = {
            ...req.body,
            image: uploadResult.url,
            primaryImageUrl: uploadResult.url,
        };

        const workshop = await Workshop.findByIdAndUpdate(req.params.id, workshopData, { new: true });
        if (!workshop) {
            return res.status(404).json({ message: 'Workshop not found' });
        }
        res.status(200).json(workshop);
    } catch (error) {
        console.error('Workshop update with image failed:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function deleteWorkshop(req, res) {
    try {
        const workshop = await Workshop.findByIdAndDelete(req.params.id);
        if (!workshop) {
            return res.status(404).json({ message: 'Workshop not found' });
        }
        res.status(200).json({ message: 'Workshop deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = {
    getWorkshops,
    getWorkshopById,
    createWorkshop,
    createWorkshopWithImage,
    updateWorkshop,
    updateWorkshopWithImage,
    deleteWorkshop,
};
