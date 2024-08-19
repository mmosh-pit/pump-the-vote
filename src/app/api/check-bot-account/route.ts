import { db } from "@/lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const collection = db.collection("users");

  const { searchParams } = new URL(req.url);
  const param = searchParams.get("telegramId");

  if (param === "undefined" || !param) {
    return NextResponse.json(false, { status: 200 });
  }

  const user = await collection.findOne({
    telegramId: Number(param),
  });

  return NextResponse.json(!!user, {
    status: 200,
  });
}
