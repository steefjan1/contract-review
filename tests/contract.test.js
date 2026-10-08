// Consumer contract tests. No dependencies: run with Node 18+.
//   node --test tests/contract.test.js                          checks contract/openapi.json
//   SPEC_PATH=new-spec.md node --test tests/contract.test.js    checks a candidate spec
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const specPath = process.env.SPEC_PATH || path.join(__dirname, '..', 'contract', 'openapi.json');
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));

const op = spec.paths?.['/claims/{id}']?.get;
const schema = op?.responses?.['200']?.content?.['application/json']?.schema;

test('GET /claims/{id} exists', () => {
  assert.ok(op, 'operation GET /claims/{id} is missing');
});

test('200 response returns a JSON object', () => {
  assert.ok(schema, '200 application/json schema is missing');
  assert.strictEqual(schema.type, 'object');
});

for (const field of ['id', 'status', 'amount']) {
  test(`response field "${field}" is present and required`, () => {
    assert.ok(schema?.properties?.[field], `property "${field}" was removed`);
    assert.ok(schema?.required?.includes(field), `"${field}" is no longer required`);
  });
}

test('amount is a number', () => {
  assert.strictEqual(schema?.properties?.amount?.type, 'number');
});

test('status only uses values the consumer knows', () => {
  const known = ['open', 'approved', 'rejected'];
  const values = schema?.properties?.status?.enum || [];
  const unknown = values.filter((v) => !known.includes(v));
  assert.deepStrictEqual(unknown, [], `new status values: ${unknown.join(', ')}`);
});

test('404 response is still documented', () => {
  assert.ok(op?.responses?.['404'], '404 response was removed');
});
