interface CliffVesting {
  months: number;
  percentage: number;
}

interface Tokenomics {
  _id: string;
  type: string;
  value: number;
  cliff: CliffVesting;
  vesting: CliffVesting;
  projectkey: string;
}

interface Community {
  _id: string;
  name: string;
  communitykey: string;
  projectkey: string;
}

interface Coin {
  _id: string;
  name: string;
  symbol: string;
  image: string;
  key: string;
  desc: string;
  supply: number;
  creator: string;
  listingprice: number;
  projectkey: string;
}

interface Profile {
  _id: string;
  name: string;
  profilekey: string;
  role: string;
  projectkey: string;
}

interface Pass {
  _id: string;
  name: string;
  symbol: string;
  image: string;
  key: string;
  desc: string;
  price: number;
  supply: number;
  discount: number;
  promoterroyality: number;
  scoutroyalty: number;
  creator: string;
  redemptiondate: string;
  projectkey: string;
}

export interface Project {
  _id: string;
  name: string;
  symbol: string;
  desc: string;
  image: string;
  key: string;
  price: number;
  presalesupply: number;
  minpresalesupply: number;
  presalestartdate: string;
  presaleenddate: string;
  dexlistingdate: string;
  coins: Coin[];
  community: Community[];
  profiles: Profile[];
  tokenomics: Tokenomics[];
  pass: Pass[];
}
