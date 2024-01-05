import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import UsersAuth from "../../../../models/UsersAuth";

export async function POST(req:any) {
  try {
    await connectMongoDB();
    const {email} = await req.json();
    const user = await UsersAuth.findOne({email}).select("_id");
    console.log("user", user);
    return NextResponse.json({user});
  } catch(error) {
    console.log(error);
  }
}