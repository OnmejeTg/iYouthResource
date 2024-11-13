import Funding from "../models/Funding.js";

// Create a new funding
export const createFunding = async (req, res) => {
  try {
    const funding = await Funding.create(req.body);
    res.status(201).json({
      message: "Funding created successfully",
      data: funding,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create funding", error: error.message });
  }
};

// Get all funding records
export const getFundings = async (req, res) => {
  try {
    const fundings = await Funding.find();
    res.status(200).json({ data: fundings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve fundings", error: error.message });
  }
};

// Get a single funding by ID
export const getFundingById = async (req, res) => {
  try {
    const funding = await Funding.findById(req.params.id);
    if (!funding) {
      return res.status(404).json({ message: "Funding not found" });
    }
    res.status(200).json({ data: funding });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve funding", error: error.message });
  }
};

// Update a funding record by ID
export const updateFunding = async (req, res) => {
  try {
    const funding = await Funding.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!funding) {
      return res.status(404).json({ message: "Funding not found" });
    }
    res.status(200).json({
      message: "Funding updated successfully",
      data: funding,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update funding", error: error.message });
  }
};

// Delete a funding record by ID
export const deleteFunding = async (req, res) => {
  try {
    const funding = await Funding.findByIdAndDelete(req.params.id);
    if (!funding) {
      return res.status(404).json({ message: "Funding not found" });
    }
    res.status(200).json({ message: "Funding deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete funding", error: error.message });
  }
};
