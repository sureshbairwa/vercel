import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    deployId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    description: {
        type: String,
        default: "",
    },
    logo: {
        type: String,
        default: "",
    },
    hostedLink: {
        type: String,
        required: true,
    },
    githubURL: {
        type: String,
        required: true,
    },
   
}, {
    timestamps: true,
});

export const Project = mongoose.model("Project", projectSchema);