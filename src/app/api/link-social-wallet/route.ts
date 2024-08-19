import { db } from "@/lib/mongoClient";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token, wallet } = await req.json();

  const linksCollection = db.collection("temporal-links");
  const mmoshCollection = db.collection("mmosh-app-profiles");
  const usersCollection = db.collection("users");

  const linkData = await linksCollection.findOne({ token });

  if (!linkData) {
    return NextResponse.json("", { status: 200 });
  }

  const userData = await usersCollection.findOne({
    addressPublicKey: linkData.addressPublicKey,
  });

  if (!userData) {
    return NextResponse.json("", { status: 200 });
  }

  const existingData = await mmoshCollection.findOne({
    wallet,
  });

  if (existingData) {
    return NextResponse.json(existingData, { status: 200 });
  }

  const data = {
    telegram: {
      id: userData.telegramId,
      username: userData.username,
      firstName: userData.firstName,
      points: userData.points + 250,
    },
    wallet,
  };

  const newData = await mmoshCollection.insertOne(data);

  await linksCollection.deleteOne({ _id: linkData._id });

  await usersCollection.updateOne(
    { _id: userData._id },
    { $inc: { points: 250 } },
  );

  const text =
    "Congratulations! You’ve verified your Social Wallet on the MMOSH app.\n\nThe MMOSH is an ecosystem of connected crypto communities. Find your tribe, share your vibe. Make money fun!!\n\nWe recommend you get started in “Enter Quests.” This initial quest will walk you step by step through the important sequences of securing your account, joining token-gated communities, becoming a member of the DAO, creating your own coins and forming your own communities.\n\nWhen you enter a quest, you’ll earn tokens for each task you complete!";

  await axios.post(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
    {
      chat_id: userData.telegramId,
      text,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Enter Quests 🗺️", callback_data: "quests" },
            {
              text: "Check Bags 💰",
              web_app: {
                url: `${process.env.WEB_LINK}/bags?user=${userData.telegramId}`,
              },
            },
          ],
          [
            { text: "Join Groups 👋", url: "https://t.me/mmoshpit" },
            {
              text: "Display Status 🏆",
              web_app: {
                url: `${process.env.WEB_LINK}/directory?user=${userData.telegramId}`,
              },
            },
          ],
          [
            {
              text: "Send Tokens 💸",
              web_app: {
                url: `${process.env.WEB_LINK}/send_tokens?user=${userData.telegramId}`,
              },
            },
            {
              text: "Swap Coins 📈",
              web_app: {
                url: `${process.env.WEB_LINK}/swap_coins?user=${userData.telegramId}`,
              },
            },
          ],
          [
            { text: "Create Coins 🪙", callback_data: "coins" },
            { text: "Form Communities 🤝", callback_data: "communities" },
          ],
          [{ text: "Change Settings ⚙️", callback_data: "settings" }],
        ],
      },
    },
  );

  return NextResponse.json(
    { ...data, id: newData.insertedId },
    { status: 200 },
  );
}
