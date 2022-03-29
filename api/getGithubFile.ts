export const getFile = function (
  repo: string,
  branch: string,
  path: string,
): Promise<Response> {
  const url = `https://raw.githubusercontent.com/${repo}/${branch}/${path}`
  return fetch(url)
}

export const getGithubFileIfExists = async (
  repo: string,
  branch: string,
  path: string,
): Promise<Response | null> => {
  const file = await getFile(repo, branch, path)
  return file.status === 200 ? file : null
}
