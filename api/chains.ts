const chains = [
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
 * @returns
 */
export const getChainString = (chain: any): string | null => {
  return (
    chains.find((c) => c.id === `${chain}` || c.name === `${chain}`)?.name ||
    null
  )
}
