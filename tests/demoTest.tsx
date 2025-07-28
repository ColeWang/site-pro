import { sync as globSync } from 'glob'

function demoTest(component: string) {
  const files = globSync(`../packages/components/src/${component}/**/demos/*.{ts,tsx}`)
}
