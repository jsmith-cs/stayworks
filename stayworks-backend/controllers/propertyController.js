const rentalProperty = require("../models/rentalProperty");

const getAllRentalProperties = async (req, res) => {
        try {
            const rentalProperties = await rentalProperty.getAllRentalProperties();
            res.json(rentalProperties);
        } catch (error) {
            console.error('Error fetching rental properties:', error);
            res.status(500).json({ error: 'Error fetching rental properties' });
        }
    };

const getRentalPropertyById = async (req, res) => {
        try {
            const { id } = req.params;
            const rentalProperty = await rentalProperty.getRentalPropertyById(id);
            if (!rentalProperty) {
                return res.status(404).json({ error: 'Rental property not found' });
            }
            res.json(rentalProperty);
        } catch (error) {
            console.error('Error fetching rental property:', error);
            res.status(500).json({ error: 'Error fetching rental property' });
        }
    };

module.exports = {
    getAllRentalProperties,
    getRentalPropertyById
};