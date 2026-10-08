---
name: contract-review
description: Review a candidate OpenAPI specification against the current contract and report breaking changes.
---

# Contract review

Use this skill when asked to review a new API specification.

## Steps

1. Read the current contract in `contract/openapi.json`.
2. Read the candidate specification from the input file. It is JSON, even if the file extension is `.md` or `.txt`.
3. Run the consumer contract tests against the candidate:
   `SPEC_PATH=<path to candidate> node --test tests/contract.test.js`
4. Compare the two specifications yourself as well. The tests cover only what this consumer uses.

## What counts as breaking

- A removed operation, response code, or response property.
- A property that was required and is now optional or gone.
- A changed type.
- A new enum value in a response, because the consumer rejects unknown values.

## What is not breaking

- A new optional response property.
- A new operation.

## Report format

Return a short report with these parts:

- **Verdict:** BREAKING or COMPATIBLE.
- **Test result:** number of tests passed and failed, copied from the test output.
- **Breaking changes:** one line each, with the operation and the field.
- **Non-breaking changes:** one line each.

If the candidate is empty or is not valid JSON, or the tests cannot run, say so and stop. Never guess a test result.
