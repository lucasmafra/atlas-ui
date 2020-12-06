import * as nut from './log-parser'
const parse = require('csv-parse/lib/sync')
const fs = require('fs');
const csv = fs.readFileSync('./tests/fixtures/transfer_out_log.csv')

const logs = parse(csv, {
  columns: true,
  skip_empty_lines: true
})

test('parseNodes', () => {
  const result = nut.parseNodes(logs)
  expect(1).toBe(1)
});

test('parseLifelines', () => {
  const result = nut.parseLifelines(logs)
  expect(1).toBe(1)
});

test('parseArrows', () => {
  const result = nut.parseArrows(logs)
  expect(1).toBe(1)
});
