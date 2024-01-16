import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import UsersAuth from "../../../../models/UsersAuth";
import { getServerSession } from "next-auth";
import bcrypt from 'bcryptjs'
export async function GET() {
  const session = await getServerSession();
  if(!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  await connectMongoDB();
  const users = await UsersAuth.find();
  return NextResponse.json({users})
}

export async function POST(req: any) {
  const session = await getServerSession();
  if(!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
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




// import { NextResponse } from "next/server";
// import connectMongoDB from "../../../../libs/mongodb";
// import UsersAuth from "../../../../models/UsersAuth";

// export async function GET(req: any) {
//   try {
//     // Check if the request contains a valid JWT token
//     const apiKey = req.headers.get("Authorization");

//     // Add additional validation for the token if needed
//     if (apiKey !== process.env.NEXTAUTH_SECRET) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     await connectMongoDB();
//     const users = await UsersAuth.find();
    
//     const jsonResponse = new NextResponse(JSON.stringify({ users }), {
//       headers: { "Content-Type": "application/json" },
//     });

//     return jsonResponse;
//   } catch (error) {
//     console.error("Error:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }


