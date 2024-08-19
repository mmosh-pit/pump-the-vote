import { db } from "@/lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const collection = db.collection("mmosh-app-options");

  const data = await req.json();

  const optionResult = await collection.findOne({
    name: data.name,
  });

  if (optionResult) {
    await collection.updateOne(
      {
        name: data.name,
      },
      {
        $set: {
          value: data.value,
        },
      },
    );
    return NextResponse.json("", {
      status: 200,
    });
  }

  await collection.insertOne({
    name: data.name,
    value: data.value,
  });

  return NextResponse.json("", { status: 200 });
}
