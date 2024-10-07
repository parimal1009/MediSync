//creating login for update avaliablity of doctor
import doctorModel from "../models/doctorModel.js";

const changeAvaliability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      avaliabile: !docData.avaliabile,
    });
    res.json({ success: true, message: "Avaliablity changed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//get all doctor list
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    res.json({ success: true, message: "Doctor List", doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { changeAvaliability, doctorList };
