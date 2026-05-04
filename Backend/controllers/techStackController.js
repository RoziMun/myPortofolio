import techStack from "../models/techStack.js";
import TechStack from "../models/techStack.js";

export const getTechStack = async (req, res) => {
  try {
    const stackTech = await techStack
      .find()
      .populate("projectId", "nameProject");
    res.json(stackTech);
  } catch (error) {
    console.log("Get Tech Stack Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTechStackByName = async (req, res) => {
  const { name } = req.query;
  try {
    const stackTECH = await TechStack.findOne({ name });

    if (!stackTECH) {
      return res.status(404).json({ message: "Tech Stack Not Found" });
    }

    return res.redirect(`/techStack/${stackTECH._id}`);
  } catch (error) {
    console.log("Get Tech Stack By Name Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTechStackById = async (req, res) => {
  const { id } = req.params;
  try {
    const stackTECH = await TechStack.findById(id);

    if (!stackTECH) {
      return res.status(404).json({ message: "Tech Stack Not Found" });
    }

    res.json(stackTECH);
  } catch (error) {
    console.log("Get Tech Stack By ID Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postTechStack = async (req, res) => {
  try {
    const { name, icon } = req.body;
    await TechStack.create({
      name: name,
      icon: icon,
    });
    res.json({ name: name, icon: icon, projectId: projectId });
  } catch (error) {
    console.log("Add Tech Stack Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTechStack = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await TechStack.deleteOne({ name });
    if (result.deletedCount > 0) {
      res.json({ message: "Delete Tech Stack Successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Faild to delete, Tech Stack not found" });
    }
  } catch (error) {
    console.log("Delete Tech Stack Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTechStack = async (req, res) => {
  const { oldName, ...updateData } = req.body;
  try {
    if (!oldName) {
      return res.status(400).json({ message: "oldName is required" });
    }
    const update = await TechStack.findOneAndUpdate(
      { name: oldName },
      updateData,
      { new: true },
    );

    if (!update) {
      res.status(400).json({ message: "Tech Stack Not Found" });
    }
    res.json(update);
  } catch (error) {
    console.log("Update Tech Stack Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
