import { Client as WorkflowClient } from '@upstash/workflow'

import { QSTASH_URL, QSTASH_TOKEN } from './env.js'

console.log(
  'Upstash Workflow URL:',
  QSTASH_URL ? `Defined ${QSTASH_URL}` : 'Not Defined'
)
console.log(
  'Upstash Workflow Token:',
  QSTASH_TOKEN ? `Defined ${QSTASH_TOKEN}` : 'Not Defined'
)

export const workflowClient = new WorkflowClient({
  url: QSTASH_URL,
  // url: 'http://127.0.0.1:8080',
  // token:
  //   'eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0='
  token: QSTASH_TOKEN
})
