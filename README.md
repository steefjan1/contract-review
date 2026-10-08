# contract-review

Demo repository for a Logic Apps Automation managed agent running in a prebuilt sandbox.

- `contract/openapi.json` is the current contract of the Claims API.
- `tests/contract.test.js` holds the consumer contract tests. They need Node 18 or later and no packages.
- `skills/contract-review/SKILL.md` tells the agent how to review a candidate specification.
- `samples/` holds two candidate specifications and ready-made request bodies for the workflow's HTTP trigger.

## Run the tests

```
node --test tests/contract.test.js
SPEC_PATH=samples/new-spec-breaking.json node --test tests/contract.test.js
SPEC_PATH=samples/new-spec-compatible.json node --test tests/contract.test.js
```

The breaking sample removes `amount` and adds the status value `withdrawn`. The compatible sample adds an optional `currency` field.
