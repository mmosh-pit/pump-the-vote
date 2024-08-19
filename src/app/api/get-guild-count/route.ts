import { db } from "@/lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const collection = db.collection("mmosh-app-lineage");

  const { searchParams } = new URL(req.url);
  const param = searchParams.get("address");

  if (!param) {
    return NextResponse.json("Invalid Payload", { status: 400 });
  }

  const [promotors, scouts, recruitors, originators] = await Promise.all([
    collection.countDocuments({ "lineage.promotor": param }),
    collection.countDocuments({ "lineage.scout": param }),
    collection.countDocuments({ "lineage.recruitors": param }),
    collection.countDocuments({ "lineage.originators": param }),
  ]);

  return NextResponse.json(
    { promotors, scouts, recruitors, originators },
    {
      status: 200,
    },
  );
}
