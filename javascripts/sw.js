/* eslint-env browser, serviceworker, es6 */

'use strict';

let silent_mode = null;

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const current = new Date();
  const pad0CurrentTime = (time) => {
    const hour = ('0' + time.getHours()).slice(-2);
    const mins = ('0' + time.getMinutes()).slice(-2);
    const secs = ('0' + time.getSeconds()).slice(-2);
    return `[${hour}:${mins}:${secs}]`
  }

  const title = 'Shogun Tools';
  const options = {
    body: `${pad0CurrentTime(current)} ${event.data.text()}`,
    icon: '../images/kamon.png',
    badge: '../images/badge.png',
    actions: [
      {action: 'en', title: 'English main page'}, 
      {action: 'jp', title: 'Japanese main page'}],
    silent: silent_mode ? true : false,
    vibrate: [200, 100, 200]};

  if (silent_mode) {
    delete options.vibrate;
  }

  let postSoundForOnce = true

  clients.matchAll({ includeUncontrolled: true }).then(function(clients) {
    clients.forEach(function(client) {
      client.postMessage({
        msg: "yolo",
        sound: postSoundForOnce ? true : false,
        time: current
      })
      postSoundForOnce = false
    });
  });
  
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  const action = event.action;

  event.notification.close();

  if (action === 'jp') {
    clients.openWindow('https://shogun.tools/')
  } else if (action === 'en') {
    clients.openWindow('https://shogun.tools/')
  } else {
    clients.openWindow('https://shogun.tools/')
  }
});
