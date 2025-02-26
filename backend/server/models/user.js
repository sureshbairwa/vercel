import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		default: "image.jpg",
	},
	projects: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project",
			
		},
		
	],
	
});

export const User = mongoose.model("User", userSchema);
