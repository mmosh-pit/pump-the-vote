export type Mmoshforge = {
  address: string;
  metadata: {
    name: "mmoshforge";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "buyLaunchPass";
      discriminator: [34, 233, 225, 139, 123, 211, 118, 78];
      accounts: [
        {
          name: "receiver";
          writable: true;
          signer: true;
        },
        {
          name: "receiverAta";
          writable: true;
        },
        {
          name: "owner";
        },
        {
          name: "launcPassState";
          writable: true;
        },
        {
          name: "mint";
          writable: true;
        },
        {
          name: "tokenProgram";
        },
        {
          name: "associatedTokenProgram";
        },
        {
          name: "systemProgram";
        },
      ];
      args: [];
    },
    {
      name: "buyNativeV0";
      discriminator: [161, 81, 234, 221, 249, 227, 95, 20];
      accounts: [
        {
          name: "common";
          accounts: [
            {
              name: "tokenBonding";
              writable: true;
            },
            {
              name: "curve";
            },
            {
              name: "baseMint";
            },
            {
              name: "targetMint";
              writable: true;
            },
            {
              name: "baseStorage";
              writable: true;
            },
            {
              name: "buyBaseRoyalties";
              writable: true;
            },
            {
              name: "destination";
              writable: true;
            },
            {
              name: "buyTargetRoyalties";
              writable: true;
            },
            {
              name: "tokenProgram";
            },
            {
              name: "clock";
            },
          ];
        },
        {
          name: "source";
          writable: true;
          signer: true;
        },
        {
          name: "state";
        },
        {
          name: "wrappedSolMint";
          writable: true;
        },
        {
          name: "mintAuthority";
        },
        {
          name: "solStorage";
          writable: true;
        },
        {
          name: "systemProgram";
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "buyV0Args";
            };
          };
        },
      ];
    },
    {
      name: "buyV1";
      discriminator: [69, 255, 7, 52, 119, 228, 164, 6];
      accounts: [
        {
          name: "common";
          accounts: [
            {
              name: "tokenBonding";
              writable: true;
            },
            {
              name: "curve";
            },
            {
              name: "baseMint";
            },
            {
              name: "targetMint";
              writable: true;
            },
            {
              name: "baseStorage";
              writable: true;
            },
            {
              name: "buyBaseRoyalties";
              writable: true;
            },
            {
              name: "destination";
              writable: true;
            },
            {
              name: "buyTargetRoyalties";
              writable: true;
            },
            {
              name: "tokenProgram";
            },
            {
              name: "clock";
            },
          ];
        },
        {
          name: "state";
        },
        {
          name: "source";
          writable: true;
        },
        {
          name: "sourceAuthority";
          signer: true;
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "buyV0Args";
            };
          };
        },
      ];
    },
    {
      name: "buyWrappedSolV0";
      discriminator: [147, 243, 74, 130, 34, 114, 38, 33];
      accounts: [
        {
          name: "state";
        },
        {
          name: "wrappedSolMint";
          writable: true;
        },
        {
          name: "mintAuthority";
        },
        {
          name: "solStorage";
          writable: true;
        },
        {
          name: "source";
          writable: true;
          signer: true;
        },
        {
          name: "destination";
          writable: true;
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "buyWrappedSolV0Args";
            };
          };
        },
      ];
    },
    {
      name: "closeTokenBondingV0";
      discriminator: [160, 94, 159, 74, 193, 107, 122, 168];
      accounts: [
        {
          name: "refund";
          writable: true;
        },
        {
          name: "tokenBonding";
          writable: true;
        },
        {
          name: "generalAuthority";
          signer: true;
        },
        {
          name: "targetMint";
          writable: true;
        },
        {
          name: "baseStorage";
          writable: true;
        },
        {
          name: "tokenProgram";
        },
      ];
      args: [];
    },
    {
      name: "createCollection";
      discriminator: [156, 251, 92, 54, 233, 2, 16, 82];
      accounts: [
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "mainState";
          writable: true;
        },
        {
          name: "collection";
          writable: true;
        },
        {
          name: "adminAta";
          writable: true;
        },
        {
          name: "collectionState";
          writable: true;
        },
        {
          name: "collectionMetadata";
          writable: true;
        },
        {
          name: "collectionEdition";
          writable: true;
        },
        {
          name: "collectionAuthorityRecord";
          writable: true;
        },
        {
          name: "sysvarInstructions";
        },
        {
          name: "parentCollection";
          writable: true;
        },
        {
          name: "parentCollectionMetadata";
          writable: true;
        },
        {
          name: "parentCollectionEdition";
          writable: true;
        },
        {
          name: "mplProgram";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "associatedTokenProgram";
        },
        {
          name: "systemProgram";
        },
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "uri";
          type: "string";
        },
        {
          name: "collectionType";
          type: "string";
        },
      ];
    },
    {
      name: "createCurveV0";
      discriminator: [205, 203, 250, 201, 156, 135, 114, 221];
      accounts: [
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "curve";
          writable: true;
        },
        {
          name: "systemProgram";
        },
        {
          name: "rent";
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "createCurveV0Args";
            };
          };
        },
      ];
    },
    {
      name: "createPassToken";
      discriminator: [51, 165, 125, 185, 174, 69, 218, 41];
      accounts: [
        {
          name: "minter";
          writable: true;
          signer: true;
        },
        {
          name: "minterProfileAta";
          writable: true;
        },
        {
          name: "receiverAta";
          writable: true;
        },
        {
          name: "project";
        },
        {
          name: "mainState";
          writable: true;
        },
        {
          name: "activationToken";
          writable: true;
        },
        {
          name: "activationTokenState";
          writable: true;
        },
        {
          name: "profile";
        },
        {
          name: "profileState";
          writable: true;
        },
        {
          name: "tokenProgram";
        },
        {
          name: "associatedTokenProgram";
        },
        {
          name: "systemProgram";
        },
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
      ];
    },
    {
      name: "initActivationToken";
      discriminator: [242, 105, 199, 89, 203, 143, 3, 220];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "userProfileAta";
          writable: true;
        },
        {
          name: "userActivationTokenAta";
          writable: true;
        },
        {
          name: "mainState";
          writable: true;
        },
        {
          name: "activationToken";
          writable: true;
          signer: true;
        },
        {
          name: "activationTokenState";
          writable: true;
        },
        {
          name: "activationTokenMetadata";
          writable: true;
        },
        {
          name: "profile";
        },
        {
          name: "profileState";
          writable: true;
        },
        {
          name: "profileMetadata";
          writable: true;
        },
        {
          name: "profileEdition";
          writable: true;
        },
        {
          name: "profileCollectionAuthorityRecord";
          writable: true;
        },
        {
          name: "parentCollection";
          writable: true;
        },
        {
          name: "parentCollectionMetadata";
          writable: true;
        },
        {
          name: "parentCollectionEdition";
          writable: true;
        },
        {
          name: "sysvarInstructions";
        },
        {
          name: "mplProgram";
        },
        {
          name: "associatedTokenProgram";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
        },
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "uri";
          type: "string";
        },
      ];
    },
    {
      name: "initLaunchPass";
      discriminator: [67, 166, 228, 171, 62, 248, 104, 29];
      accounts: [
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "mint";
          writable: true;
          signer: true;
        },
        {
          name: "launchPass";
          writable: true;
        },
        {
          name: "mintMetadata";
          writable: true;
        },
        {
          name: "sysvarInstructions";
        },
        {
          name: "mplProgram";
        },
        {
          name: "associatedTokenProgram";
        },
        {
          name: "systemProgram";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "rent";
        },
        {
          name: "clock";
        },
      ];
      args: [
        {
          name: "redeemAmount";
          type: "u64";
        },
        {
          name: "redeemDate";
          type: "u64";
        },
        {
          name: "cost";
          type: "u64";
        },
        {
          name: "distribution";
          type: {
            defined: {
              name: "mintingCostDistribution";
            };
          };
        },
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "uri";
          type: "string";
        },
      ];
    },
    {
      name: "initMainState";
      discriminator: [33, 233, 208, 22, 125, 72, 253, 30];
      accounts: [
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "mainState";
          writable: true;
        },
        {
          name: "systemProgram";
        },
      ];
      args: [
        {
          name: "input";
          type: {
            defined: {
              name: "mainStateInput";
            };
          };
        },
      ];
    },
    {
      name: "initPassToken";
      discriminator: [104, 46, 125, 140, 102, 252, 213, 92];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "userProfileAta";
          writable: true;
        },
        {
          name: "userActivationTokenAta";
          writable: true;
        },
        {
          name: "project";
        },
        {
          name: "mainState";
          writable: true;
        },
        {
          name: "parentMainState";
          writable: true;
        },
        {
          name: "activationToken";
          writable: true;
          signer: true;
        },
        {
          name: "activationTokenState";
          writable: true;
        },
        {
          name: "activationTokenMetadata";
          writable: true;
        },
        {
          name: "profile";
        },
        {
          name: "profileState";
          writable: true;
        },
        {
          name: "profileMetadata";
          writable: true;
        },
        {
          name: "profileEdition";
          writable: true;
        },
        {
          name: "profileCollectionAuthorityRecord";
          writable: true;
        },
        {
          name: "parentCollection";
          writable: true;
        },
        {
          name: "parentCollectionMetadata";
          writable: true;
        },
        {
          name: "parentCollectionEdition";
          writable: true;
        },
        {
          name: "sysvarInstructions";
        },
        {
          name: "mplProgram";
        },
        {
          name: "associatedTokenProgram";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
        },
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "uri";
          type: "string";
        },
      ];
    },
    {
      name: "initVault";
      discriminator: [77, 79, 85, 150, 33, 217, 52, 106];
      accounts: [
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "ownerAta";
          writable: true;
        },
        {
          name: "authority";
        },
        {
          name: "stakeKey";
        },
        {
          name: "mint";
        },
        {
          name: "vault";
          writable: true;
        },
        {
          name: "tokenAccount";
          writable: true;
        },
        {
          name: "associatedTokenProgram";
        },
        {
          name: "systemProgram";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "rent";
        },
        {
          name: "clock";
        },
      ];
      args: [
        {
          name: "lockDate";
          type: "u64";
        },
        {
          name: "value";
          type: "u64";
        },
      ];
    },
    {
      name: "initializeSolStorageV0";
      discriminator: [20, 26, 34, 233, 185, 171, 12, 98];
      accounts: [
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "state";
          writable: true;
        },
        {
          name: "solStorage";
        },
        {
          name: "wrappedSolMint";
        },
        {
          name: "mintAuthority";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
        },
        {
          name: "rent";
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "initializeSolStorageV0Args";
            };
          };
        },
      ];
    },
    {
      name: "initializeTokenBondingV0";
      discriminator: [4, 205, 255, 32, 185, 121, 134, 61];
      accounts: [
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "curve";
        },
        {
          name: "tokenBonding";
          writable: true;
        },
        {
          name: "baseMint";
        },
        {
          name: "targetMint";
        },
        {
          name: "baseStorage";
        },
        {
          name: "buyBaseRoyalties";
        },
        {
          name: "buyTargetRoyalties";
        },
        {
          name: "sellBaseRoyalties";
        },
        {
          name: "sellTargetRoyalties";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
        },
        {
          name: "rent";
        },
        {
          name: "clock";
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "initializeTokenBondingV0Args";
            };
          };
        },
      ];
    },
    {
      name: "mintActivationToken";
      discriminator: [234, 158, 56, 192, 194, 164, 9, 244];
      accounts: [
        {
          name: "minter";
          writable: true;
          signer: true;
        },
        {
          name: "minterProfileAta";
          writable: true;
        },
        {
          name: "receiverAta";
          writable: true;
        },
        {
          name: "mainState";
          writable: true;
        },
        {
          name: "activationToken";
          writable: true;
        },
        {
          name: "activationTokenState";
          writable: true;
        },
        {
          name: "profile";
        },
        {
          name: "profileState";
          writable: true;
        },
        {
          name: "tokenProgram";
        },
        {
          name: "associatedTokenProgram";
        },
        {
          name: "systemProgram";
        },
        {
          name: "parentProfile";
        },
        {
          name: "grandParentProfile";
        },
        {
          name: "greatGrandParentProfile";
        },
        {
          name: "ggreateGrandParentProfile";
        },
        {
          name: "genesisProfile";
        },
        {
          name: "parentProfileState";
          writable: true;
        },
        {
          name: "oposToken";
        },
        {
          name: "currentParentProfileHolderAta";
        },
        {
          name: "currentGrandParentProfileHolderAta";
        },
        {
          name: "currentGreatGrandParentProfileHolderAta";
        },
        {
          name: "currentGgreatGrandParentProfileHolderAta";
        },
        {
          name: "currentGenesisProfileHolderAta";
        },
        {
          name: "currentParentProfileHolder";
        },
        {
          name: "currentGrandParentProfileHolder";
        },
        {
          name: "currentGreatGrandParentProfileHolder";
        },
        {
          name: "currentGgreatGrandParentProfileHolder";
        },
        {
          name: "currentGenesisProfileHolder";
        },
        {
          name: "userOposAta";
          writable: true;
        },
        {
          name: "parentProfileHolderOposAta";
          writable: true;
        },
        {
          name: "grandParentProfileHolderOposAta";
          writable: true;
        },
        {
          name: "greatGrandParentProfileHolderOposAta";
          writable: true;
        },
        {
          name: "ggreatGrandParentProfileHolderOposAta";
          writable: true;
        },
        {
          name: "genesisProfileHolderOposAta";
          writable: true;
        },
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
      ];
    },
    {
      name: "mintGenesisPass";
      discriminator: [14, 146, 113, 105, 81, 191, 143, 226];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "mplProgram";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "associatedTokenProgram";
        },
        {
          name: "systemProgram";
        },
        {
          name: "profile";
          writable: true;
          signer: true;
        },
        {
          name: "mainState";
          writable: true;
        },
        {
          name: "parentMainState";
          writable: true;
        },
        {
          name: "userProfileAta";
          writable: true;
        },
        {
          name: "profileState";
          writable: true;
        },
        {
          name: "profileMetadata";
          writable: true;
        },
        {
          name: "profileEdition";
          writable: true;
        },
        {
          name: "collection";
          writable: true;
        },
        {
          name: "collectionState";
          writable: true;
        },
        {
          name: "collectionMetadata";
          writable: true;
        },
        {
          name: "collectionEdition";
          writable: true;
        },
        {
          name: "sysvarInstructions";
        },
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "uriHash";
          type: "string";
        },
        {
          name: "input";
          type: {
            defined: {
              name: "mainStateInput";
            };
          };
        },
      ];
    },
    {
      name: "mintGenesisProfile";
      discriminator: [213, 67, 157, 90, 201, 241, 157, 246];
      accounts: [
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "mainState";
          writable: true;
        },
        {
          name: "profile";
          writable: true;
        },
        {
          name: "adminAta";
          writable: true;
        },
        {
          name: "profileState";
          writable: true;
        },
        {
          name: "profileMetadata";
          writable: true;
        },
        {
          name: "profileEdition";
          writable: true;
        },
        {
          name: "collection";
          writable: true;
        },
        {
          name: "collectionState";
          writable: true;
        },
        {
          name: "collectionMetadata";
          writable: true;
        },
        {
          name: "collectionEdition";
          writable: true;
        },
        {
          name: "collectionAuthorityRecord";
          writable: true;
        },
        {
          name: "subCollectionAuthorityRecord";
          writable: true;
        },
        {
          name: "sysvarInstructions";
        },
        {
          name: "mplProgram";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "associatedTokenProgram";
        },
        {
          name: "systemProgram";
        },
      ];
      args: [
        {
          name: "input";
          type: {
            defined: {
              name: "mintProfileByAdminInput";
            };
          };
        },
      ];
    },
    {
      name: "mintPassByAt";
      discriminator: [155, 164, 136, 144, 190, 184, 210, 221];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "mplProgram";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "associatedTokenProgram";
        },
        {
          name: "systemProgram";
        },
        {
          name: "oposToken";
        },
        {
          name: "userActivationTokenAta";
          writable: true;
        },
        {
          name: "project";
        },
        {
          name: "mainState";
          writable: true;
        },
        {
          name: "parentMainState";
          writable: true;
        },
        {
          name: "activationToken";
          writable: true;
        },
        {
          name: "profile";
          writable: true;
          signer: true;
        },
        {
          name: "userProfileAta";
          writable: true;
        },
        {
          name: "profileState";
          writable: true;
        },
        {
          name: "profileMetadata";
          writable: true;
        },
        {
          name: "profileEdition";
          writable: true;
        },
        {
          name: "parentProfileState";
          writable: true;
        },
        {
          name: "collection";
          writable: true;
        },
        {
          name: "collectionMetadata";
          writable: true;
        },
        {
          name: "collectionEdition";
          writable: true;
        },
        {
          name: "sysvarInstructions";
        },
        {
          name: "parentProfile";
        },
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "uriHash";
          type: "string";
        },
      ];
    },
    {
      name: "mintProfileByAt";
      discriminator: [100, 237, 109, 44, 36, 6, 29, 147];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "mplProgram";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "associatedTokenProgram";
        },
        {
          name: "systemProgram";
        },
        {
          name: "oposToken";
        },
        {
          name: "userActivationTokenAta";
          writable: true;
        },
        {
          name: "mainState";
          writable: true;
        },
        {
          name: "activationToken";
          writable: true;
        },
        {
          name: "profile";
          writable: true;
          signer: true;
        },
        {
          name: "userProfileAta";
          writable: true;
        },
        {
          name: "profileState";
          writable: true;
        },
        {
          name: "profileMetadata";
          writable: true;
        },
        {
          name: "profileEdition";
          writable: true;
        },
        {
          name: "parentProfileState";
          writable: true;
        },
        {
          name: "collection";
          writable: true;
        },
        {
          name: "collectionMetadata";
          writable: true;
        },
        {
          name: "collectionEdition";
          writable: true;
        },
        {
          name: "sysvarInstructions";
        },
        {
          name: "parentProfile";
        },
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "uriHash";
          type: "string";
        },
      ];
    },
    {
      name: "redeemLaunchPass";
      discriminator: [219, 229, 176, 81, 165, 34, 169, 3];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "launchToken";
          writable: true;
        },
        {
          name: "owner";
        },
        {
          name: "launcPassState";
          writable: true;
        },
        {
          name: "stakeKey";
        },
        {
          name: "vault";
          writable: true;
        },
        {
          name: "userLaunchTokenAta";
          writable: true;
        },
        {
          name: "sysvarInstructions";
        },
        {
          name: "receiverAta";
          writable: true;
        },
        {
          name: "mint";
        },
        {
          name: "tokenAccount";
          writable: true;
        },
        {
          name: "mplProgram";
        },
        {
          name: "associatedTokenProgram";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
        },
        {
          name: "rent";
        },
        {
          name: "clock";
        },
      ];
      args: [];
    },
    {
      name: "resetMain";
      discriminator: [114, 169, 116, 115, 81, 124, 80, 201];
      accounts: [
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "mainState";
          writable: true;
        },
        {
          name: "systemProgram";
        },
      ];
      args: [];
    },
    {
      name: "sellNativeV0";
      discriminator: [29, 129, 234, 157, 18, 252, 113, 179];
      accounts: [
        {
          name: "common";
          accounts: [
            {
              name: "tokenBonding";
              writable: true;
            },
            {
              name: "curve";
            },
            {
              name: "baseMint";
            },
            {
              name: "targetMint";
              writable: true;
            },
            {
              name: "baseStorage";
              writable: true;
            },
            {
              name: "sellBaseRoyalties";
              writable: true;
            },
            {
              name: "source";
              writable: true;
            },
            {
              name: "sourceAuthority";
              signer: true;
            },
            {
              name: "sellTargetRoyalties";
              writable: true;
            },
            {
              name: "tokenProgram";
            },
            {
              name: "clock";
            },
          ];
        },
        {
          name: "destination";
          writable: true;
        },
        {
          name: "state";
        },
        {
          name: "wrappedSolMint";
          writable: true;
        },
        {
          name: "mintAuthority";
        },
        {
          name: "solStorage";
          writable: true;
        },
        {
          name: "systemProgram";
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "sellV0Args";
            };
          };
        },
      ];
    },
    {
      name: "sellV1";
      discriminator: [19, 129, 236, 31, 99, 212, 19, 208];
      accounts: [
        {
          name: "common";
          accounts: [
            {
              name: "tokenBonding";
              writable: true;
            },
            {
              name: "curve";
            },
            {
              name: "baseMint";
            },
            {
              name: "targetMint";
              writable: true;
            },
            {
              name: "baseStorage";
              writable: true;
            },
            {
              name: "sellBaseRoyalties";
              writable: true;
            },
            {
              name: "source";
              writable: true;
            },
            {
              name: "sourceAuthority";
              signer: true;
            },
            {
              name: "sellTargetRoyalties";
              writable: true;
            },
            {
              name: "tokenProgram";
            },
            {
              name: "clock";
            },
          ];
        },
        {
          name: "state";
        },
        {
          name: "destination";
          writable: true;
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "sellV0Args";
            };
          };
        },
      ];
    },
    {
      name: "sellWrappedSolV0";
      discriminator: [121, 226, 81, 179, 229, 22, 180, 12];
      accounts: [
        {
          name: "state";
        },
        {
          name: "wrappedSolMint";
          writable: true;
        },
        {
          name: "solStorage";
          writable: true;
        },
        {
          name: "source";
          writable: true;
        },
        {
          name: "owner";
          signer: true;
        },
        {
          name: "destination";
          writable: true;
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "sellWrappedSolV0Args";
            };
          };
        },
      ];
    },
    {
      name: "setCommonLut";
      discriminator: [246, 61, 227, 31, 125, 134, 108, 56];
      accounts: [
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "mainState";
          writable: true;
        },
      ];
      args: [
        {
          name: "lut";
          type: "pubkey";
        },
      ];
    },
    {
      name: "stakeVault";
      discriminator: [5, 41, 184, 37, 11, 213, 172, 234];
      accounts: [
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "ownerAta";
          writable: true;
        },
        {
          name: "mint";
        },
        {
          name: "authority";
        },
        {
          name: "stakeKey";
        },
        {
          name: "vault";
          writable: true;
        },
        {
          name: "tokenAccount";
          writable: true;
        },
        {
          name: "associatedTokenProgram";
        },
        {
          name: "systemProgram";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "rent";
        },
        {
          name: "clock";
        },
      ];
      args: [
        {
          name: "value";
          type: "u64";
        },
      ];
    },
    {
      name: "transferReservesNativeV0";
      discriminator: [182, 139, 99, 4, 205, 169, 172, 224];
      accounts: [
        {
          name: "common";
          accounts: [
            {
              name: "tokenBonding";
              writable: true;
            },
            {
              name: "reserveAuthority";
              signer: true;
            },
            {
              name: "baseMint";
            },
            {
              name: "baseStorage";
              writable: true;
            },
            {
              name: "tokenProgram";
            },
          ];
        },
        {
          name: "destination";
          writable: true;
        },
        {
          name: "state";
        },
        {
          name: "wrappedSolMint";
          writable: true;
        },
        {
          name: "mintAuthority";
        },
        {
          name: "solStorage";
          writable: true;
        },
        {
          name: "systemProgram";
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "transferReservesV0Args";
            };
          };
        },
      ];
    },
    {
      name: "transferReservesV0";
      discriminator: [7, 142, 255, 166, 164, 247, 159, 157];
      accounts: [
        {
          name: "common";
          accounts: [
            {
              name: "tokenBonding";
              writable: true;
            },
            {
              name: "reserveAuthority";
              signer: true;
            },
            {
              name: "baseMint";
            },
            {
              name: "baseStorage";
              writable: true;
            },
            {
              name: "tokenProgram";
            },
          ];
        },
        {
          name: "destination";
          writable: true;
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "transferReservesV0Args";
            };
          };
        },
      ];
    },
    {
      name: "unstakeVault";
      discriminator: [131, 150, 142, 54, 247, 71, 103, 43];
      accounts: [
        {
          name: "receiver";
          writable: true;
          signer: true;
        },
        {
          name: "receiverAta";
          writable: true;
        },
        {
          name: "mint";
        },
        {
          name: "stakeKey";
        },
        {
          name: "vault";
          writable: true;
        },
        {
          name: "tokenAccount";
          writable: true;
        },
        {
          name: "associatedTokenProgram";
        },
        {
          name: "systemProgram";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "rent";
        },
        {
          name: "clock";
        },
      ];
      args: [
        {
          name: "value";
          type: "u64";
        },
      ];
    },
    {
      name: "updateCurveV0";
      discriminator: [71, 14, 111, 54, 161, 23, 97, 85];
      accounts: [
        {
          name: "tokenBonding";
          writable: true;
        },
        {
          name: "curveAuthority";
          signer: true;
        },
        {
          name: "curve";
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "updateCurveV0Args";
            };
          };
        },
      ];
    },
    {
      name: "updateMainState";
      discriminator: [169, 145, 9, 15, 95, 4, 126, 209];
      accounts: [
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "mainState";
          writable: true;
        },
      ];
      args: [
        {
          name: "input";
          type: {
            defined: {
              name: "mainStateInput";
            };
          };
        },
      ];
    },
    {
      name: "updateMainStateOwner";
      discriminator: [218, 24, 137, 215, 28, 41, 248, 42];
      accounts: [
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "mainState";
          writable: true;
        },
      ];
      args: [
        {
          name: "newOwner";
          type: "pubkey";
        },
      ];
    },
    {
      name: "updateReserveAuthorityV0";
      discriminator: [140, 105, 17, 234, 229, 79, 133, 150];
      accounts: [
        {
          name: "tokenBonding";
          writable: true;
        },
        {
          name: "reserveAuthority";
          signer: true;
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "updateReserveAuthorityV0Args";
            };
          };
        },
      ];
    },
    {
      name: "updateTokenBondingV0";
      discriminator: [10, 181, 83, 74, 124, 211, 123, 48];
      accounts: [
        {
          name: "tokenBonding";
          writable: true;
        },
        {
          name: "generalAuthority";
          signer: true;
        },
        {
          name: "baseMint";
        },
        {
          name: "targetMint";
        },
        {
          name: "buyBaseRoyalties";
        },
        {
          name: "buyTargetRoyalties";
        },
        {
          name: "sellBaseRoyalties";
        },
        {
          name: "sellTargetRoyalties";
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "updateTokenBondingV0Args";
            };
          };
        },
      ];
    },
  ];
  accounts: [
    {
      name: "activationTokenState";
      discriminator: [142, 115, 218, 48, 17, 217, 56, 190];
    },
    {
      name: "collectionState";
      discriminator: [228, 135, 148, 4, 244, 41, 118, 165];
    },
    {
      name: "curveV0";
      discriminator: [77, 25, 232, 252, 138, 96, 1, 172];
    },
    {
      name: "launchPassState";
      discriminator: [159, 151, 191, 15, 7, 153, 187, 180];
    },
    {
      name: "mainState";
      discriminator: [153, 79, 81, 109, 146, 220, 36, 182];
    },
    {
      name: "profileState";
      discriminator: [189, 32, 28, 31, 131, 153, 194, 253];
    },
    {
      name: "programStateV0";
      discriminator: [102, 65, 191, 196, 12, 36, 248, 123];
    },
    {
      name: "tokenBondingV0";
      discriminator: [83, 36, 213, 250, 189, 200, 154, 127];
    },
    {
      name: "vaultState";
      discriminator: [228, 196, 82, 165, 98, 210, 235, 152];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "noMintAuthority";
      msg: "Target mint must have an authority";
    },
    {
      code: 6001;
      name: "invalidMintAuthority";
      msg: "Target mint must have an authority that is a pda of this program";
    },
    {
      code: 6002;
      name: "invalidBaseStorageAuthority";
      msg: "Invalid base storage authority pda or seed did not match canonical seed for base storage authority";
    },
    {
      code: 6003;
      name: "noAuthority";
      msg: "Token bonding does not have an authority";
    },
    {
      code: 6004;
      name: "arithmeticError";
      msg: "Error in precise number arithmetic";
    },
    {
      code: 6005;
      name: "priceTooHigh";
      msg: "Buy price was higher than the maximum buy price. Try increasing max_price or slippage configuration";
    },
    {
      code: 6006;
      name: "priceTooLow";
      msg: "Sell price was lower than the minimum sell price. Try decreasing min_price or increasing slippage configuration";
    },
    {
      code: 6007;
      name: "mintSupplyTooLow";
      msg: "Cannot sell more than the target mint currently has in supply";
    },
    {
      code: 6008;
      name: "sellDisabled";
      msg: "Sell is not enabled on this bonding curve";
    },
    {
      code: 6009;
      name: "notLiveYet";
      msg: "This bonding curve is not live yet";
    },
    {
      code: 6010;
      name: "passedMintCap";
      msg: "Passed the mint cap";
    },
    {
      code: 6011;
      name: "overPurchaseCap";
      msg: "Cannot purchase that many tokens because of purchase cap";
    },
    {
      code: 6012;
      name: "buyFrozen";
      msg: "Buy is frozen on this bonding curve, purchases not allowed";
    },
    {
      code: 6013;
      name: "wrappedSolNotAllowed";
      msg: "Use token bonding wrapped sol via buy_wrapped_sol, sell_wrapped_sol commands. We may one day provide liquid staking rewards on this stored sol.";
    },
    {
      code: 6014;
      name: "invalidCurve";
      msg: "The provided curve is invalid";
    },
    {
      code: 6015;
      name: "invalidMint";
      msg: "An account was provided that did not have the correct mint";
    },
    {
      code: 6016;
      name: "ignoreExternalV1Only";
      msg: "Ignoring external changes is only supported on v1 of buy and sell endpoints. Please upgrade your client";
    },
    {
      code: 6017;
      name: "invalidPad";
      msg: "Cannot pad token bonding without ignoring external reserve and supply changes. This is an advanced feature, incorrect use could lead to insufficient resreves to cover sells";
    },
  ];
  types: [
    {
      name: "activationTokenState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "parentProfile";
            type: "pubkey";
          },
          {
            name: "creator";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "buyTargetAmountV0Args";
      type: {
        kind: "struct";
        fields: [
          {
            name: "targetAmount";
            type: "u64";
          },
          {
            name: "maximumPrice";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "buyV0Args";
      type: {
        kind: "struct";
        fields: [
          {
            name: "buyWithBase";
            type: {
              option: {
                defined: {
                  name: "buyWithBaseV0Args";
                };
              };
            };
          },
          {
            name: "buyTargetAmount";
            type: {
              option: {
                defined: {
                  name: "buyTargetAmountV0Args";
                };
              };
            };
          },
        ];
      };
    },
    {
      name: "buyWithBaseV0Args";
      type: {
        kind: "struct";
        fields: [
          {
            name: "baseAmount";
            type: "u64";
          },
          {
            name: "minimumTargetAmount";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "buyWrappedSolV0Args";
      type: {
        kind: "struct";
        fields: [
          {
            name: "amount";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "collectionState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "genesisProfile";
            type: "pubkey";
          },
          {
            name: "collectionId";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "createCurveV0Args";
      type: {
        kind: "struct";
        fields: [
          {
            name: "definition";
            type: {
              defined: {
                name: "piecewiseCurve";
              };
            };
          },
        ];
      };
    },
    {
      name: "curveV0";
      type: {
        kind: "struct";
        fields: [
          {
            name: "definition";
            type: {
              defined: {
                name: "piecewiseCurve";
              };
            };
          },
        ];
      };
    },
    {
      name: "initializeSolStorageV0Args";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mintAuthorityBumpSeed";
            type: "u8";
          },
          {
            name: "solStorageBumpSeed";
            type: "u8";
          },
          {
            name: "bumpSeed";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "initializeTokenBondingV0Args";
      type: {
        kind: "struct";
        fields: [
          {
            name: "buyBaseRoyaltyPercentage";
            docs: [
              "Percentage of purchases that go to the founder",
              "Percentage Value is (founder_reward_percentage / u32.MAX_VALUE) * 100",
            ];
            type: "u32";
          },
          {
            name: "buyTargetRoyaltyPercentage";
            type: "u32";
          },
          {
            name: "sellBaseRoyaltyPercentage";
            type: "u32";
          },
          {
            name: "sellTargetRoyaltyPercentage";
            type: "u32";
          },
          {
            name: "goLiveUnixTime";
            type: "i64";
          },
          {
            name: "freezeBuyUnixTime";
            type: {
              option: "i64";
            };
          },
          {
            name: "mintCap";
            type: {
              option: "u64";
            };
          },
          {
            name: "purchaseCap";
            type: {
              option: "u64";
            };
          },
          {
            name: "generalAuthority";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "reserveAuthority";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "curveAuthority";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "buyFrozen";
            type: "bool";
          },
          {
            name: "index";
            type: "u16";
          },
          {
            name: "bumpSeed";
            type: "u8";
          },
          {
            name: "sellFrozen";
            type: "bool";
          },
          {
            name: "ignoreExternalReserveChanges";
            docs: [
              "Whether or not to ignore changes to base storage and target supply outside of the curve",
            ];
            type: "bool";
          },
          {
            name: "ignoreExternalSupplyChanges";
            type: "bool";
          },
          {
            name: "initialReservesPad";
            docs: [
              "* Allow starting a curve from a later reserve/supply ratio of ignor reserve and supply changes.\n   *\n   * This allows for things like the LBC where you don't need to provide any initial liquidity",
            ];
            type: "u64";
          },
          {
            name: "initialSupplyPad";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "launchPassState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "cost";
            type: "u64";
          },
          {
            name: "distribution";
            type: {
              defined: {
                name: "mintingCostDistribution";
              };
            };
          },
          {
            name: "redeemDate";
            type: "u64";
          },
          {
            name: "redeemAmount";
            type: "u64";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "lineageInfo";
      type: {
        kind: "struct";
        fields: [
          {
            name: "creator";
            type: "pubkey";
          },
          {
            name: "parent";
            type: "pubkey";
          },
          {
            name: "grandParent";
            type: "pubkey";
          },
          {
            name: "greatGrandParent";
            type: "pubkey";
          },
          {
            name: "ggreatGrandParent";
            type: "pubkey";
          },
          {
            name: "generation";
            type: "u64";
          },
          {
            name: "totalChild";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "mainState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "oposToken";
            type: "pubkey";
          },
          {
            name: "profileMintingCost";
            type: "u64";
          },
          {
            name: "invitationMintingCost";
            type: "u64";
          },
          {
            name: "mintingCostDistribution";
            type: {
              defined: {
                name: "mintingCostDistribution";
              };
            };
          },
          {
            name: "tradingPriceDistribution";
            type: {
              defined: {
                name: "tradingPriceDistribution";
              };
            };
          },
          {
            name: "sellerFeeBasisPoints";
            type: "u16";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "totalMintedProfile";
            type: "u64";
          },
          {
            name: "profileCollection";
            type: "pubkey";
          },
          {
            name: "genesisProfile";
            type: "pubkey";
          },
          {
            name: "commonLut";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "mainStateInput";
      type: {
        kind: "struct";
        fields: [
          {
            name: "profileMintingCost";
            type: "u64";
          },
          {
            name: "invitationMintingCost";
            type: "u64";
          },
          {
            name: "oposToken";
            type: "pubkey";
          },
          {
            name: "mintingCostDistribution";
            type: {
              defined: {
                name: "mintingCostDistribution";
              };
            };
          },
          {
            name: "tradingPriceDistribution";
            type: {
              defined: {
                name: "tradingPriceDistribution";
              };
            };
          },
        ];
      };
    },
    {
      name: "mintProfileByAdminInput";
      type: {
        kind: "struct";
        fields: [
          {
            name: "name";
            type: "string";
          },
          {
            name: "symbol";
            type: "string";
          },
          {
            name: "uri";
            type: "string";
          },
          {
            name: "lineage";
            type: {
              defined: {
                name: "lineageInfo";
              };
            };
          },
          {
            name: "parentMint";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "mintingCostDistribution";
      type: {
        kind: "struct";
        fields: [
          {
            name: "parent";
            type: "u16";
          },
          {
            name: "grandParent";
            type: "u16";
          },
          {
            name: "greatGrandParent";
            type: "u16";
          },
          {
            name: "ggreatGrandParent";
            type: "u16";
          },
          {
            name: "genesis";
            type: "u16";
          },
        ];
      };
    },
    {
      name: "piecewiseCurve";
      type: {
        kind: "enum";
        variants: [
          {
            name: "timeV0";
            fields: [
              {
                name: "curves";
                type: {
                  vec: {
                    defined: {
                      name: "timeCurveV0";
                    };
                  };
                };
              },
            ];
          },
        ];
      };
    },
    {
      name: "primitiveCurve";
      type: {
        kind: "enum";
        variants: [
          {
            name: "exponentialCurveV0";
            fields: [
              {
                name: "c";
                type: "u128";
              },
              {
                name: "b";
                type: "u128";
              },
              {
                name: "pow";
                type: "u8";
              },
              {
                name: "frac";
                type: "u8";
              },
            ];
          },
          {
            name: "timeDecayExponentialCurveV0";
            fields: [
              {
                name: "c";
                type: "u128";
              },
              {
                name: "k1";
                type: "u128";
              },
              {
                name: "k0";
                type: "u128";
              },
              {
                name: "interval";
                type: "u32";
              },
              {
                name: "d";
                type: "u128";
              },
            ];
          },
        ];
      };
    },
    {
      name: "profileState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "lineage";
            type: {
              defined: {
                name: "lineageInfo";
              };
            };
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "activationToken";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "totalMintedSft";
            type: "u64";
          },
          {
            name: "totalMintedOffers";
            type: "u64";
          },
          {
            name: "lut";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "programStateV0";
      type: {
        kind: "struct";
        fields: [
          {
            name: "wrappedSolMint";
            type: "pubkey";
          },
          {
            name: "solStorage";
            type: "pubkey";
          },
          {
            name: "mintAuthorityBumpSeed";
            type: "u8";
          },
          {
            name: "solStorageBumpSeed";
            type: "u8";
          },
          {
            name: "bumpSeed";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "sellV0Args";
      type: {
        kind: "struct";
        fields: [
          {
            name: "targetAmount";
            type: "u64";
          },
          {
            name: "minimumPrice";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "sellWrappedSolV0Args";
      type: {
        kind: "struct";
        fields: [
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "all";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "timeCurveV0";
      type: {
        kind: "struct";
        fields: [
          {
            name: "offset";
            type: "i64";
          },
          {
            name: "curve";
            type: {
              defined: {
                name: "primitiveCurve";
              };
            };
          },
          {
            name: "buyTransitionFees";
            type: {
              option: {
                defined: {
                  name: "transitionFeeV0";
                };
              };
            };
          },
          {
            name: "sellTransitionFees";
            type: {
              option: {
                defined: {
                  name: "transitionFeeV0";
                };
              };
            };
          },
        ];
      };
    },
    {
      name: "tokenBondingV0";
      type: {
        kind: "struct";
        fields: [
          {
            name: "baseMint";
            type: "pubkey";
          },
          {
            name: "targetMint";
            type: "pubkey";
          },
          {
            name: "generalAuthority";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "reserveAuthority";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "curveAuthority";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "baseStorage";
            type: "pubkey";
          },
          {
            name: "buyBaseRoyalties";
            type: "pubkey";
          },
          {
            name: "buyTargetRoyalties";
            type: "pubkey";
          },
          {
            name: "sellBaseRoyalties";
            type: "pubkey";
          },
          {
            name: "sellTargetRoyalties";
            type: "pubkey";
          },
          {
            name: "buyBaseRoyaltyPercentage";
            docs: [
              "Percentage of purchases that go to royalties",
              "Percentage Value is (founder_reward_percentage / u32.MAX_VALUE) * 100",
            ];
            type: "u32";
          },
          {
            name: "buyTargetRoyaltyPercentage";
            type: "u32";
          },
          {
            name: "sellBaseRoyaltyPercentage";
            type: "u32";
          },
          {
            name: "sellTargetRoyaltyPercentage";
            type: "u32";
          },
          {
            name: "curve";
            docs: ["The bonding curve to use"];
            type: "pubkey";
          },
          {
            name: "mintCap";
            type: {
              option: "u64";
            };
          },
          {
            name: "purchaseCap";
            type: {
              option: "u64";
            };
          },
          {
            name: "goLiveUnixTime";
            type: "i64";
          },
          {
            name: "freezeBuyUnixTime";
            type: {
              option: "i64";
            };
          },
          {
            name: "createdAtUnixTime";
            type: "i64";
          },
          {
            name: "buyFrozen";
            type: "bool";
          },
          {
            name: "sellFrozen";
            type: "bool";
          },
          {
            name: "index";
            type: "u16";
          },
          {
            name: "bumpSeed";
            type: "u8";
          },
          {
            name: "baseStorageBumpSeed";
            type: "u8";
          },
          {
            name: "targetMintAuthorityBumpSeed";
            type: "u8";
          },
          {
            name: "baseStorageAuthorityBumpSeed";
            type: {
              option: "u8";
            };
          },
          {
            name: "reserveBalanceFromBonding";
            type: "u64";
          },
          {
            name: "supplyFromBonding";
            type: "u64";
          },
          {
            name: "ignoreExternalReserveChanges";
            docs: [
              "Whether or not to ignore changes to base storage and target supply outside of the curve",
            ];
            type: "bool";
          },
          {
            name: "ignoreExternalSupplyChanges";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "tradingPriceDistribution";
      type: {
        kind: "struct";
        fields: [
          {
            name: "seller";
            type: "u16";
          },
          {
            name: "parent";
            type: "u16";
          },
          {
            name: "grandParent";
            type: "u16";
          },
          {
            name: "greatGrandParent";
            type: "u16";
          },
          {
            name: "genesis";
            type: "u16";
          },
        ];
      };
    },
    {
      name: "transferReservesV0Args";
      type: {
        kind: "struct";
        fields: [
          {
            name: "amount";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "transitionFeeV0";
      type: {
        kind: "struct";
        fields: [
          {
            name: "percentage";
            type: "u32";
          },
          {
            name: "interval";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "updateCurveV0Args";
      type: {
        kind: "struct";
        fields: [
          {
            name: "curveAuthority";
            type: {
              option: "pubkey";
            };
          },
        ];
      };
    },
    {
      name: "updateReserveAuthorityV0Args";
      type: {
        kind: "struct";
        fields: [
          {
            name: "newReserveAuthority";
            type: {
              option: "pubkey";
            };
          },
        ];
      };
    },
    {
      name: "updateTokenBondingV0Args";
      type: {
        kind: "struct";
        fields: [
          {
            name: "generalAuthority";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "buyBaseRoyaltyPercentage";
            docs: [
              "Percentage of purchases that go to the founder",
              "Percentage Value is (founder_reward_percentage / u32.MAX_VALUE) * 100",
            ];
            type: "u32";
          },
          {
            name: "buyTargetRoyaltyPercentage";
            type: "u32";
          },
          {
            name: "sellBaseRoyaltyPercentage";
            type: "u32";
          },
          {
            name: "sellTargetRoyaltyPercentage";
            type: "u32";
          },
          {
            name: "buyFrozen";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "vaultState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "lockDate";
            type: "u64";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
  ];
};
export const IDL: Mmoshforge = {
  address: process.env.NEXT_PUBLIC_PROGRAM_ID!,
  metadata: {
    name: "mmoshforge",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "buyLaunchPass",
      discriminator: [34, 233, 225, 139, 123, 211, 118, 78],
      accounts: [
        {
          name: "receiver",
          writable: true,
          signer: true,
        },
        {
          name: "receiverAta",
          writable: true,
        },
        {
          name: "owner",
        },
        {
          name: "launcPassState",
          writable: true,
        },
        {
          name: "mint",
          writable: true,
        },
        {
          name: "tokenProgram",
        },
        {
          name: "associatedTokenProgram",
        },
        {
          name: "systemProgram",
        },
      ],
      args: [],
    },
    {
      name: "buyNativeV0",
      discriminator: [161, 81, 234, 221, 249, 227, 95, 20],
      accounts: [
        {
          name: "common",
          accounts: [
            {
              name: "tokenBonding",
              writable: true,
            },
            {
              name: "curve",
            },
            {
              name: "baseMint",
            },
            {
              name: "targetMint",
              writable: true,
            },
            {
              name: "baseStorage",
              writable: true,
            },
            {
              name: "buyBaseRoyalties",
              writable: true,
            },
            {
              name: "destination",
              writable: true,
            },
            {
              name: "buyTargetRoyalties",
              writable: true,
            },
            {
              name: "tokenProgram",
            },
            {
              name: "clock",
            },
          ],
        },
        {
          name: "source",
          writable: true,
          signer: true,
        },
        {
          name: "state",
        },
        {
          name: "wrappedSolMint",
          writable: true,
        },
        {
          name: "mintAuthority",
        },
        {
          name: "solStorage",
          writable: true,
        },
        {
          name: "systemProgram",
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: {
              name: "buyV0Args",
            },
          },
        },
      ],
    },
    {
      name: "buyV1",
      discriminator: [69, 255, 7, 52, 119, 228, 164, 6],
      accounts: [
        {
          name: "common",
          accounts: [
            {
              name: "tokenBonding",
              writable: true,
            },
            {
              name: "curve",
            },
            {
              name: "baseMint",
            },
            {
              name: "targetMint",
              writable: true,
            },
            {
              name: "baseStorage",
              writable: true,
            },
            {
              name: "buyBaseRoyalties",
              writable: true,
            },
            {
              name: "destination",
              writable: true,
            },
            {
              name: "buyTargetRoyalties",
              writable: true,
            },
            {
              name: "tokenProgram",
            },
            {
              name: "clock",
            },
          ],
        },
        {
          name: "state",
        },
        {
          name: "source",
          writable: true,
        },
        {
          name: "sourceAuthority",
          signer: true,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: {
              name: "buyV0Args",
            },
          },
        },
      ],
    },
    {
      name: "buyWrappedSolV0",
      discriminator: [147, 243, 74, 130, 34, 114, 38, 33],
      accounts: [
        {
          name: "state",
        },
        {
          name: "wrappedSolMint",
          writable: true,
        },
        {
          name: "mintAuthority",
        },
        {
          name: "solStorage",
          writable: true,
        },
        {
          name: "source",
          writable: true,
          signer: true,
        },
        {
          name: "destination",
          writable: true,
        },
        {
          name: "tokenProgram",
        },
        {
          name: "systemProgram",
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: {
              name: "buyWrappedSolV0Args",
            },
          },
        },
      ],
    },
    {
      name: "closeTokenBondingV0",
      discriminator: [160, 94, 159, 74, 193, 107, 122, 168],
      accounts: [
        {
          name: "refund",
          writable: true,
        },
        {
          name: "tokenBonding",
          writable: true,
        },
        {
          name: "generalAuthority",
          signer: true,
        },
        {
          name: "targetMint",
          writable: true,
        },
        {
          name: "baseStorage",
          writable: true,
        },
        {
          name: "tokenProgram",
        },
      ],
      args: [],
    },
    {
      name: "createCollection",
      discriminator: [156, 251, 92, 54, 233, 2, 16, 82],
      accounts: [
        {
          name: "admin",
          writable: true,
          signer: true,
        },
        {
          name: "mainState",
          writable: true,
        },
        {
          name: "collection",
          writable: true,
        },
        {
          name: "adminAta",
          writable: true,
        },
        {
          name: "collectionState",
          writable: true,
        },
        {
          name: "collectionMetadata",
          writable: true,
        },
        {
          name: "collectionEdition",
          writable: true,
        },
        {
          name: "collectionAuthorityRecord",
          writable: true,
        },
        {
          name: "sysvarInstructions",
        },
        {
          name: "parentCollection",
          writable: true,
        },
        {
          name: "parentCollectionMetadata",
          writable: true,
        },
        {
          name: "parentCollectionEdition",
          writable: true,
        },
        {
          name: "mplProgram",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "associatedTokenProgram",
        },
        {
          name: "systemProgram",
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "uri",
          type: "string",
        },
        {
          name: "collectionType",
          type: "string",
        },
      ],
    },
    {
      name: "createCurveV0",
      discriminator: [205, 203, 250, 201, 156, 135, 114, 221],
      accounts: [
        {
          name: "payer",
          writable: true,
          signer: true,
        },
        {
          name: "curve",
          writable: true,
        },
        {
          name: "systemProgram",
        },
        {
          name: "rent",
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: {
              name: "createCurveV0Args",
            },
          },
        },
      ],
    },
    {
      name: "createPassToken",
      discriminator: [51, 165, 125, 185, 174, 69, 218, 41],
      accounts: [
        {
          name: "minter",
          writable: true,
          signer: true,
        },
        {
          name: "minterProfileAta",
          writable: true,
        },
        {
          name: "receiverAta",
          writable: true,
        },
        {
          name: "project",
        },
        {
          name: "mainState",
          writable: true,
        },
        {
          name: "activationToken",
          writable: true,
        },
        {
          name: "activationTokenState",
          writable: true,
        },
        {
          name: "profile",
        },
        {
          name: "profileState",
          writable: true,
        },
        {
          name: "tokenProgram",
        },
        {
          name: "associatedTokenProgram",
        },
        {
          name: "systemProgram",
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "initActivationToken",
      discriminator: [242, 105, 199, 89, 203, 143, 3, 220],
      accounts: [
        {
          name: "user",
          writable: true,
          signer: true,
        },
        {
          name: "userProfileAta",
          writable: true,
        },
        {
          name: "userActivationTokenAta",
          writable: true,
        },
        {
          name: "mainState",
          writable: true,
        },
        {
          name: "activationToken",
          writable: true,
          signer: true,
        },
        {
          name: "activationTokenState",
          writable: true,
        },
        {
          name: "activationTokenMetadata",
          writable: true,
        },
        {
          name: "profile",
        },
        {
          name: "profileState",
          writable: true,
        },
        {
          name: "profileMetadata",
          writable: true,
        },
        {
          name: "profileEdition",
          writable: true,
        },
        {
          name: "profileCollectionAuthorityRecord",
          writable: true,
        },
        {
          name: "parentCollection",
          writable: true,
        },
        {
          name: "parentCollectionMetadata",
          writable: true,
        },
        {
          name: "parentCollectionEdition",
          writable: true,
        },
        {
          name: "sysvarInstructions",
        },
        {
          name: "mplProgram",
        },
        {
          name: "associatedTokenProgram",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "systemProgram",
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "uri",
          type: "string",
        },
      ],
    },
    {
      name: "initLaunchPass",
      discriminator: [67, 166, 228, 171, 62, 248, 104, 29],
      accounts: [
        {
          name: "owner",
          writable: true,
          signer: true,
        },
        {
          name: "mint",
          writable: true,
          signer: true,
        },
        {
          name: "launchPass",
          writable: true,
        },
        {
          name: "mintMetadata",
          writable: true,
        },
        {
          name: "sysvarInstructions",
        },
        {
          name: "mplProgram",
        },
        {
          name: "associatedTokenProgram",
        },
        {
          name: "systemProgram",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "rent",
        },
        {
          name: "clock",
        },
      ],
      args: [
        {
          name: "redeemAmount",
          type: "u64",
        },
        {
          name: "redeemDate",
          type: "u64",
        },
        {
          name: "cost",
          type: "u64",
        },
        {
          name: "distribution",
          type: {
            defined: {
              name: "mintingCostDistribution",
            },
          },
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "uri",
          type: "string",
        },
      ],
    },
    {
      name: "initMainState",
      discriminator: [33, 233, 208, 22, 125, 72, 253, 30],
      accounts: [
        {
          name: "owner",
          writable: true,
          signer: true,
        },
        {
          name: "mainState",
          writable: true,
        },
        {
          name: "systemProgram",
        },
      ],
      args: [
        {
          name: "input",
          type: {
            defined: {
              name: "mainStateInput",
            },
          },
        },
      ],
    },
    {
      name: "initPassToken",
      discriminator: [104, 46, 125, 140, 102, 252, 213, 92],
      accounts: [
        {
          name: "user",
          writable: true,
          signer: true,
        },
        {
          name: "userProfileAta",
          writable: true,
        },
        {
          name: "userActivationTokenAta",
          writable: true,
        },
        {
          name: "project",
        },
        {
          name: "mainState",
          writable: true,
        },
        {
          name: "parentMainState",
          writable: true,
        },
        {
          name: "activationToken",
          writable: true,
          signer: true,
        },
        {
          name: "activationTokenState",
          writable: true,
        },
        {
          name: "activationTokenMetadata",
          writable: true,
        },
        {
          name: "profile",
        },
        {
          name: "profileState",
          writable: true,
        },
        {
          name: "profileMetadata",
          writable: true,
        },
        {
          name: "profileEdition",
          writable: true,
        },
        {
          name: "profileCollectionAuthorityRecord",
          writable: true,
        },
        {
          name: "parentCollection",
          writable: true,
        },
        {
          name: "parentCollectionMetadata",
          writable: true,
        },
        {
          name: "parentCollectionEdition",
          writable: true,
        },
        {
          name: "sysvarInstructions",
        },
        {
          name: "mplProgram",
        },
        {
          name: "associatedTokenProgram",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "systemProgram",
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "uri",
          type: "string",
        },
      ],
    },
    {
      name: "initVault",
      discriminator: [77, 79, 85, 150, 33, 217, 52, 106],
      accounts: [
        {
          name: "owner",
          writable: true,
          signer: true,
        },
        {
          name: "ownerAta",
          writable: true,
        },
        {
          name: "authority",
        },
        {
          name: "stakeKey",
        },
        {
          name: "mint",
        },
        {
          name: "vault",
          writable: true,
        },
        {
          name: "tokenAccount",
          writable: true,
        },
        {
          name: "associatedTokenProgram",
        },
        {
          name: "systemProgram",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "rent",
        },
        {
          name: "clock",
        },
      ],
      args: [
        {
          name: "lockDate",
          type: "u64",
        },
        {
          name: "value",
          type: "u64",
        },
      ],
    },
    {
      name: "initializeSolStorageV0",
      discriminator: [20, 26, 34, 233, 185, 171, 12, 98],
      accounts: [
        {
          name: "payer",
          writable: true,
          signer: true,
        },
        {
          name: "state",
          writable: true,
        },
        {
          name: "solStorage",
        },
        {
          name: "wrappedSolMint",
        },
        {
          name: "mintAuthority",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "systemProgram",
        },
        {
          name: "rent",
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: {
              name: "initializeSolStorageV0Args",
            },
          },
        },
      ],
    },
    {
      name: "initializeTokenBondingV0",
      discriminator: [4, 205, 255, 32, 185, 121, 134, 61],
      accounts: [
        {
          name: "payer",
          writable: true,
          signer: true,
        },
        {
          name: "curve",
        },
        {
          name: "tokenBonding",
          writable: true,
        },
        {
          name: "baseMint",
        },
        {
          name: "targetMint",
        },
        {
          name: "baseStorage",
        },
        {
          name: "buyBaseRoyalties",
        },
        {
          name: "buyTargetRoyalties",
        },
        {
          name: "sellBaseRoyalties",
        },
        {
          name: "sellTargetRoyalties",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "systemProgram",
        },
        {
          name: "rent",
        },
        {
          name: "clock",
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: {
              name: "initializeTokenBondingV0Args",
            },
          },
        },
      ],
    },
    {
      name: "mintActivationToken",
      discriminator: [234, 158, 56, 192, 194, 164, 9, 244],
      accounts: [
        {
          name: "minter",
          writable: true,
          signer: true,
        },
        {
          name: "minterProfileAta",
          writable: true,
        },
        {
          name: "receiverAta",
          writable: true,
        },
        {
          name: "mainState",
          writable: true,
        },
        {
          name: "activationToken",
          writable: true,
        },
        {
          name: "activationTokenState",
          writable: true,
        },
        {
          name: "profile",
        },
        {
          name: "profileState",
          writable: true,
        },
        {
          name: "tokenProgram",
        },
        {
          name: "associatedTokenProgram",
        },
        {
          name: "systemProgram",
        },
        {
          name: "parentProfile",
        },
        {
          name: "grandParentProfile",
        },
        {
          name: "greatGrandParentProfile",
        },
        {
          name: "ggreateGrandParentProfile",
        },
        {
          name: "genesisProfile",
        },
        {
          name: "parentProfileState",
          writable: true,
        },
        {
          name: "oposToken",
        },
        {
          name: "currentParentProfileHolderAta",
        },
        {
          name: "currentGrandParentProfileHolderAta",
        },
        {
          name: "currentGreatGrandParentProfileHolderAta",
        },
        {
          name: "currentGgreatGrandParentProfileHolderAta",
        },
        {
          name: "currentGenesisProfileHolderAta",
        },
        {
          name: "currentParentProfileHolder",
        },
        {
          name: "currentGrandParentProfileHolder",
        },
        {
          name: "currentGreatGrandParentProfileHolder",
        },
        {
          name: "currentGgreatGrandParentProfileHolder",
        },
        {
          name: "currentGenesisProfileHolder",
        },
        {
          name: "userOposAta",
          writable: true,
        },
        {
          name: "parentProfileHolderOposAta",
          writable: true,
        },
        {
          name: "grandParentProfileHolderOposAta",
          writable: true,
        },
        {
          name: "greatGrandParentProfileHolderOposAta",
          writable: true,
        },
        {
          name: "ggreatGrandParentProfileHolderOposAta",
          writable: true,
        },
        {
          name: "genesisProfileHolderOposAta",
          writable: true,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "mintGenesisPass",
      discriminator: [14, 146, 113, 105, 81, 191, 143, 226],
      accounts: [
        {
          name: "user",
          writable: true,
          signer: true,
        },
        {
          name: "mplProgram",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "associatedTokenProgram",
        },
        {
          name: "systemProgram",
        },
        {
          name: "profile",
          writable: true,
          signer: true,
        },
        {
          name: "mainState",
          writable: true,
        },
        {
          name: "parentMainState",
          writable: true,
        },
        {
          name: "userProfileAta",
          writable: true,
        },
        {
          name: "profileState",
          writable: true,
        },
        {
          name: "profileMetadata",
          writable: true,
        },
        {
          name: "profileEdition",
          writable: true,
        },
        {
          name: "collection",
          writable: true,
        },
        {
          name: "collectionState",
          writable: true,
        },
        {
          name: "collectionMetadata",
          writable: true,
        },
        {
          name: "collectionEdition",
          writable: true,
        },
        {
          name: "sysvarInstructions",
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "uriHash",
          type: "string",
        },
        {
          name: "input",
          type: {
            defined: {
              name: "mainStateInput",
            },
          },
        },
      ],
    },
    {
      name: "mintGenesisProfile",
      discriminator: [213, 67, 157, 90, 201, 241, 157, 246],
      accounts: [
        {
          name: "admin",
          writable: true,
          signer: true,
        },
        {
          name: "mainState",
          writable: true,
        },
        {
          name: "profile",
          writable: true,
        },
        {
          name: "adminAta",
          writable: true,
        },
        {
          name: "profileState",
          writable: true,
        },
        {
          name: "profileMetadata",
          writable: true,
        },
        {
          name: "profileEdition",
          writable: true,
        },
        {
          name: "collection",
          writable: true,
        },
        {
          name: "collectionState",
          writable: true,
        },
        {
          name: "collectionMetadata",
          writable: true,
        },
        {
          name: "collectionEdition",
          writable: true,
        },
        {
          name: "collectionAuthorityRecord",
          writable: true,
        },
        {
          name: "subCollectionAuthorityRecord",
          writable: true,
        },
        {
          name: "sysvarInstructions",
        },
        {
          name: "mplProgram",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "associatedTokenProgram",
        },
        {
          name: "systemProgram",
        },
      ],
      args: [
        {
          name: "input",
          type: {
            defined: {
              name: "mintProfileByAdminInput",
            },
          },
        },
      ],
    },
    {
      name: "mintPassByAt",
      discriminator: [155, 164, 136, 144, 190, 184, 210, 221],
      accounts: [
        {
          name: "user",
          writable: true,
          signer: true,
        },
        {
          name: "mplProgram",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "associatedTokenProgram",
        },
        {
          name: "systemProgram",
        },
        {
          name: "oposToken",
        },
        {
          name: "userActivationTokenAta",
          writable: true,
        },
        {
          name: "project",
        },
        {
          name: "mainState",
          writable: true,
        },
        {
          name: "parentMainState",
          writable: true,
        },
        {
          name: "activationToken",
          writable: true,
        },
        {
          name: "profile",
          writable: true,
          signer: true,
        },
        {
          name: "userProfileAta",
          writable: true,
        },
        {
          name: "profileState",
          writable: true,
        },
        {
          name: "profileMetadata",
          writable: true,
        },
        {
          name: "profileEdition",
          writable: true,
        },
        {
          name: "parentProfileState",
          writable: true,
        },
        {
          name: "collection",
          writable: true,
        },
        {
          name: "collectionMetadata",
          writable: true,
        },
        {
          name: "collectionEdition",
          writable: true,
        },
        {
          name: "sysvarInstructions",
        },
        {
          name: "parentProfile",
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "uriHash",
          type: "string",
        },
      ],
    },
    {
      name: "mintProfileByAt",
      discriminator: [100, 237, 109, 44, 36, 6, 29, 147],
      accounts: [
        {
          name: "user",
          writable: true,
          signer: true,
        },
        {
          name: "mplProgram",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "associatedTokenProgram",
        },
        {
          name: "systemProgram",
        },
        {
          name: "oposToken",
        },
        {
          name: "userActivationTokenAta",
          writable: true,
        },
        {
          name: "mainState",
          writable: true,
        },
        {
          name: "activationToken",
          writable: true,
        },
        {
          name: "profile",
          writable: true,
          signer: true,
        },
        {
          name: "userProfileAta",
          writable: true,
        },
        {
          name: "profileState",
          writable: true,
        },
        {
          name: "profileMetadata",
          writable: true,
        },
        {
          name: "profileEdition",
          writable: true,
        },
        {
          name: "parentProfileState",
          writable: true,
        },
        {
          name: "collection",
          writable: true,
        },
        {
          name: "collectionMetadata",
          writable: true,
        },
        {
          name: "collectionEdition",
          writable: true,
        },
        {
          name: "sysvarInstructions",
        },
        {
          name: "parentProfile",
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "uriHash",
          type: "string",
        },
      ],
    },
    {
      name: "redeemLaunchPass",
      discriminator: [219, 229, 176, 81, 165, 34, 169, 3],
      accounts: [
        {
          name: "user",
          writable: true,
          signer: true,
        },
        {
          name: "launchToken",
          writable: true,
        },
        {
          name: "owner",
        },
        {
          name: "launcPassState",
          writable: true,
        },
        {
          name: "stakeKey",
        },
        {
          name: "vault",
          writable: true,
        },
        {
          name: "userLaunchTokenAta",
          writable: true,
        },
        {
          name: "sysvarInstructions",
        },
        {
          name: "receiverAta",
          writable: true,
        },
        {
          name: "mint",
        },
        {
          name: "tokenAccount",
          writable: true,
        },
        {
          name: "mplProgram",
        },
        {
          name: "associatedTokenProgram",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "systemProgram",
        },
        {
          name: "rent",
        },
        {
          name: "clock",
        },
      ],
      args: [],
    },
    {
      name: "resetMain",
      discriminator: [114, 169, 116, 115, 81, 124, 80, 201],
      accounts: [
        {
          name: "owner",
          writable: true,
          signer: true,
        },
        {
          name: "mainState",
          writable: true,
        },
        {
          name: "systemProgram",
        },
      ],
      args: [],
    },
    {
      name: "sellNativeV0",
      discriminator: [29, 129, 234, 157, 18, 252, 113, 179],
      accounts: [
        {
          name: "common",
          accounts: [
            {
              name: "tokenBonding",
              writable: true,
            },
            {
              name: "curve",
            },
            {
              name: "baseMint",
            },
            {
              name: "targetMint",
              writable: true,
            },
            {
              name: "baseStorage",
              writable: true,
            },
            {
              name: "sellBaseRoyalties",
              writable: true,
            },
            {
              name: "source",
              writable: true,
            },
            {
              name: "sourceAuthority",
              signer: true,
            },
            {
              name: "sellTargetRoyalties",
              writable: true,
            },
            {
              name: "tokenProgram",
            },
            {
              name: "clock",
            },
          ],
        },
        {
          name: "destination",
          writable: true,
        },
        {
          name: "state",
        },
        {
          name: "wrappedSolMint",
          writable: true,
        },
        {
          name: "mintAuthority",
        },
        {
          name: "solStorage",
          writable: true,
        },
        {
          name: "systemProgram",
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: {
              name: "sellV0Args",
            },
          },
        },
      ],
    },
    {
      name: "sellV1",
      discriminator: [19, 129, 236, 31, 99, 212, 19, 208],
      accounts: [
        {
          name: "common",
          accounts: [
            {
              name: "tokenBonding",
              writable: true,
            },
            {
              name: "curve",
            },
            {
              name: "baseMint",
            },
            {
              name: "targetMint",
              writable: true,
            },
            {
              name: "baseStorage",
              writable: true,
            },
            {
              name: "sellBaseRoyalties",
              writable: true,
            },
            {
              name: "source",
              writable: true,
            },
            {
              name: "sourceAuthority",
              signer: true,
            },
            {
              name: "sellTargetRoyalties",
              writable: true,
            },
            {
              name: "tokenProgram",
            },
            {
              name: "clock",
            },
          ],
        },
        {
          name: "state",
        },
        {
          name: "destination",
          writable: true,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: {
              name: "sellV0Args",
            },
          },
        },
      ],
    },
    {
      name: "sellWrappedSolV0",
      discriminator: [121, 226, 81, 179, 229, 22, 180, 12],
      accounts: [
        {
          name: "state",
        },
        {
          name: "wrappedSolMint",
          writable: true,
        },
        {
          name: "solStorage",
          writable: true,
        },
        {
          name: "source",
          writable: true,
        },
        {
          name: "owner",
          signer: true,
        },
        {
          name: "destination",
          writable: true,
        },
        {
          name: "tokenProgram",
        },
        {
          name: "systemProgram",
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: {
              name: "sellWrappedSolV0Args",
            },
          },
        },
      ],
    },
    {
      name: "setCommonLut",
      discriminator: [246, 61, 227, 31, 125, 134, 108, 56],
      accounts: [
        {
          name: "owner",
          writable: true,
          signer: true,
        },
        {
          name: "mainState",
          writable: true,
        },
      ],
      args: [
        {
          name: "lut",
          type: "pubkey",
        },
      ],
    },
    {
      name: "stakeVault",
      discriminator: [5, 41, 184, 37, 11, 213, 172, 234],
      accounts: [
        {
          name: "owner",
          writable: true,
          signer: true,
        },
        {
          name: "ownerAta",
          writable: true,
        },
        {
          name: "mint",
        },
        {
          name: "authority",
        },
        {
          name: "stakeKey",
        },
        {
          name: "vault",
          writable: true,
        },
        {
          name: "tokenAccount",
          writable: true,
        },
        {
          name: "associatedTokenProgram",
        },
        {
          name: "systemProgram",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "rent",
        },
        {
          name: "clock",
        },
      ],
      args: [
        {
          name: "value",
          type: "u64",
        },
      ],
    },
    {
      name: "transferReservesNativeV0",
      discriminator: [182, 139, 99, 4, 205, 169, 172, 224],
      accounts: [
        {
          name: "common",
          accounts: [
            {
              name: "tokenBonding",
              writable: true,
            },
            {
              name: "reserveAuthority",
              signer: true,
            },
            {
              name: "baseMint",
            },
            {
              name: "baseStorage",
              writable: true,
            },
            {
              name: "tokenProgram",
            },
          ],
        },
        {
          name: "destination",
          writable: true,
        },
        {
          name: "state",
        },
        {
          name: "wrappedSolMint",
          writable: true,
        },
        {
          name: "mintAuthority",
        },
        {
          name: "solStorage",
          writable: true,
        },
        {
          name: "systemProgram",
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: {
              name: "transferReservesV0Args",
            },
          },
        },
      ],
    },
    {
      name: "transferReservesV0",
      discriminator: [7, 142, 255, 166, 164, 247, 159, 157],
      accounts: [
        {
          name: "common",
          accounts: [
            {
              name: "tokenBonding",
              writable: true,
            },
            {
              name: "reserveAuthority",
              signer: true,
            },
            {
              name: "baseMint",
            },
            {
              name: "baseStorage",
              writable: true,
            },
            {
              name: "tokenProgram",
            },
          ],
        },
        {
          name: "destination",
          writable: true,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: {
              name: "transferReservesV0Args",
            },
          },
        },
      ],
    },
    {
      name: "unstakeVault",
      discriminator: [131, 150, 142, 54, 247, 71, 103, 43],
      accounts: [
        {
          name: "receiver",
          writable: true,
          signer: true,
        },
        {
          name: "receiverAta",
          writable: true,
        },
        {
          name: "mint",
        },
        {
          name: "stakeKey",
        },
        {
          name: "vault",
          writable: true,
        },
        {
          name: "tokenAccount",
          writable: true,
        },
        {
          name: "associatedTokenProgram",
        },
        {
          name: "systemProgram",
        },
        {
          name: "tokenProgram",
        },
        {
          name: "rent",
        },
        {
          name: "clock",
        },
      ],
      args: [
        {
          name: "value",
          type: "u64",
        },
      ],
    },
    {
      name: "updateCurveV0",
      discriminator: [71, 14, 111, 54, 161, 23, 97, 85],
      accounts: [
        {
          name: "tokenBonding",
          writable: true,
        },
        {
          name: "curveAuthority",
          signer: true,
        },
        {
          name: "curve",
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: {
              name: "updateCurveV0Args",
            },
          },
        },
      ],
    },
    {
      name: "updateMainState",
      discriminator: [169, 145, 9, 15, 95, 4, 126, 209],
      accounts: [
        {
          name: "owner",
          writable: true,
          signer: true,
        },
        {
          name: "mainState",
          writable: true,
        },
      ],
      args: [
        {
          name: "input",
          type: {
            defined: {
              name: "mainStateInput",
            },
          },
        },
      ],
    },
    {
      name: "updateMainStateOwner",
      discriminator: [218, 24, 137, 215, 28, 41, 248, 42],
      accounts: [
        {
          name: "owner",
          writable: true,
          signer: true,
        },
        {
          name: "mainState",
          writable: true,
        },
      ],
      args: [
        {
          name: "newOwner",
          type: "pubkey",
        },
      ],
    },
    {
      name: "updateReserveAuthorityV0",
      discriminator: [140, 105, 17, 234, 229, 79, 133, 150],
      accounts: [
        {
          name: "tokenBonding",
          writable: true,
        },
        {
          name: "reserveAuthority",
          signer: true,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: {
              name: "updateReserveAuthorityV0Args",
            },
          },
        },
      ],
    },
    {
      name: "updateTokenBondingV0",
      discriminator: [10, 181, 83, 74, 124, 211, 123, 48],
      accounts: [
        {
          name: "tokenBonding",
          writable: true,
        },
        {
          name: "generalAuthority",
          signer: true,
        },
        {
          name: "baseMint",
        },
        {
          name: "targetMint",
        },
        {
          name: "buyBaseRoyalties",
        },
        {
          name: "buyTargetRoyalties",
        },
        {
          name: "sellBaseRoyalties",
        },
        {
          name: "sellTargetRoyalties",
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: {
              name: "updateTokenBondingV0Args",
            },
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: "activationTokenState",
      discriminator: [142, 115, 218, 48, 17, 217, 56, 190],
    },
    {
      name: "collectionState",
      discriminator: [228, 135, 148, 4, 244, 41, 118, 165],
    },
    {
      name: "curveV0",
      discriminator: [77, 25, 232, 252, 138, 96, 1, 172],
    },
    {
      name: "launchPassState",
      discriminator: [159, 151, 191, 15, 7, 153, 187, 180],
    },
    {
      name: "mainState",
      discriminator: [153, 79, 81, 109, 146, 220, 36, 182],
    },
    {
      name: "profileState",
      discriminator: [189, 32, 28, 31, 131, 153, 194, 253],
    },
    {
      name: "programStateV0",
      discriminator: [102, 65, 191, 196, 12, 36, 248, 123],
    },
    {
      name: "tokenBondingV0",
      discriminator: [83, 36, 213, 250, 189, 200, 154, 127],
    },
    {
      name: "vaultState",
      discriminator: [228, 196, 82, 165, 98, 210, 235, 152],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "noMintAuthority",
      msg: "Target mint must have an authority",
    },
    {
      code: 6001,
      name: "invalidMintAuthority",
      msg: "Target mint must have an authority that is a pda of this program",
    },
    {
      code: 6002,
      name: "invalidBaseStorageAuthority",
      msg: "Invalid base storage authority pda or seed did not match canonical seed for base storage authority",
    },
    {
      code: 6003,
      name: "noAuthority",
      msg: "Token bonding does not have an authority",
    },
    {
      code: 6004,
      name: "arithmeticError",
      msg: "Error in precise number arithmetic",
    },
    {
      code: 6005,
      name: "priceTooHigh",
      msg: "Buy price was higher than the maximum buy price. Try increasing max_price or slippage configuration",
    },
    {
      code: 6006,
      name: "priceTooLow",
      msg: "Sell price was lower than the minimum sell price. Try decreasing min_price or increasing slippage configuration",
    },
    {
      code: 6007,
      name: "mintSupplyTooLow",
      msg: "Cannot sell more than the target mint currently has in supply",
    },
    {
      code: 6008,
      name: "sellDisabled",
      msg: "Sell is not enabled on this bonding curve",
    },
    {
      code: 6009,
      name: "notLiveYet",
      msg: "This bonding curve is not live yet",
    },
    {
      code: 6010,
      name: "passedMintCap",
      msg: "Passed the mint cap",
    },
    {
      code: 6011,
      name: "overPurchaseCap",
      msg: "Cannot purchase that many tokens because of purchase cap",
    },
    {
      code: 6012,
      name: "buyFrozen",
      msg: "Buy is frozen on this bonding curve, purchases not allowed",
    },
    {
      code: 6013,
      name: "wrappedSolNotAllowed",
      msg: "Use token bonding wrapped sol via buy_wrapped_sol, sell_wrapped_sol commands. We may one day provide liquid staking rewards on this stored sol.",
    },
    {
      code: 6014,
      name: "invalidCurve",
      msg: "The provided curve is invalid",
    },
    {
      code: 6015,
      name: "invalidMint",
      msg: "An account was provided that did not have the correct mint",
    },
    {
      code: 6016,
      name: "ignoreExternalV1Only",
      msg: "Ignoring external changes is only supported on v1 of buy and sell endpoints. Please upgrade your client",
    },
    {
      code: 6017,
      name: "invalidPad",
      msg: "Cannot pad token bonding without ignoring external reserve and supply changes. This is an advanced feature, incorrect use could lead to insufficient resreves to cover sells",
    },
  ],
  types: [
    {
      name: "activationTokenState",
      type: {
        kind: "struct",
        fields: [
          {
            name: "parentProfile",
            type: "pubkey",
          },
          {
            name: "creator",
            type: "pubkey",
          },
        ],
      },
    },
    {
      name: "buyTargetAmountV0Args",
      type: {
        kind: "struct",
        fields: [
          {
            name: "targetAmount",
            type: "u64",
          },
          {
            name: "maximumPrice",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "buyV0Args",
      type: {
        kind: "struct",
        fields: [
          {
            name: "buyWithBase",
            type: {
              option: {
                defined: {
                  name: "buyWithBaseV0Args",
                },
              },
            },
          },
          {
            name: "buyTargetAmount",
            type: {
              option: {
                defined: {
                  name: "buyTargetAmountV0Args",
                },
              },
            },
          },
        ],
      },
    },
    {
      name: "buyWithBaseV0Args",
      type: {
        kind: "struct",
        fields: [
          {
            name: "baseAmount",
            type: "u64",
          },
          {
            name: "minimumTargetAmount",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "buyWrappedSolV0Args",
      type: {
        kind: "struct",
        fields: [
          {
            name: "amount",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "collectionState",
      type: {
        kind: "struct",
        fields: [
          {
            name: "genesisProfile",
            type: "pubkey",
          },
          {
            name: "collectionId",
            type: "pubkey",
          },
        ],
      },
    },
    {
      name: "createCurveV0Args",
      type: {
        kind: "struct",
        fields: [
          {
            name: "definition",
            type: {
              defined: {
                name: "piecewiseCurve",
              },
            },
          },
        ],
      },
    },
    {
      name: "curveV0",
      type: {
        kind: "struct",
        fields: [
          {
            name: "definition",
            type: {
              defined: {
                name: "piecewiseCurve",
              },
            },
          },
        ],
      },
    },
    {
      name: "initializeSolStorageV0Args",
      type: {
        kind: "struct",
        fields: [
          {
            name: "mintAuthorityBumpSeed",
            type: "u8",
          },
          {
            name: "solStorageBumpSeed",
            type: "u8",
          },
          {
            name: "bumpSeed",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "initializeTokenBondingV0Args",
      type: {
        kind: "struct",
        fields: [
          {
            name: "buyBaseRoyaltyPercentage",
            docs: [
              "Percentage of purchases that go to the founder",
              "Percentage Value is (founder_reward_percentage / u32.MAX_VALUE) * 100",
            ],
            type: "u32",
          },
          {
            name: "buyTargetRoyaltyPercentage",
            type: "u32",
          },
          {
            name: "sellBaseRoyaltyPercentage",
            type: "u32",
          },
          {
            name: "sellTargetRoyaltyPercentage",
            type: "u32",
          },
          {
            name: "goLiveUnixTime",
            type: "i64",
          },
          {
            name: "freezeBuyUnixTime",
            type: {
              option: "i64",
            },
          },
          {
            name: "mintCap",
            type: {
              option: "u64",
            },
          },
          {
            name: "purchaseCap",
            type: {
              option: "u64",
            },
          },
          {
            name: "generalAuthority",
            type: {
              option: "pubkey",
            },
          },
          {
            name: "reserveAuthority",
            type: {
              option: "pubkey",
            },
          },
          {
            name: "curveAuthority",
            type: {
              option: "pubkey",
            },
          },
          {
            name: "buyFrozen",
            type: "bool",
          },
          {
            name: "index",
            type: "u16",
          },
          {
            name: "bumpSeed",
            type: "u8",
          },
          {
            name: "sellFrozen",
            type: "bool",
          },
          {
            name: "ignoreExternalReserveChanges",
            docs: [
              "Whether or not to ignore changes to base storage and target supply outside of the curve",
            ],
            type: "bool",
          },
          {
            name: "ignoreExternalSupplyChanges",
            type: "bool",
          },
          {
            name: "initialReservesPad",
            docs: [
              "* Allow starting a curve from a later reserve/supply ratio of ignor reserve and supply changes.\n   *\n   * This allows for things like the LBC where you don't need to provide any initial liquidity",
            ],
            type: "u64",
          },
          {
            name: "initialSupplyPad",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "launchPassState",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "pubkey",
          },
          {
            name: "cost",
            type: "u64",
          },
          {
            name: "distribution",
            type: {
              defined: {
                name: "mintingCostDistribution",
              },
            },
          },
          {
            name: "redeemDate",
            type: "u64",
          },
          {
            name: "redeemAmount",
            type: "u64",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "lineageInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "creator",
            type: "pubkey",
          },
          {
            name: "parent",
            type: "pubkey",
          },
          {
            name: "grandParent",
            type: "pubkey",
          },
          {
            name: "greatGrandParent",
            type: "pubkey",
          },
          {
            name: "ggreatGrandParent",
            type: "pubkey",
          },
          {
            name: "generation",
            type: "u64",
          },
          {
            name: "totalChild",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "mainState",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "pubkey",
          },
          {
            name: "oposToken",
            type: "pubkey",
          },
          {
            name: "profileMintingCost",
            type: "u64",
          },
          {
            name: "invitationMintingCost",
            type: "u64",
          },
          {
            name: "mintingCostDistribution",
            type: {
              defined: {
                name: "mintingCostDistribution",
              },
            },
          },
          {
            name: "tradingPriceDistribution",
            type: {
              defined: {
                name: "tradingPriceDistribution",
              },
            },
          },
          {
            name: "sellerFeeBasisPoints",
            type: "u16",
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "totalMintedProfile",
            type: "u64",
          },
          {
            name: "profileCollection",
            type: "pubkey",
          },
          {
            name: "genesisProfile",
            type: "pubkey",
          },
          {
            name: "commonLut",
            type: "pubkey",
          },
        ],
      },
    },
    {
      name: "mainStateInput",
      type: {
        kind: "struct",
        fields: [
          {
            name: "profileMintingCost",
            type: "u64",
          },
          {
            name: "invitationMintingCost",
            type: "u64",
          },
          {
            name: "oposToken",
            type: "pubkey",
          },
          {
            name: "mintingCostDistribution",
            type: {
              defined: {
                name: "mintingCostDistribution",
              },
            },
          },
          {
            name: "tradingPriceDistribution",
            type: {
              defined: {
                name: "tradingPriceDistribution",
              },
            },
          },
        ],
      },
    },
    {
      name: "mintProfileByAdminInput",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "symbol",
            type: "string",
          },
          {
            name: "uri",
            type: "string",
          },
          {
            name: "lineage",
            type: {
              defined: {
                name: "lineageInfo",
              },
            },
          },
          {
            name: "parentMint",
            type: "pubkey",
          },
        ],
      },
    },
    {
      name: "mintingCostDistribution",
      type: {
        kind: "struct",
        fields: [
          {
            name: "parent",
            type: "u16",
          },
          {
            name: "grandParent",
            type: "u16",
          },
          {
            name: "greatGrandParent",
            type: "u16",
          },
          {
            name: "ggreatGrandParent",
            type: "u16",
          },
          {
            name: "genesis",
            type: "u16",
          },
        ],
      },
    },
    {
      name: "piecewiseCurve",
      type: {
        kind: "enum",
        variants: [
          {
            name: "timeV0",
            fields: [
              {
                name: "curves",
                type: {
                  vec: {
                    defined: {
                      name: "timeCurveV0",
                    },
                  },
                },
              },
            ],
          },
        ],
      },
    },
    {
      name: "primitiveCurve",
      type: {
        kind: "enum",
        variants: [
          {
            name: "exponentialCurveV0",
            fields: [
              {
                name: "c",
                type: "u128",
              },
              {
                name: "b",
                type: "u128",
              },
              {
                name: "pow",
                type: "u8",
              },
              {
                name: "frac",
                type: "u8",
              },
            ],
          },
          {
            name: "timeDecayExponentialCurveV0",
            fields: [
              {
                name: "c",
                type: "u128",
              },
              {
                name: "k1",
                type: "u128",
              },
              {
                name: "k0",
                type: "u128",
              },
              {
                name: "interval",
                type: "u32",
              },
              {
                name: "d",
                type: "u128",
              },
            ],
          },
        ],
      },
    },
    {
      name: "profileState",
      type: {
        kind: "struct",
        fields: [
          {
            name: "lineage",
            type: {
              defined: {
                name: "lineageInfo",
              },
            },
          },
          {
            name: "mint",
            type: "pubkey",
          },
          {
            name: "activationToken",
            type: {
              option: "pubkey",
            },
          },
          {
            name: "totalMintedSft",
            type: "u64",
          },
          {
            name: "totalMintedOffers",
            type: "u64",
          },
          {
            name: "lut",
            type: "pubkey",
          },
        ],
      },
    },
    {
      name: "programStateV0",
      type: {
        kind: "struct",
        fields: [
          {
            name: "wrappedSolMint",
            type: "pubkey",
          },
          {
            name: "solStorage",
            type: "pubkey",
          },
          {
            name: "mintAuthorityBumpSeed",
            type: "u8",
          },
          {
            name: "solStorageBumpSeed",
            type: "u8",
          },
          {
            name: "bumpSeed",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "sellV0Args",
      type: {
        kind: "struct",
        fields: [
          {
            name: "targetAmount",
            type: "u64",
          },
          {
            name: "minimumPrice",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "sellWrappedSolV0Args",
      type: {
        kind: "struct",
        fields: [
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "all",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "timeCurveV0",
      type: {
        kind: "struct",
        fields: [
          {
            name: "offset",
            type: "i64",
          },
          {
            name: "curve",
            type: {
              defined: {
                name: "primitiveCurve",
              },
            },
          },
          {
            name: "buyTransitionFees",
            type: {
              option: {
                defined: {
                  name: "transitionFeeV0",
                },
              },
            },
          },
          {
            name: "sellTransitionFees",
            type: {
              option: {
                defined: {
                  name: "transitionFeeV0",
                },
              },
            },
          },
        ],
      },
    },
    {
      name: "tokenBondingV0",
      type: {
        kind: "struct",
        fields: [
          {
            name: "baseMint",
            type: "pubkey",
          },
          {
            name: "targetMint",
            type: "pubkey",
          },
          {
            name: "generalAuthority",
            type: {
              option: "pubkey",
            },
          },
          {
            name: "reserveAuthority",
            type: {
              option: "pubkey",
            },
          },
          {
            name: "curveAuthority",
            type: {
              option: "pubkey",
            },
          },
          {
            name: "baseStorage",
            type: "pubkey",
          },
          {
            name: "buyBaseRoyalties",
            type: "pubkey",
          },
          {
            name: "buyTargetRoyalties",
            type: "pubkey",
          },
          {
            name: "sellBaseRoyalties",
            type: "pubkey",
          },
          {
            name: "sellTargetRoyalties",
            type: "pubkey",
          },
          {
            name: "buyBaseRoyaltyPercentage",
            docs: [
              "Percentage of purchases that go to royalties",
              "Percentage Value is (founder_reward_percentage / u32.MAX_VALUE) * 100",
            ],
            type: "u32",
          },
          {
            name: "buyTargetRoyaltyPercentage",
            type: "u32",
          },
          {
            name: "sellBaseRoyaltyPercentage",
            type: "u32",
          },
          {
            name: "sellTargetRoyaltyPercentage",
            type: "u32",
          },
          {
            name: "curve",
            docs: ["The bonding curve to use"],
            type: "pubkey",
          },
          {
            name: "mintCap",
            type: {
              option: "u64",
            },
          },
          {
            name: "purchaseCap",
            type: {
              option: "u64",
            },
          },
          {
            name: "goLiveUnixTime",
            type: "i64",
          },
          {
            name: "freezeBuyUnixTime",
            type: {
              option: "i64",
            },
          },
          {
            name: "createdAtUnixTime",
            type: "i64",
          },
          {
            name: "buyFrozen",
            type: "bool",
          },
          {
            name: "sellFrozen",
            type: "bool",
          },
          {
            name: "index",
            type: "u16",
          },
          {
            name: "bumpSeed",
            type: "u8",
          },
          {
            name: "baseStorageBumpSeed",
            type: "u8",
          },
          {
            name: "targetMintAuthorityBumpSeed",
            type: "u8",
          },
          {
            name: "baseStorageAuthorityBumpSeed",
            type: {
              option: "u8",
            },
          },
          {
            name: "reserveBalanceFromBonding",
            type: "u64",
          },
          {
            name: "supplyFromBonding",
            type: "u64",
          },
          {
            name: "ignoreExternalReserveChanges",
            docs: [
              "Whether or not to ignore changes to base storage and target supply outside of the curve",
            ],
            type: "bool",
          },
          {
            name: "ignoreExternalSupplyChanges",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "tradingPriceDistribution",
      type: {
        kind: "struct",
        fields: [
          {
            name: "seller",
            type: "u16",
          },
          {
            name: "parent",
            type: "u16",
          },
          {
            name: "grandParent",
            type: "u16",
          },
          {
            name: "greatGrandParent",
            type: "u16",
          },
          {
            name: "genesis",
            type: "u16",
          },
        ],
      },
    },
    {
      name: "transferReservesV0Args",
      type: {
        kind: "struct",
        fields: [
          {
            name: "amount",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "transitionFeeV0",
      type: {
        kind: "struct",
        fields: [
          {
            name: "percentage",
            type: "u32",
          },
          {
            name: "interval",
            type: "u32",
          },
        ],
      },
    },
    {
      name: "updateCurveV0Args",
      type: {
        kind: "struct",
        fields: [
          {
            name: "curveAuthority",
            type: {
              option: "pubkey",
            },
          },
        ],
      },
    },
    {
      name: "updateReserveAuthorityV0Args",
      type: {
        kind: "struct",
        fields: [
          {
            name: "newReserveAuthority",
            type: {
              option: "pubkey",
            },
          },
        ],
      },
    },
    {
      name: "updateTokenBondingV0Args",
      type: {
        kind: "struct",
        fields: [
          {
            name: "generalAuthority",
            type: {
              option: "pubkey",
            },
          },
          {
            name: "buyBaseRoyaltyPercentage",
            docs: [
              "Percentage of purchases that go to the founder",
              "Percentage Value is (founder_reward_percentage / u32.MAX_VALUE) * 100",
            ],
            type: "u32",
          },
          {
            name: "buyTargetRoyaltyPercentage",
            type: "u32",
          },
          {
            name: "sellBaseRoyaltyPercentage",
            type: "u32",
          },
          {
            name: "sellTargetRoyaltyPercentage",
            type: "u32",
          },
          {
            name: "buyFrozen",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "vaultState",
      type: {
        kind: "struct",
        fields: [
          {
            name: "mint",
            type: "pubkey",
          },
          {
            name: "lockDate",
            type: "u64",
          },
          {
            name: "authority",
            type: "pubkey",
          },
          {
            name: "owner",
            type: "pubkey",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
};
