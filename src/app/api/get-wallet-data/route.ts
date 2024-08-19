import { db } from "@/lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const collection = db.collection("mmosh-app-profiles");

  const { searchParams } = new URL(req.url);
  const param = searchParams.get("wallet");

  const user = await collection.findOne({
    wallet: param,
  });

  return NextResponse.json(user, {
    status: 200,
  });
}
