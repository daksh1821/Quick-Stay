import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

// API to create a new hotel
// POST /api/hotels
export const registerHotel = async (req, res) => {
  try {

    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    // Create the hotel without checking for existing hotels
    await Hotel.create({ name, address, contact, city, owner });

    // Update User Role to admin if not already
    if (req.user.role !== "admin") {
      await User.findByIdAndUpdate(owner, { role: "admin" });
    }

    res.json({ success: true, message: "Hotel Registered Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all hotels owned by an admin
// GET /api/hotels/my-hotels
export const getMyHotels = async (req, res) => {
  try {
    const owner = req.user._id;
    const hotels = await Hotel.find({ owner }).sort({ createdAt: -1 });
    res.json({ success: true, hotels });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};