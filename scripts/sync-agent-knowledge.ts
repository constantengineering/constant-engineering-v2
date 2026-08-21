/**
 * Regenerate data/agent-knowledge.json from server/utils/agentKnowledge.ts.
 * Run: npm run sync:knowledge
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { exportAgentKnowledgeJson } from '../server/utils/agentKnowledge'

const outPath = resolve(process.cwd(), 'data/agent-knowledge.json')
const json = exportAgentKnowledgeJson()

writeFileSync(outPath, `${JSON.stringify(json, null, 2)}\n`)
console.log(`Wrote ${outPath}`)
