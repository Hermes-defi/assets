import { Router } from 'itty-router'
import { getGithubFileIfExists } from './getGithubFile'

const router: Router = Router()

const getTokenNotFound = async () => {
  return await getGithubFileIfExists(
    'Hermes-defi/assets',
    'master',
    `misc/unknown.png`,
  )
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
  // Add all file source methods to Promise.any, and make sure they throw an error if the file doesn't exist
  const resolvedFile = await Promise.any([sushiSwap(chainString, tokenAddress)])
    // Resolve null if no sources have an icon
    .catch(() => {
      return null
    })
  // Return the file
  return resolvedFile
}

router.get('/:chainString/:tokenAddress', async ({ params }) => {
  if (!params || !params.chainString || !params.tokenAddress) {
    return new Response('Test', { status: 404 })
  }
  const chainString = decodeURIComponent(params.chainString)
  const tokenAddress = decodeURIComponent(params.tokenAddress)

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

router.all('*', () => new Response('404, not found!', { status: 404 }))

addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request))
})
