const Artist = require('../models/artist.model');

// --- 1. GET ALL ARTISTS (To "See" them) ---
async function getArtists(req, res) {
    try {
        const { featured, style } = req.query;
        let query = { isActive: true };

        // Optional: Filter by featured or style
        if (featured === 'true') query.isFeatured = true;
        if (style) query.artStyles = { $in: [style.toLowerCase()] };

        const artists = await Artist.find(query).sort({ createdAt: -1 });
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// --- 2. GET SINGLE ARTIST (By ID or Name) ---
async function getArtistById(req, res) {
    try {
        const { id } = req.params;
        let query;

        // Check if the parameter is a valid MongoDB ID
        if (mongoose.Types.ObjectId.isValid(id)) {
            query = { _id: id };
        } else {
            // If not an ID, search by displayName (case-insensitive)
            query = { displayName: { $regex: new RegExp(`^${id}$`, 'i') } };
        }

        const artist = await Artist.findOne(query).populate('user', 'name email');
        
        if (!artist) {
            // Fallback: If artist profile doesn't exist yet, return a basic object
            // This solves your "fetch from there" request
            return res.status(200).json({
                _id: 'temp',
                displayName: id, // Just return the name requested
                bio: 'Artist profile coming soon.',
                artStyles: [],
                isActive: true
            });
        }
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// --- 3. CREATE ARTIST PROFILE (To "Add" them) ---
async function createArtist(req, res) {
    try {
        // Validate required fields
        if (!req.body.displayName) {
            return res.status(400).json({ message: 'Display Name is required' });
        }

        // Check if this user already has an artist profile (One profile per user)
        const existingProfile = await Artist.findOne({ user: req.user._id });
        if (existingProfile) {
            return res.status(400).json({ message: 'User already has an artist profile' });
        }

        const artistData = {
            ...req.body,
            user: req.user._id, // Link to the logged-in user
        };

        const artist = await Artist.create(artistData);
        res.status(201).json(artist);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Artist profile already exists' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ message: 'Validation error', errors: messages });
        }
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// --- 4. UPDATE ARTIST ---
async function updateArtist(req, res) {
    try {
        // Only allow users to update their own profile (or admin)
        // This query ensures the artist belongs to the logged-in user
        const query = { _id: req.params.id };
        
        // If not admin, ensure they own the profile
        if (req.user.role !== 'admin') {
            query.user = req.user._id;
        }

        const artist = await Artist.findOneAndUpdate(
            query, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!artist) {
            return res.status(404).json({ message: 'Artist not found or unauthorized' });
        }
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = {
    getArtists,
    getArtistById,
    createArtist,
    updateArtist
};