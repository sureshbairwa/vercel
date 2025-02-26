import jwt from "jsonwebtoken";

export const generateToken = (id:string) => {
	const token = jwt.sign(id, "jwt-secret");

	return token;
};