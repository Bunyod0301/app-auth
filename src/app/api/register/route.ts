import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import connectMongoDB from "../../../../libs/mongodb";
import UsersAuth from "../../../../models/UsersAuth";

export async function POST(req: any) {
  try {
    const {name, email, password} = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10)
    await connectMongoDB();
    await UsersAuth.create({name, email, password:hashedPassword})
    

    return NextResponse.json({message: "USer registered"}, {status: 201})

  } catch(error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user" },
      { status: 500 }
    )
  }
}