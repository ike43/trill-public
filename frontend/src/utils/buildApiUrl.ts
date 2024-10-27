import { API_PREFIX } from 'constants/api'

export function buildApiUrl({ path }: { path: string }): string {
  return 'http://trill-backend' + API_PREFIX + path
}
