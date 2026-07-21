const ShopkeeperDetails = require("../models/ShopkeeperDetails");
const User = require("../models/User");

const normalizeAddress = (addressData) => ({
    fullName: addressData?.fullName || "",
    phone: addressData?.phone || "",
    addressLine1: addressData?.addressLine1 || "",
    addressLine2: addressData?.addressLine2 || "",
    landmark: addressData?.landmark || "",
    city: addressData?.city || "",
    state: addressData?.state || "",
    country: addressData?.country || "",
    pincode: addressData?.pincode || "",
    addressType: addressData?.addressType || "Home",
    isDefault: Boolean(addressData?.isDefault),
});

const createProfile = async (req, res) => {
    try {
        const { userId, ...data } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const existingProfile = await ShopkeeperDetails.findOne({ userId });
        if (existingProfile) {
            return res.status(400).json({ success: false, message: "Shopkeeper profile already exists" });
        }

        const profile = await ShopkeeperDetails.create({
            userId,
            fullName: data.fullName || user.name || "",
            phone: data.phone || user.phone || "",
            shopCategory: data.shopCategory || "",
            addresses: data.addresses || [],
        });

        res.status(201).json({ success: true, message: "Shopkeeper profile created successfully", profile });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await ShopkeeperDetails.findOne({ userId }).populate("userId", "name email phone role");

        if (!profile) {
            return res.status(404).json({ success: false, message: "Shopkeeper profile not found" });
        }

        if (req.user && req.user.id && profile.userId._id.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You are not authorized to view this profile" });
        }

        res.status(200).json({ success: true, profile });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const { fullName, phone, shopCategory } = req.body;

        if (!fullName || !phone || !shopCategory) {
            return res.status(400).json({ success: false, message: "Full name, phone, and shop category are required" });
        }

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ success: false, message: "Phone number must be 10 digits" });
        }

        const profile = await ShopkeeperDetails.findOne({ userId });
        if (!profile) {
            return res.status(404).json({ success: false, message: "Shopkeeper profile not found" });
        }

        if (req.user && req.user.id && profile.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You are not authorized to update this profile" });
        }

        profile.fullName = fullName;
        profile.phone = phone;
        profile.shopCategory = shopCategory;

        await profile.save();

        await User.findByIdAndUpdate(profile.userId, {
            $set: { name: fullName, phone },
        });

        res.status(200).json({ success: true, message: "Profile updated successfully", profile });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        const addressData = req.body;

        if (!addressData.fullName || !addressData.phone || !addressData.addressLine1 || !addressData.city || !addressData.state || !addressData.country || !addressData.pincode || !addressData.addressType) {
            return res.status(400).json({ success: false, message: "All required address fields are required" });
        }

        if (!/^\d{10}$/.test(addressData.phone)) {
            return res.status(400).json({ success: false, message: "Phone number must be 10 digits" });
        }

        if (!/^\d{6}$/.test(addressData.pincode)) {
            return res.status(400).json({ success: false, message: "Pincode must be 6 digits" });
        }

        const profile = await ShopkeeperDetails.findOne({ userId });
        if (!profile) {
            return res.status(404).json({ success: false, message: "Shopkeeper profile not found" });
        }

        if (req.user && req.user.id && profile.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You are not authorized to add addresses" });
        }

        const normalizedAddress = normalizeAddress(addressData);
        if (profile.addresses.length === 0) {
            normalizedAddress.isDefault = true;
        }

        profile.addresses.push(normalizedAddress);
        await profile.save();

        res.status(201).json({ success: true, message: "Address added successfully", addresses: profile.addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAddresses = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await ShopkeeperDetails.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ success: false, message: "Shopkeeper profile not found" });
        }

        if (req.user && req.user.id && profile.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You are not authorized to view addresses" });
        }

        res.status(200).json({ success: true, addresses: profile.addresses || [] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const addressData = req.body;

        const profile = await ShopkeeperDetails.findOne({ userId });
        if (!profile) {
            return res.status(404).json({ success: false, message: "Shopkeeper profile not found" });
        }

        if (req.user && req.user.id && profile.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You are not authorized to update addresses" });
        }

        const address = profile.addresses.id(addressId);
        if (!address) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }

        Object.assign(address, normalizeAddress(addressData));
        await profile.save();

        res.status(200).json({ success: true, message: "Address updated successfully", addresses: profile.addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const profile = await ShopkeeperDetails.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ success: false, message: "Shopkeeper profile not found" });
        }

        if (req.user && req.user.id && profile.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete addresses" });
        }

        const address = profile.addresses.id(addressId);
        if (!address) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }

        const wasDefault = Boolean(address.isDefault);
        profile.addresses.pull(addressId);

        if (wasDefault && profile.addresses.length > 0) {
            profile.addresses[0].isDefault = true;
        }

        await profile.save();

        res.status(200).json({ success: true, message: "Address deleted successfully", addresses: profile.addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const setDefaultAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const profile = await ShopkeeperDetails.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ success: false, message: "Shopkeeper profile not found" });
        }

        if (req.user && req.user.id && profile.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You are not authorized to update addresses" });
        }

        const address = profile.addresses.id(addressId);
        if (!address) {
            return res.status(404).json({ success: false, message: "Address not found" });
        }

        profile.addresses.forEach((item) => {
            item.isDefault = false;
        });
        address.isDefault = true;

        await profile.save();

        res.status(200).json({ success: true, message: "Default address updated successfully", addresses: profile.addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await ShopkeeperDetails.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ success: false, message: "Shopkeeper profile not found" });
        }

        if (req.user && req.user.id && profile.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete this profile" });
        }

        await ShopkeeperDetails.findOneAndDelete({ userId });

        res.status(200).json({ success: true, message: "Shopkeeper profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createProfile,
    getProfile,
    updateProfile,
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    deleteProfile,
};
