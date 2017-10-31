// https://serviceworke.rs/strategy-cache-and-update_service-worker_doc.html
const CACHE = 'gateway';

// Generated via `find . -type f`
const staticFiles = [
  '/css/all.css',
  '/css/adapters.css',
  '/css/thing.css',
  '/css/rules-common.css',
  '/css/floorplan.css',
  '/css/login.css',
  '/css/rules.css',
  '/css/app.css',
  '/css/settings.css',
  '/css/rule.css',
  '/css/context-menu.css',
  '/css/subdomain-form.css',
  '/css/user-form.css',
  '/css/add-thing.css',
  '/css/menu.css',
  '/css/adapter.css',
  '/css/things.css',
  '/images/add.png',
  '/images/unknown-thing.svg',
  '/images/checkbox-sprite.png',
  '/images/good.png',
  '/images/things-icon.png',
  '/images/icon.png',
  '/images/adapters-icon.png',
  '/images/on-off-switch-on.png',
  '/images/delete-16.svg',
  '/images/rules-icon.png',
  '/images/microphone.svg',
  '/images/log-out-icon.png',
  '/images/onoff.svg',
  '/images/on-off-switch-off.png',
  '/images/binary-sensor-off.png',
  '/images/background-small.png',
  '/images/users-icon.png',
  '/images/right-arrow.png',
  '/images/binary-sensor.png',
  '/images/adapter-icon.png',
  '/images/domain-icon.png',
  '/images/loading.gif',
  '/images/unknown-thing.png',
  '/images/background.png',
  '/images/binary-sensor-on.png',
  '/images/menu.png',
  '/images/arrowhead-right-16.svg',
  '/images/speech-icon.png',
  '/images/upload.png',
  '/images/moziot-wordmark.png',
  '/images/on-off-switch.svg',
  '/images/customize-16.svg',
  '/images/edit.svg',
  '/images/settings-icon.png',
  '/images/back-gray-16.svg',
  '/images/on-off-switch.png',
  '/images/microphone-active.svg',
  '/images/arrowhead-left-16.svg',
  '/images/delete-button.png',
  '/images/bad.png',
  '/images/done.svg',
  '/images/update-icon.svg',
  '/images/back.png',
  '/images/experiments-icon.png',
  '/images/back-16.svg',
  '/images/floorplan-icon.png',
  '/js/adapter.js',
  '/js/rules-screen.js',
  '/js/all.js',
  '/js/create-user.js',
  '/js/on-off-switch.js',
  '/js/new-thing.js',
  '/js/things.js',
  '/js/check-user.js',
  '/js/add-thing.js',
  '/js/context-menu.js',
  '/js/rule-screen.js',
  '/js/speech.js',
  '/js/setup_subdomain.js',
  '/js/login.js',
  '/js/floorplan.js',
  '/js/router.js',
  '/js/adapters.js',
  '/js/rules/Draggable.js',
  '/js/rules/RuleCard.js',
  '/js/rules/Gateway.js',
  '/js/rules/PropertySelect.js',
  '/js/rules/DevicePropertyBlock.js',
  '/js/rules/Rule.js',
  '/js/lib/page.js',
  '/js/lib/stm_web.min.js',
  '/js/thing.js',
  '/js/.service-worker.js.swp',
  '/js/binary-sensor.js',
  '/js/service-worker.js',
  '/js/menu.js',
  '/js/api.js',
  '/js/app.js',
  '/js/settings.js',
  '/signup/index.html',
  '/uploads/floorplan.svg',
  '/uploads/README.md',
  '/things.json',
  '/audio/failure.mp3',
  '/audio/success.mp3',
  '/fonts/ZillaSlab-Bold.woff',
  '/fonts/ZillaSlab-Regular.woff',
  '/fonts/opensans-regular.woff2',
  '/fonts/ZillaSlab-RegularItalic.woff',
  '/fonts/ZillaSlab-BoldItalic.woff',
  '/fonts/ZillaSlab-RegularItalic.woff2',
  '/fonts/ZillaSlab-Regular.woff2',
  '/fonts/ZillaSlab-BoldItalic.woff2',
  '/fonts/opensans-bold.woff2',
  '/fonts/opensans-regular.woff',
  '/fonts/ZillaSlab-Bold.woff2',
  '/fonts/opensans-bold.woff',
  '/login/index.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(precache());
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') {
    return;
  }

  if (event.request.headers.get('Accept') === 'application/json') {
    return;
  }

  // Respond from cache if available then cache the current network response
  // for future use
  event.respondWith(fromCache(event.request).catch(() => {
    // Fall back to fetching normally
    return fetch(event.request);
  }));
  event.waitUntil(cache(event.request));
});

function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(staticFiles);
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function(cache) {
    return cache.match(request);
  }).then(function(matching) {
    return matching || Promise.reject('no-match');
  });
}

function cache(request) {
  return Promise.all([
    caches.open(CACHE),
    fetch(request)
  ]).then(function([cache, response]) {
    return cache.put(request, response);
  });
}
