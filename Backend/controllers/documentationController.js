import documentation from "../models/documentation.js";
import Documentation from "../models/documentation.js";

export const getDocumentation = async (req, res) => {
  try {
    const Doc = await Documentation.find();
    res.json(Doc);
  } catch (error) {
    console.log("Get All Documentation Error ⚠️");
    console.log(error);
    res.statu(500).json({ message: "Internal Server Error" });
  }
};

export const getDocumentationByName = async (req, res) => {
  const { name } = req.query;
  try {
    const Doc = await Documentation.findOne({ name });
    if (!Doc) {
      return res.status(404).json({ message: "Documentation Not Found" });
    }
    return res.redirect(`/documentation/${Doc._id}`);
  } catch (error) {
    console.log("Get Documentation By Name Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDocumentationById = async (req, res) => {
  const { id } = req.params;
  try {
    const Doc = await Documentation.findById(id);
    if (!Doc) {
      return res.status(404).json({ message: "Documentation Not Found" });
    }
    res.json(Doc);
  } catch (error) {
    console.log("Get Documentation By ID Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addDocumentation = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const Doc = await Documentation.create({
      name: name,
      imageUrl: imageUrl,
    });
    res.json(Doc);
  } catch (error) {
    console.log("Add Documentation Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteDocumentation = async (req, res) => {
  const { name } = req.body;
  try {
    const Doc = await Documentation.deleteOne({ name });
    if (Doc.deletedCount > 0) {
      res.json({ message: "Delete Documentation Successfully" });
    }else{
        res.status(404).json({ message: "Failed to delete, Documentation not found" });
    }
  } catch (error) {
    console.log("Delete Documentation Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateDocumentation = async (req, res) => {
  const { oldName, ...updateData } = req.body;
  try {
    const Doc = await Documentation.findOneAndUpdate(
      { name: oldName },
      updateData,
      {
        returnDocument: "after",
      },
    );
    if (!Doc) {
      return res.status(404).json({ message: "Documentation Not Found" });
    }
    res.json(Doc);
  } catch (error) {
    console.log("Update Documentation Error ⚠️");
    console.log(error);
    res.status(500).json({message: "Internal Server Error"});
  }
};
