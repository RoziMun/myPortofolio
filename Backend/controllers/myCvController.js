import myCv from "../models/myCv.js";
import MyCv from "../models/myCv.js";

export const getMyCv = async (req, res) => {
  try {
    const CV = await MyCv.find();
    if (!CV) {
      return res.status(404).json({ message: "CV Not Found" });
    }
    res.json(CV);
  } catch (error) {
    console.log("Get CV Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addMyCv = async (req, res) => {
  try {
    const { pdf } = req.body;
    const CV = await MyCv.create({ pdf });
    res.json(CV);
  } catch (error) {
    console.log("Add CV Error ⚠️");
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteCV = async (req, res) => {
  const { pdf } = req.body;
  try {
    const CV = await MyCv.deleteOne({ pdf });
    if (CV.deletedCount > 0) {
      res.json({ message: "Delete CV Successfully" });
    } else {
      res.status(404).json({ message: "Failed to delete, CV not found" });
    }
  } catch (error) {
    console.log("Delete CV Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCV = async (req, res) => {
  const { oldPdf, ...updateData } = req.body;
  try {
    const CV = await MyCv.findOneAndUpdate({ pdf: oldPdf }, updateData, {
      returnDocument: "after",
    });
    if (!CV) {
      return res.status(404).json({ message: "CV Not Found" });
    }
    res.json(CV);
  } catch (error) {
    console.log("Update CV Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
