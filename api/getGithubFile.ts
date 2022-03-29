export const getFile = function (
  repo: string,
  branch: string,
  path: string,
): Promise<Response> {
  const url = `https://raw.githubusercontent.com/${repo}/${branch}/${path}`
  return fetch(url, {
    cf: {
      cacheTtl: 30, // seconds
      cacheEverything: true,
    },
  })
}

export const getGithubFileIfExists = async (
  repo: string,
  branch: string,
  path: string,
): Promise<Response | null> => {
  const file = await getFile(repo, branch, path)
  return file.status === 200 ? file : null
}
