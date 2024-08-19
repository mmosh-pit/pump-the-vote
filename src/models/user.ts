export type User = {
  wallet: string;
  profile: Profile;
  telegram: Telegram;
  twitter: Twitter;
  profilenft: string;
  royalty: number;
};

type Profile = {
  name: string;
  username: string;
  bio: string;
  image: string;
  pronouns: string;
  seniority: number;
  descriptor: string;
  nouns: string;
};

type Telegram = {
  id: number;
  firstName: string;
  username: string;
  points: number;
};

type Twitter = {
  id: string;
  name: string;
  username: string;
  providerId: string;
};
