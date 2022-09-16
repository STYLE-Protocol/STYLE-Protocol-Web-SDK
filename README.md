# Style-SDK

Style-SDK is way to integrate with your website using HTML &amp; JS file only.

## SDK

It is possible to get a list of NFTs availiable for purchase. For that you need to:

- Copy [contractService](./services/contractService.js) to your directory
- Create `.env` or `.env.local` file with the same structure:

```
NEXT_PUBLIC_RINKEBY_ENDPOINT=https://rinkeby.infura.io/v3/id  // provider endpoint e.g. by Infura (https://infura.io/)
NEXT_PUBLIC_PINATA_API_KEY=api_key                            // api key by Pinata (https://www.pinata.cloud/)
NEXT_PUBLIC_PINATA_SECRET_API_KEY=secret_api_key              // secret api key by Pinata (https://www.pinata.cloud/)
```

Now you can use `getRequestedNFTs` and `getListedNFTs` functions from [contractService](./services/contractService.js)
