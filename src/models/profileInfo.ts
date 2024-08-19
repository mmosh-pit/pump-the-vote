type ProfileLineage = {
  promoter: string;
  promoterprofile: string;
  recruiter: string;
  recruiterprofile: string;
  scout: string;
  scoutprofile: string;
  originator: string;
  originatorprofile: string;
};

type Profile = {
  name: string;
  address: string;
  image: string;
};

export type ProfileInfo = {
  mmoshBalance: number;
  usdcBalance: number;
  solBalance: number;
  genesisToken: string;
  activationToken: string;
  profileLineage: ProfileLineage;
  generation: string;
  firstTimeInvitation: boolean;
  quota: number;
  activationTokenBalance: number;
  profile: Profile;
};
