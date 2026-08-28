import test from 'node:test';
import assert from 'node:assert/strict';
import { digitsOnly, initials, normalizeUrl, socialLabel } from '../src/utils.js';

test('normalizeUrl adds a secure protocol when missing', () => {
  assert.equal(normalizeUrl('example.co.il'), 'https://example.co.il');
  assert.equal(normalizeUrl('http://example.com'), 'http://example.com');
  assert.equal(normalizeUrl('  '), '');
});

test('digitsOnly prepares telephone links', () => {
  assert.equal(digitsOnly('+972 50-123-4567'), '+972501234567');
});

test('initials creates a compact fallback avatar', () => {
  assert.equal(initials('נועה לוי כהן'), 'נל');
  assert.equal(initials(''), 'א');
});

test('socialLabel returns readable network names', () => {
  assert.equal(socialLabel('linkedin'), 'LinkedIn');
});
