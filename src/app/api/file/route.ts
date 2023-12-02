import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
	console.log("res", res);

	return NextResponse.json({ name: "File uploaded" });
}
