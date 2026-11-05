import test from 'node:test';
import assert from 'node:assert/strict';
import { createApiClient } from './api-client.mjs';
import { showcaseEvents } from './site-mode.mjs';

test('showcase calendar is explicitly labelled and never requests an API or access code', async () => {
  const never = () => { throw new Error('showcase must remain offline'); };
  const client = createApiClient({ showcase: true, fetchImpl: never, getAccessCode: never });
  const events = await client.getCalendarEvents('2000-01-01', '2100-01-01');
  assert.equal(events.length, 3);
  assert.ok(events.every(event => event.title.startsWith('示例 · ')));
});

test('showcase refuses planning and writes without sending the entered text anywhere', async () => {
  const client = createApiClient({ showcase: true, fetchImpl: () => { assert.fail('unexpected request'); } });
  for (const operation of [
    () => client.createPlanningSession('private input', new Date().toISOString()),
    () => client.submitAnswers('s1', { q: 'private answer' }),
    () => client.generateDraft('s1'),
    () => client.confirmDraft('d1', 'key'),
    () => client.deleteDraftItem('d1', 'i1'),
  ]) {
    await assert.rejects(operation, error => error.errorCode === 'SHOWCASE_ONLY');
  }
});

test('example events are restricted to the current week and requested date range', () => {
  const now = new Date(2026, 10, 4, 12);
  const events = showcaseEvents(new Date(2026, 10, 4), new Date(2026, 10, 5), now);
  assert.equal(events.length, 1);
  assert.equal(events[0].title, '示例 · 项目沟通');
  assert.equal(events[0].start_at.slice(11, 16), '15:00');
  assert.equal(events[0].end_at.slice(11, 16), '16:00');
  assert.deepEqual(showcaseEvents(new Date(2026, 10, 9), new Date(2026, 10, 16), now), []);
});
