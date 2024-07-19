export const joinUrlAndPath = (url: string, path: string): string => {
  url = url.endsWith('/') ? url.substring(0, url.length - 1) : url
  path = path.startsWith('/') ? path.substring(1) : path

  return `${url}/${path}`
}
