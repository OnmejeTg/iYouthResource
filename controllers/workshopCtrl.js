import Workshop from "../models/workshopModel.js";
import { uploadImage } from "../utils/cloudinary.js";

// Create a new workshop
export const createWorkshop = async (req, res) => {
  try {
    const { link, tagline } = req.body;

    // Extract image if available
    const img = req.files?.thumbnail?.[0];
    const imageBuffer = img?.buffer;

    // Upload image if it exists
    const folder = "IYR/workshops/";
    const image = imageBuffer ? await uploadImage(imageBuffer, folder) : "";

    // Create and save the workshop
    const workshopData = {
      link,
      tagline,
    };

    if (image) {
      workshopData.thumbnail = image;
    }

    const newWorkshop = await Workshop.create(workshopData);

    return res.status(201).json(newWorkshop);
  } catch (error) {
    console.error("Error creating Workshop:", error);
    return res.status(400).json({ message: "Error creating Workshop", error });
  }
};

// Get all workshops
export const getAllWorkshop = async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.status(200).send(workshops);
  } catch (error) {
    res.status(500).send({ message: "Error fetching workshops", error });
  }
};

// Get a single workshop by ID
export const geWorkshopById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      return res.status(404).send({ message: "Workshop not found" });
    }
    res.status(200).send(workshop);
  } catch (error) {
    res.status(500).send({ message: "Error fetching workshop", error });
  }
};

// Update a workshop by ID
export const updateWorkshop = async (req, res) => {
  try {
    const { link, tagline } = req.body;
    // console.log(req.body);
    // Extract image if available
    const img = req.files?.thumbnail?.[0];
    const imageBuffer = img?.buffer;

    // Upload image if it exists
    const folder = "IYR/workshops/";
    const image = imageBuffer ? await uploadImage(imageBuffer, folder) : "";

    // Find workshop and update
    const updateData = {
      link,
      tagline,
    };

    if (image) {
      updateData.thumbnail = image;
    }

    const workshop = await Workshop.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!workshop) {
      return res.status(404).send({ message: "Workshop not found" });
    }

    res.status(200).send(workshop);
  } catch (error) {
    console.error("Error updating workshop:", error);
    res.status(400).send({ message: "Error updating workshop", error });
  }
};

// Delete a mentor by ID
export const deleteworkshop = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!mentor) {
      return res.status(404).send({ message: "Mentor not found" });
    }
    res.status(200).send({ message: "Mentor deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting mentor", error });
  }
};
