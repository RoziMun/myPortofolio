import ContactMe from "../models/contactMe.js";

export const getContact = async (req, res) => {
  try {
    const contact = await ContactMe.find();
    res.json(contact);
  } catch (error) {
    console.log("Contact Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getContactByName = async (req, res) => {
  try {
    const { yourName } = req.query;
    const contactME = await ContactMe.findOne({ yourName });
    if (!contactME) {
      return res.status(400).json({ message: "Name is Required" });
    }
    return res.redirect(`/contactMe/${contactME._id}`);
  } catch (error) {
    console.log("Get Contact By Name Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contactME = await ContactMe.findById(id);

    if (!contactME) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contactME);
  } catch (error) {
    console.log("Get Contact By ID Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postContact = async (req, res) => {
  try {
    const { yourName, email, subject, message } = req.body;
    await ContactMe.create({
      yourName: yourName,
      email: email,
      subject: subject,
      message: message,
    });
    res.json({ yourName: yourName, email, subject, message });
  } catch (error) {
    console.log("Add Contact Me Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteContact = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await ContactMe.deleteOne({ email: email });

    if (result.deletedCount > 0) {
      res.json({ message: "Delete Contact Successfully" });
    } else {
      res.status(404).json({ message: "Failed to delete, Contact not found" });
    }
  } catch (error) {
    console.log("Delete Contact Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateContact = async (req, res) => {
  const { oldEmail, ...updateData } = req.body;
  try {
    if (!oldEmail) {
      return res.status(400).json({ message: "oldEmail is required" });
    }

    const update = await ContactMe.findOneAndUpdate(
      { email: oldEmail },
      updateData,
      { new: true },
    );

    if (!update) {
      return res.status(400).json({ message: "Contact Not Found" });
    }

    res.json(update);
  } catch (error) {
    console.log("Update Contact Error ⚠️");
    console.log(error);
    res.status(500).json({ message: "Internarl Server Error" });
  }
};
