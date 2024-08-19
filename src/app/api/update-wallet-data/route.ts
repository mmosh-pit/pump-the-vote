import { db } from "@/lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const collection = db.collection("mmosh-app-profiles");

  const { field, value, wallet } = await req.json();

  const user = await collection.findOne({
    wallet,
  });

  if (user) {
    await collection.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          [field]: value,
        },
      },
    );
    return NextResponse.json("", { status: 200 });
  } else {
    await collection.insertOne({
      wallet,
      [field]: value,
    });
    return NextResponse.json("", { status: 200 });
  }
}
