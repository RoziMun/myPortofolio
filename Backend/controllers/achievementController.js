import Achievement from "../models/achievement.js";

export const getAchievement = async(req, res) => {
    try {
        const achievement = await Achievement.find();
        res.json(achievement);
    } catch (error) {
        console.log("Achievement Error ⚠️");
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getOneAchievement = async(req, res) => {
    const {nameAchievement} = req.query;
    try{
        const achievement = await Achievement.findOne({nameAchievement})

        if (!achievement){
           return res.status(400).json({message: "Name Achievement is Required"})
        }
        return res.redirect(`/achievement/${achievement._id}`);
        
    }catch(error){
        console.log("Get One Achivement Error ⚠️");
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getAchievementById = async(req, res) => {
    const {id} = req.params;
    try {
        const achievement = await Achievement.findById(id);

        if(!achievement){
            return res.status(400).json({message: "ID Achievement is required"});
        }
        
        res.json(achievement)
    } catch (error) {
        console.log("Get Achievement By ID Error ⚠️");
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const postAchievement = async(req, res) =>{
    try {
        const {imageAchievement, nameAchievement, dateAchievement, typeAchievement} = req.body;
        await Achievement.create({
            imageAchievement: imageAchievement,
            nameAchievement: nameAchievement,
            dateAchievement: dateAchievement,
            typeAchievement: typeAchievement
        });
        res.json({imageAchievement: imageAchievement, nameAchievement, dateAchievement, typeAchievement});
    } catch (error) {
        console.log("Add Achievement Error ⚠️");
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteAchievment = async(req, res) => {
    const {nameAchievement} = req.body;
    try {
        const result = await Achievement.deleteOne({nameAchievement: nameAchievement});

        if(result.deletedCount > 0){
            res.json({message: "Delete Achievement Successfully"});
        }else{
            res.status(404).json({message: "Failed to delete, Achievement not found"});
        }
    } catch (error) {
        console.log("Delete Achievement Error ⚠️");
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
}

export const updateAchievement = async(req, res) => {
    const {oldName, ...updateData}= req.body;
    try {
        if(!oldName){
            return res.status(400).json({message: "oldName is required"});
        }

        const update = await Achievement.findOneAndUpdate(
            {nameAchievement: oldName}, updateData, {new: true}
        );

        if(!update){
            return res.status(400).json({message: "Achievement Not Found"});
        }

        res.json(update)
    } catch (error) {
        console.log("Update Achievement Error ⚠️");
        console.log(error);
        res.status(500).json({message : "Internal Server Error"});
    }
}