import Mentor from "../models/Mentors.js";
import { uploadImage } from "../utils/cloudinary.js";

// Create a new mentor
export const createMentor = async (req, res) => {
  try {
    const { name, occupation, facebook, twitter, instagram } = req.body;

    // Extract profile image if available
    const profileImg = req.files?.profileImg?.[0];
    const imageBuffer = profileImg?.buffer;

    // Upload image if it exists
    const folder = "IYR/mentors/profileImages/";
    const image = imageBuffer ? await uploadImage(imageBuffer, folder) : "";

    // Create and save the mentor
    const mentorData = {
      name,
      occupation,
      facebook,
      twitter,
      instagram,
    };

    if (image) {
      mentorData.photo = image;
    }

    const newMentor = await Mentor.create(mentorData);

    return res.status(201).json(newMentor);
  } catch (error) {
    console.error("Error creating mentor:", error);
    return res.status(400).json({ message: "Error creating mentor", error });
  }
};

// Get all mentors
export const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).send(mentors);
  } catch (error) {
    res.status(500).send({ message: "Error fetching mentors", error });
  }
};

// Get a single mentor by ID
export const getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).send({ message: "Mentor not found" });
    }
    res.status(200).send(mentor);
  } catch (error) {
    res.status(500).send({ message: "Error fetching mentor", error });
  }
};

// Update a mentor by ID
export const updateMentor = async (req, res) => {
  try {
    const { name, occupation, facebook, twitter, instagram } = req.body;
    // console.log(req.body);
    // Extract profile image if available
    const profileImg = req.files?.profileImg?.[0];
    const imageBuffer = profileImg?.buffer;

    // Upload image if it exists
    const folder = "IYR/mentors/profileImages/";
    const image = imageBuffer ? await uploadImage(imageBuffer, folder) : null;

    // Find mentor and update
    const updateData = {
      name,
      occupation,
      facebook,
      twitter,
      instagram,
    };

    if (image) {
      updateData.photo = image;
    }

    const mentor = await Mentor.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!mentor) {
      return res.status(404).send({ message: "Mentor not found" });
    }

    res.status(200).send(mentor);
  } catch (error) {
    console.error("Error updating mentor:", error);
    res.status(400).send({ message: "Error updating mentor", error });
  }
};

// Delete a mentor by ID
export const deleteMentor = async (req, res) => {
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
