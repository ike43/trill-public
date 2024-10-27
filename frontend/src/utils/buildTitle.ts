import { APP_NAME } from 'constants/app'

export function buildTitle(title: string): string {
  return title + ' | ' + APP_NAME
}
