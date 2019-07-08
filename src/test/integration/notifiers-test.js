'use strict';

const {server, chai} = require('../common');
const {
  TEST_USER,
  createUser,
  headerAuth,
} = require('../user');
const Constants = require('../../constants');

describe('notifiers/', () => {
  let jwt;
  beforeEach(async () => {
    jwt = await createUser(server, TEST_USER);
  });

  it('gets a list of all notifiers', async () => {
    const res = await chai.request(server)
      .get(Constants.NOTIFIERS_PATH)
      .set('Accept', 'application/json')
      .set(...headerAuth(jwt));

    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(1);
    const mockNotifier = res.body[0];
    expect(mockNotifier).toHaveProperty('id');
    expect(mockNotifier.id).toEqual('mock-notifier');
  });
});

