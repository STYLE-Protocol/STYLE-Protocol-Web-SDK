export const PROTOCOL_CONTRACTS = {
  4: "0x36ACbdcBf366558AD8c6Be12F217Dc64f78d7B72",
  80001: "0xFfe8B49e11883De88e110604DA018572b93f9f24",
  5: "0x57c154b6496f1B5e93BB457e574F65050378e145",
};

export const metaversesJson = [
  {
    id: "0",
    icon: "decentraland.svg",
    name: "Decentraland",
    slug: "decentraland",
    price: 600,
    availabilityRange: 100000,
  },
  // {
  //   id: '1',
  //   icon: 'sandbox.svg',
  //   name: 'The Sandbox',
  //   slug: 'sandbox',
  //   price: 200,
  //   availabilityRange: 1500,
  // },
  {
    id: "1",
    icon: "somnium.svg",
    name: "Somnium Space",
    slug: "somnium_space",
    price: 200,
    availabilityRange: 20,
  },
  {
    id: "2",
    icon: "cryptovoxels.svg",
    name: "Cryptovoxels",
    slug: "cryptovoxels",
    price: 170.01,
    availabilityRange: 1024,
  },
  {
    id: "3",
    icon: "monaverse.svg",
    name: "Monaverse",
    slug: "monaverse",
    price: 199,
    availabilityRange: 1024,
  },
];

export const ENDPOINTS = {
  4: process.env.NEXT_PUBLIC_RINKEBY_ENDPOINT,
  5: process.env.NEXT_PUBLIC_GOERLI_ENDPOINT,
};

export const GATEWAY = "styleprotocol.mypinata.cloud";
