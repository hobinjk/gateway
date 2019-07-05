/**
 * mock-notifier.js - Mock Notifier
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

'use strict';

const {
  Notifier,
  Outlet,
} = require('gateway-addon');

class MockOutlet extends Outlet {
  constructor(notifier, id) {
    super(notifier, id);
    this.name = 'Mock Outlet';
  }

  async notify(title, message, level) {
    // TODO test this
    console.log('MockOutlet.notify', title, message, level);
  }
}

class MockNotifier extends Notifier {
  constructor(addonManager, manifest) {
    super(addonManager, manifest.name, manifest.name);
    addonManager.addNotifier(this);

    if (!this.outlets['mock-notifier-0']) {
      this.handleOutletAdded(new MockOutlet(this, 'mock-notifier-0'));
    }
  }

  /**
   * For cleanup between tests. Returns a promise which resolves
   * when all of the state has been cleared.
   */
  clearState() {
    return Promise.all(
      Object.keys(this.outlets).map((id) => {
        return this.removeOutlet(id);
      })
    );
  }
}

module.exports = MockNotifier;
