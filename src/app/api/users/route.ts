import { connectDb } from "../../../../mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await connectDb();
    const db = client.db("walking_db");
    const walks = await db.collection("users").find({}).toArray();

    return NextResponse.json(walks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     const client = await clientPromise;
//     const db = client.db("my_local_db");
//     const result = await db.collection("walks").insertOne(data);

//     return NextResponse.json(result, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to create walk" }, { status: 500 });
//   }
// }
