import { NextResponse } from "next/server";
import { connectDb } from "../../../../../mongodb";

const client = await connectDb();
const db = client.db("react_to_dos");

export async function DELETE() {
  try{
    const result = await db.collection('to_dos').deleteMany({completed: true})
    return NextResponse.json(
      { message: "Todos deleted successfully", 
        deletedCount: result.deletedCount
      }, { status: 200 });
  }catch(error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete todos" }, { status: 500 });
  }
}