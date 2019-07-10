/**
 * mock-notifier.js - Mock Notifier.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

'use strict';

const {Notifier, Outlet} = require('gateway-addon');

class MockOutlet extends Outlet {
  constructor(notifier, id) {
    super(notifier, id);
    this.name = 'Mock';
  }

  async notify(title, message, level) {
    console.log(`MockOutlet.notify("${title}", "${message}", ${level})`);
  }
}

class MockNotifier extends Notifier {
  constructor(addonManager, name) {
    super(addonManager, 'mock', name);
    addonManager.addNotifier(this);

    if (!this.outlets['mock-0']) {
      this.handleOutletAdded(new MockOutlet(this, 'mock-0'));
    }
  }
}

function loadMockNotifier(addonManager, manifest, _errorCallback) {
  new MockNotifier(addonManager, manifest.name);
}

module.exports = loadMockNotifier;
