# 🖥 For Developers

## Fetch NFTs

### Fetch listed NFTs

```
getListedNFTs = async ({
  cursor = 0,
  amount = 100,
  chainId = 4,
  metaverse = "",
})
```



* `cursor: integer` - Start index of `getStakes` protocol\`s function (as it uses pagination).
* `amount: integer` - Number of viewed indexes of `getStakes` protocol\`s function (as it uses pagination).
* `chainId: integer` - Chain Id to be able to use it cross-chain.
* `metaverse: string` - Using for metaverse filter. Currently possible values are: `DECENTRALAND`, `SANDBOX`, `SOMNIUM_SPACE`, `CRYPTOVOXELS` and emptiness (for any metaverse).

### Fetch requested NFTs

```
getRequestedNFTs = async ({
  cursor = 0,
  amount = 100,
  chainId = 4,
  metaverse = "",
})
```

* `cursor: integer` - Start index of `getStakes` protocol\`s function (as it uses pagination).
* `amount: integer` - Number of viewed indexes of `getStakes` protocol\`s function (as it uses pagination).
* `chainId: integer` - Chain Id to be able to use it cross-chain.
* `metaverse: string` - Using for metaverse filter. Currently possible values are: `DECENTRALAND`, `SANDBOX`, `SOMNIUM_SPACE`, `CRYPTOVOXELS` and emptiness (for any metaverse).
