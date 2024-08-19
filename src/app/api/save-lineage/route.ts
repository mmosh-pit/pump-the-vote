import { db } from "@/lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const collection = db.collection("mmosh-app-profiles");
  const gensisCollection = db.collection("mmosh-app-lineage");

  const { profile, lineage, wallet } = await req.json();

  const user = await collection.findOne({
    wallet: wallet,
  });

  gensisCollection.insertOne({
    profile: profile,
    lineage: lineage,
    created_date: new Date(),
    updated_date: new Date(),
  });

  if (user) {
    await collection.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          profilenft: profile,
        },
      },
    );
    return NextResponse.json("", { status: 200 });
  } else {
    await collection.insertOne({
      wallet: wallet,
      profilenft: profile,
    });
    return NextResponse.json("", { status: 200 });
  }
}
