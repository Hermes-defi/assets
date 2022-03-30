import { Router } from 'itty-router'
import { utils } from 'ethers'
import { getGithubFileIfExists } from './getGithubFile'

const router: Router = Router()

// Return a 404
const notFound = () => new Response('404, not found!', { status: 404 })

const getTokenNotFound = async () => {
  return await getGithubFileIfExists(
    'Hermes-defi/assets',
    'master',
    `misc/unknown.png`,
  )
}

const hermesDefi = async (chainString: string, tokenAddress: string) => {
  const res = await getGithubFileIfExists(
    'Hermes-defi/assets',
    'main',
    `blockchains/${chainString}/assets/${tokenAddress}/logo.png`,
  )
  // Throw an error if the file doesn't exist, that way tryFiles knows to keep trying
  if (res?.status !== 200) throw new Error('File not found')
  return res
}

const sushiSwap = async (chainString: string, tokenAddress: string) => {
  const res = await getGithubFileIfExists(
    'sushiswap/assets',
    'master',
    `blockchains/${chainString}/assets/${tokenAddress}/logo.png`,
  )

  // Throw an error if the file doesn't exist, that way tryFiles knows to keep trying
  if (res?.status !== 200) throw new Error('File not found')
  return res
}

const tryFiles = async (chainString: string, tokenAddress: string) => {
  // Try Hermes Defi first
  const hermesFile = await hermesDefi(chainString, tokenAddress).catch(
    () => null,
  )
  // If the Hermes Defi repo has a match, return it
  if (hermesFile?.status === 200) return hermesFile
  // Add all other file source methods to Promise.any, and make sure they throw an error if the file doesn't exist
  const resolvedFile = await Promise.any([sushiSwap(chainString, tokenAddress)])
    // Resolve null if no sources have an icon
    .catch(() => {
      return null
    })
  // Return the file
  return resolvedFile
}

const getFormattedTokenAddress = (tokenAddress: string) => {
  try {
    return utils.getAddress(`${tokenAddress}`.toLocaleLowerCase())
  } catch (e) {
    return null
  }
}

router.get('/:chainString/:tokenAddress', async ({ params }) => {
  if (!params || !params.chainString || !params.tokenAddress) {
    return notFound()
  }
  const chainString = decodeURIComponent(params.chainString)
  const tokenAddress = getFormattedTokenAddress(
    decodeURIComponent(params.tokenAddress),
  )

  if (!tokenAddress) {
    return notFound()
  }

  const file = await tryFiles(chainString, tokenAddress)

  if (file?.status !== 200) {
    return getTokenNotFound()
  }

  const res = new Response(file.body, {
    status: file.status,
    headers: file.headers,
  })

  // Have the browser cache this response for 5 minutes
  res.headers.set('Cache-Control', 'max-age=300')

  return res
})

router.all('*', () => notFound())

addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request))
})
