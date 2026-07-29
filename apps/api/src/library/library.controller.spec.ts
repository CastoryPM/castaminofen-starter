import 'reflect-metadata';
import assert from 'node:assert/strict';
import test from 'node:test';
import { PATH_METADATA } from '@nestjs/common/constants';
import { LibraryController } from './library.controller';

test('LibraryController exposes the library route under the global API prefix', () => {
  const path = Reflect.getMetadata(PATH_METADATA, LibraryController);
  assert.equal(path, 'library');
});
