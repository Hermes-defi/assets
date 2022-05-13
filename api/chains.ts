export type ChainItem = {
  id: string
  name: string
  tokenOverrides?: { [tokenAddress: string]: string }
}

const chains: Array<ChainItem> = [
  {
    id: '1666600000',
    name: 'harmony',
    tokenOverrides: {
      one: 'ONE',
    },
  },
  {
    id: '1666700000',
    name: 'harmony-testnet',
    tokenOverrides: {
      one: 'ONE',
    },
  },
]

export const getChain = (chain: number | string): ChainItem | null => {
  return (
    chains.find((c) => c.id === `${chain}` || c.name === `${chain}`) || null
  )
}

/**
 * Return the chain name for a given chain id OR name
 * @param chain
 * @returns {string}
 */
export const getChainString = (chain: number | string): string | null => {
  return getChain(chain)?.name || null
}
