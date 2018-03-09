// based on
// https://serviceworke.rs/strategy-cache-and-update_service-worker_doc.html

const CACHE = 'mozilla-iot-cache-0.0.1';

async function notifyOffline(clientId) {
  let client = await self.clients.get(clientId);
  if (!client) {
    return;
  }
  client.postMessage({
    offline: true
  });
}

self.addEventListener('fetch', function(event) {
  let accept = event.request.headers.get('Accept');
  if (accept === 'application/json' || event.request.method !== 'GET' ||
      event.request.cache !== 'default' || event.request.mode !== 'no-cors') {
    return;
  }

  event.respondWith((async () => {
    let cache = await caches.open(CACHE);
    let matching = await cache.match(event.request);
    if (matching) {
      event.waitUntil((async () => {
        try {
          let response = await fetch(event.request);
          await cache.put(event.request, response.clone());
        } catch(e) {
          await notifyOffline(event.clientId);
        }
      })());
      return matching;
    } else {
      let response = await fetch(event.request);
      await cache.put(event.request, response.clone());
      return response;
    }
  })());
});
