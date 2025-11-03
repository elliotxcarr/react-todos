import { ObjectId } from "mongodb";
import { connectDb } from "../../../../mongodb";
import { NextResponse } from "next/server";

const client = await connectDb();
const db = client.db("react_to_dos");

export async function GET() {
  try {
    const toDos = await db.collection("to_dos").find({}).toArray();
    return NextResponse.json(toDos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch To-Dos" }, { status: 500 });
  }
}

export async function POST(req:Request) {
  try{
    const data = await req.json();
    const result = await db.collection('to_dos').insertOne(data);

    const newTodo = await db.collection("to_dos").findOne(
      {_id: new ObjectId(result.insertedId)}
    )
    return NextResponse.json(newTodo, { status: 201 });
  }
  catch (error){
    console.log(error);
    return NextResponse.json({ error: "Failed to add To-Do" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try{
    const {id} = await req.json();
    const objId = ObjectId.createFromHexString(id);
    const toDo = await db.collection('to_dos').findOne({_id: objId})
    if (!toDo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    const result = await db.collection('to_dos').updateOne({ _id: objId }, { $set: { completed: !toDo.completed }});
    return NextResponse.json(result, { status: 200 });
  } catch(err) {
    console.error(err)
    return NextResponse.json({error: "Failed to toggle to-do"}, { status: 500 });
  }
}