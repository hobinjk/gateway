/**
 * index.js - Loads the Test adapter.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

'use strict';

const MockAdapter = require('./mock-adapter');
console.log('asdf start index.js');
module.exports = (addonManager, manifest) => {
  console.log('asdf start load');
  new MockAdapter(addonManager, manifest);

  try {
    console.log('asdf start notifier');
    const MockNotifier = require('./mock-notifier');
    console.log('asdf start construct notifier');
    new MockNotifier(addonManager, manifest);
    console.log('asdf end all this');
  } catch (e) {
    // Don't blow up because it's probably fine
    console.error('asdf', e);
  }
};
