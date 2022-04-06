type ChainItem = {
  id: string
  name: string
}

const chains: Array<ChainItem> = [
  {
    id: '1666600000',
    name: 'harmony',
  },
  {
    id: '1666700000',
    name: 'harmony-testnet',
  },
]

/**
 * Return the chain name for a given chain id OR name
 * @param chain
 * @returns {string}
 */
export const getChainString = (chain: number | string): string | null => {
  return (
    chains.find((c) => c.id === `${chain}` || c.name === `${chain}`)?.name ||
    null
  )
}
