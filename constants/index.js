export const PROTOCOL_CONTRACTS = {
  80001: "0xFfe8B49e11883De88e110604DA018572b93f9f24",
  5: "0x87148553f8D5c32Ec2358Ab1f3b2eF9C3bBd0f6D",
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
  {
    id: "4",
    icon: "fabwelt.svg",
    name: "Fabwelt",
    slug: "fabwelt",
    price: 199,
    availabilityRange: 1024,
  },
];

export const ENDPOINTS = {
  5: process.env.NEXT_PUBLIC_GOERLI_ENDPOINT,
};

export const GATEWAY = "styleprotocol.mypinata.cloud";

export const DEFAULT_IMAGE = "/assets/images/default_nft.svg";
export const DEFAULT_IMAGE_3D = "/assets/images/derivative.png";
