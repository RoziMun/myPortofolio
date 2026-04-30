import Project from "../models/project.js";
import Documentation from "../models/documentation.js";
import TechStack from "../models/techStack.js"
import project from "../models/project.js";

export const getProject = async (req, res) => {
    try {
        const project = await Project.find().populate("documentation").populate("techStack");
        res.json(project);
    }catch(error){
        console.log("Project Error ⚠️");
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getProjectByName = async (req,res)=> {
    const {nameProject}=req.query;
    try {
        const project = await Project.findOne({nameProject});

        if(!project){
            return res.status(404).json({message: "Name Project Not Found"});
        }
        return res.redirect(`/project/${project._id}`);
    } catch (error) {
        console.log("Get Project By Name Error ⚠️");
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getProjectById = async (req, res) => {
    const {id}=req.params;
    try {
        const project = await Project.findById(id);

        if(!project){
            return res.status(404).json({message: "ID Project Not Found"});
        }

        res.json(project)
    } catch (error) {
        console.log("Get Project By ID Error ⚠️");
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const postProject = async (req, res) => {
    try {
        let {thumbnail, nameProject, overview, feature, documentation, techStack, duration, status, typeProject} = req.body;

        documentation = (documentation || []).filter(id => id);
        techStack = (techStack || []).filter(id => id)

        await Project.create({
            thumbnail: thumbnail,
            nameProject: nameProject,
            overview: overview,
            feature: feature,
            documentation: documentation,
            techStack: techStack,
            duration: duration,
            status: status,
            typeProject: typeProject
        });
        res.json({thumbnail: thumbnail, nameProject, overview, feature, documentation, techStack, duration, status, typeProject})
    } catch (error) {
        console.log("Add Project Error ⚠️");
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}
export const deleteProject = async (req,res) => {
    const {nameProject} = req.body;
    try {
        const result = await Project.deleteOne({nameProject});

        if(result.deletedCount > 0){
            res.json({message : "Delete Project Successfully"});
        }else{
            res.status(404).json({message : "Failed to delete, Project not found"})
        }
    } catch (error) {
        console.log("Delete Porject Error ⚠️");
        console.log(error);
        res.status(500).json({message : " Internal Server Error"});
    }
}

export const updateProject = async (req, res) => {
    const {oldNameProject, ...updateData} = req.body;
    try {
        if(!oldNameProject){
            return res.status(400).json({message: "oldNameProject is required"});
        }

        const update = await project.findOneAndUpdate(
            {nameProject: oldNameProject}, updateData, {new: true}
        );

        if (!update){
            return res.status(400).json({message: "Project Not Found"});
        }
        res.json(update)
    } catch (error) {
        console.log("Update Project Error ⚠️");
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}