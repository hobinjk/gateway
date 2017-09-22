/**
 * Adapter Controller.
 *
 * Manages HTTP requests to /adapters. 
 *  
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

var express = require('express');
var adapterManager = require('../adapter-manager');
var APIError = require('../APIError');

var adaptersController = express.Router();

/**
 * Return a list of adapters
 */
adaptersController.get('/', (request, response) => {
  var adapters = adapterManager.getAdapters();
  var adapterList = [];
  for (var adapterId in adapters) {
    var adapter = adapters[adapterId];
    adapterList.push(adapter.asDict());
  }
  response.json(adapterList);
});

/**
 * Get a particular adapter.
 */
adaptersController.get('/:adapterId/', (request, response) => {
  var adapterId = request.params.adapterId;
  var adapter = adapterManager.getAdapter(adapterId);
  if (adapter) {
    response.json(adapter.asDict());
  } else {
    var error = 'Adapter "' + adapterId + '" not found.';
    response.status(404).send(new APIError(error).toString());
  }
});

module.exports = adaptersController;
