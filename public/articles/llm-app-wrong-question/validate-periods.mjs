// Replays validation only. No model invocation or application writes.
// Usage: node validate-periods.mjs /absolute/path/to/gtm-healthcare-intel
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const projectRoot = process.argv[2];
if (!projectRoot) throw new Error('Supply the GTM repository directory as the first argument.');
const { validateToolInput } = await import(pathToFileURL(path.join(projectRoot, 'lib/query-contract.mjs')));
const { validateQuestionConstraints } = await import(pathToFileURL(path.join(projectRoot, 'lib/query-service.mjs')));
const trace = JSON.parse(fs.readFileSync(new URL('./recorded-query.json', import.meta.url), 'utf8'));
const recordedInput = structuredClone(trace.recordedToolInput);

assert.doesNotThrow(() => validateToolInput('query_practice', recordedInput));
assert.doesNotThrow(() => validateQuestionConstraints('practice', trace.question, recordedInput));
console.log('Recorded request: schema and question checks pass.');

const swapped = structuredClone(recordedInput);
[swapped.queries[0].months, swapped.queries[1].months] =
  [swapped.queries[1].months, swapped.queries[0].months];
assert.doesNotThrow(() => validateToolInput('query_practice', swapped));
console.log('Deliberately swapped periods: schema validation passes.');

assert.throws(
  () => validateQuestionConstraints('practice', trace.question, swapped),
  { message: 'The period for each independent measure must be preserved. Please clarify the measure and its date range.' },
);
console.log('Question validation rejects: The period for each independent measure must be preserved. Please clarify the measure and its date range.');
