import education from "../models/education.js";
import Education from "../models/education.js";

export const getEducation = async (req, res) => {
  try {
    const Edu = await Education.find();
    res.json(Edu);
  } catch (error) {
    console.log("Get All Education Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getEducationByName = async (req, res) => {
  const { institution } = req.query;
  try {
    const Edu = await Education.findOne({ institution });
    if (!Edu) {
      return res.status(404).json({ message: "Institution Not Found" });
    }
    res.redirect(`/education/${Edu._id}`);
  } catch (error) {
    console.log("Get Education By Name Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getEducationById = async (req, res) => {
  const { id } = req.params;
  try {
    const Edu = await Education.findById(id);
    if (!Edu) {
      return res.status(404).json({ message: "ID Not Found" });
    }
    res.json(Edu);
  } catch (error) {
    console.log("Get Education By ID Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addEducation = async (req, res) => {
  try {
    const { institution, major, startDate, endDate, description } = req.body;
    const Edu = await Education.create({
      institution: institution,
      major: major,
      startDate: startDate,
      endDate: endDate,
      description: description,
    });
    res.json(Edu);
  } catch (error) {
    console.log("Post Education Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const { institution } = req.body;
    const Edu = await Education.deleteOne({ institution });

    if (Edu.deletedCount > 0) {
      res.json({ message: "Delete Education is Successfully" });
    } else {
      res.status(404).json({ message: "Education Not Found" });
    }
  } catch (error) {
    console.log("Delete Education Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateEducation = async (req, res) => {
  const { oldInstitution, ...updateData } = req.body;
  try {
    if (!oldInstitution) {
      return res.status(400).json({ message: "Education not found" });
    }

    const update = await Education.findOneAndUpdate(
      { institution : oldInstitution },
      updateData,
      { returnDocument: 'after' },
    );
    if (!update) {
      return res
        .status(404)
        .json({ message: "Update Education Failed, Check Your Input Data" });
    }
    res.json(update);
  } catch (error) {
    console.log("Update Education Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
