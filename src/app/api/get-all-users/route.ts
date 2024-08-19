import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongoClient";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const { searchParams } = new URL(req.url);
  const skip = searchParams.get("skip");
  const searchText = searchParams.get("searchText") as string;

  if (!skip) {
    return NextResponse.json("Invalid Payload", { status: 400 });
  }

  const filter: any = {
    profile: {
      $exists: true,
    },
    profilenft: {
      $exists: true,
    },
  };

  if (searchText) {
    searchText.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");

    filter["$or"] = [
      {
        "profile.username": { $regex: searchText, $options: "i" },
      },
      {
        "profile.name": { $regex: searchText, $options: "i" },
      },
    ];
  }

  const data = await db
    .collection("mmosh-app-profiles")
    .find(filter, {
      projection: {
        wallet: 1,
        profile: 1,
        telegram: 1,
        twitter: 1,
        royalty: { $ifNull: ["$royalty", 0] },
        profilenft: { $ifNull: ["$profilenft", null] },
      },
      sort: { "profile.seniority": -1, profilenft: -1 },
      skip: Number(skip),
      limit: 10,
    })
    .toArray();

  const result = {
    totalAccounts: 0,
    totalPoints: 0,
    users: data,
  };

  data.forEach((row) => {
    result.totalPoints += row.telegram?.points || 0;
  });

  result.totalAccounts = data.length;

  return NextResponse.json(result, {
    status: 200,
  });
}
