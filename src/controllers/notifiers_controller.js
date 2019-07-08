'use strict';

const PromiseRouter = require('express-promise-router');
const AddonManager = require('../addon-manager');
const Constants = require('../constants');

const NotifiersController = PromiseRouter();

NotifiersController.get('/', async (request, response) => {
  const notifiers = AddonManager.getNotifiers();
  const notifierList = Array.from(notifiers.values()).map((notifier) => {
    return notifier.asDict();
  });
  response.status(200).json(notifierList);
});

NotifiersController.get('/:notifierId', async (request, response) => {
  const notifierId = request.params.notifierId;
  const notifier = AddonManager.getNotifier(notifierId);
  if (notifier) {
    response.status(200).send(notifier.asDict());
  } else {
    response.status(404).send(`Notifier "${notifierId}" not found.`);
  }
});

NotifiersController.get('/:notifierId/outlets', async (request, response) => {
  const notifierId = request.params.notifierId;
  const notifier = AddonManager.getNotifier(notifierId);
  if (!notifier) {
    response.status(404).send(`Notifier "${notifierId}" not found.`);
    return;
  }
  const outlets = notifier.getOutlets();
  const outletList = Array.from(Object.values(outlets)).map((outlet) => {
    return outlet.asDict();
  });
  response.status(200).json(outletList);
});

/**
 * Create a new notification with the title, message, and level contained in
 * the request body
 */
NotifiersController.post(`/:notifierId/outlets/:outletId/notify`, async (request, response) => {
  const notifierId = request.params.notifierId;
  const outletId = request.params.notifierId;
  const notifier = AddonManager.getNotifier(notifierId);
  if (!notifier) {
    response.status(404).send(`Notifier "${notifierId}" not found.`);
    return;
  }
  const outlet = notifier.getOutlet(outletId);
  if (!outlet) {
    response.status(404).send(`Outlet "${outletId}" of notifier "${notifierId}" not found.`);
    return;
  }
  const {title, message, level} = request.body;
  if (typeof title !== 'string' || typeof message !== 'string') {
    response.status(400).send(`Title and message must be strings`);
    return;
  }
  const levels = Object.values(Constants.NotificationLevel);
  if (!levels.includes(level)) {
    response.status(400).send(`Level must be one of ${JSON.stringify(levels)}`);
    return;
  }
  try {
    await outlet.notify(title, message, level);
    response.status(201);
  } catch (e) {
    response.status(500).send(e);
  }
});

module.exports = NotifiersController;

