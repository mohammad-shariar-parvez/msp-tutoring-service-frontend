import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const postImage = async (req: NextApiRequest, res: NextApiResponse) => {
	return NextResponse.json({ name: "File uploaded" });
};