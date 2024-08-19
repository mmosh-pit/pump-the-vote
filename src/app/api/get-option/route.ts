import { db } from "@/lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const collection = db.collection("mmosh-app-options");

  const { searchParams } = new URL(req.url);
  const param = searchParams.get("name");

  const optionValue = await collection.findOne({
    name: param,
  });
  if (optionValue) {
    return NextResponse.json(optionValue.value, {
      status: 200,
    });
  } else {
    return NextResponse.json("", {
      status: 200,
    });
  }
}
