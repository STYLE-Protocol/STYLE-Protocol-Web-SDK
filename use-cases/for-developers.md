# 🖥 For Developers

## Fetch NFTs

### Fetch listed NFTs

How to import:

```javascript
import { getListedNFTs } from '@style-protocol/style-sdk'
```

How it looks like:

<pre class="language-javascript"><code class="lang-javascript"><strong>const getListedNFTs = async ({
</strong>  cursor = 0,
  amount = 100,
  chainId = 4,
  metaverse = "",
})</code></pre>



* `cursor: integer` - Start index of `getStakes` protocol\`s function (as it uses pagination).
* `amount: integer` - Number of viewed indexes of `getStakes` protocol\`s function (as it uses pagination).
* `chainId: integer` - Chain Id to be able to use it cross-chain.
* `metaverse: string` - Using for metaverse filter. Currently possible values are: `decentranland`, `sandbox`, `somnium_space`, `cryptovoxels` and emptiness (for any metaverse).

### Fetch requested NFTs

How to import:

```javascript
import { getRequestedNFTs } from '@style-protocol/style-sdk'
```

How it looks like:

```javascript
const getRequestedNFTs = async ({
  cursor = 0,
  amount = 100,
  chainId = 4,
  metaverse = "",
})
```

* `cursor: integer` - Start index of `getStakes` protocol\`s function (as it uses pagination).
* `amount: integer` - Number of viewed indexes of `getStakes` protocol\`s function (as it uses pagination).
* `chainId: integer` - Chain Id to be able to use it cross-chain.
* `metaverse: string` - Using for metaverse filter. Currently possible values are: `decentranland`, `sandbox`, `somnium_space`, `cryptovoxels` and emptiness (for any metaverse).
