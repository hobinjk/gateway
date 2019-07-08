/**
 * index.js - Loads the Test adapter.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

'use strict';

const MockAdapter = require('./mock-adapter');
module.exports = (addonManager, manifest) => {
  new MockAdapter(addonManager, manifest);

  try {
    // const MockNotifier = require('./mock-notifier');
    // new MockNotifier(addonManager, manifest);
  } catch (e) {
    // Don't blow up because it's probably fine
    console.error(e);
  }
};
