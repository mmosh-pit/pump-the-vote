import { db } from "@/lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const historyCollection = db.collection("mmosh-app-royalty");

  const { sender, receivers, coin } = await req.json();

  for (let index = 0; index < receivers.length; index++) {
    const element = receivers[index];
    const receiver = element.receiver;
    const amount = element.amount;

    await historyCollection.insertOne({
      sender: sender,
      receiver: receiver,
      amount: amount,
      coin,
      created_date: new Date(),
      updated_date: new Date(),
    });
  }
  return NextResponse.json("", { status: 200 });
}
