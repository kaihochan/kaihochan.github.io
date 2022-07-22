/* eslint-env browser, serviceworker, es6 */

'use strict';

self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', function(event) {
  let PopUpstate = event.data.sendPopUp;
  let request = indexedDB.open("sendPopUpdb");
  request.onsuccess = function(event) {
    let db = request.result;
    let sendPopUpstate = db.transaction(["sendPopUp"], "readwrite").objectStore("sendPopUp").put(PopUpstate, 0);
    sendPopUpstate.onsuccess = function (event) { };
    sendPopUpstate.onerror = function (event) { console.log('fail to EDIT') };
  }
});

self.addEventListener('push', function(event) {

  const current = new Date();
  const pad0CurrentTime = (time) => {
    const hour = ('0' + time.getHours()).slice(-2);
    const mins = ('0' + time.getMinutes()).slice(-2);
    const secs = ('0' + time.getSeconds()).slice(-2);
    return `[${hour}:${mins}:${secs}]`
  }

  let data = event.data.json();
  let postSoundForOnce = true;

  if(data.type === "wallet") {
    let push = Object.entries(data)[0]
    push.push(data.NFTinfo)
    push.push(data.notigroup)
    let walletname = data.notigroup.name

    const title = 'Shogun Tools';
    const options = {
      body: `${pad0CurrentTime(current)} Wallet Alert From ${walletname}`,
      icon: './images/kamon.png',
      badge: './images/badge.png',
    };

    if(data.first) {
      clients.matchAll({ includeUncontrolled: true }).then(function(clients) {
        clients.forEach(function(client) {
          client.postMessage({ 
            sound: postSoundForOnce ? true : false, 
            time: current, 
            noti: [push],
            title: true 
          })
          postSoundForOnce = false;
        });
      });

      let request = indexedDB.open("sendPopUpdb");
      request.onsuccess = function(event) {
        let db = request.result;
        let readPopUpstate = db.transaction(["sendPopUp"]).objectStore("sendPopUp").get(0);
        readPopUpstate.onsuccess = function (event) { 
          if(readPopUpstate.result) {
            self.registration.showNotification(title, options);
          }
         };
        readPopUpstate.onerror = function (event) { console.log('fail to READ') };
      }
    }
    else {
      clients.matchAll({ includeUncontrolled: true }).then(function(clients) {
        clients.forEach(function(client) {
          client.postMessage({   
            noti: [push]
          })
        });
      });
    };

    let request = indexedDB.open("notificationdb");
    request.onsuccess = function(event) {
      let db = request.result;
      let addnotification = db.transaction(["notification"], "readwrite").objectStore("notification").add({wallet: [push]});
      addnotification.onsuccess = function (event) {
        let count = db.transaction(["notification"]).objectStore("notification").count();
        count.onsuccess = function() {
          if(count.result > 30) {
            let deleterecords = db.transaction(["notification"], "readwrite").objectStore("notification");
            deleterecords.openCursor().onsuccess = function(event) {
              let cursor = event.target.result;
              if(cursor) {
                deleterecords.delete(cursor.key);
              }
              else {}
            };
          };
        };
      };
      addnotification.onerror = function (event) { console.log('fail to ADD') };
    }

  }

  if(data.type === "gas") {
    let time = Date.now()
    let Gas = []
    Gas.push(Object.entries(data)[0])
    Gas.push(time)
    Gas.push(data.notigroup)

    clients.matchAll({ includeUncontrolled: true }).then(function(clients) {
      clients.length != 0 ? Gas.push({ checked: true }) : Gas.push({ checked: false })
    })

    clients.matchAll({ includeUncontrolled: true }).then(function(clients) {
      clients.forEach(function(client) {
        client.postMessage({   
          gas: Gas
        })
      });
    });

    if(data.noti) {
      let value = Object.entries(data)[3][1].value

      const title = 'Shogun Tools';
      const options = {
        body: `${pad0CurrentTime(current)} Gas has reached ${value} Gwei`,
        icon: './images/kamon.png',
        badge: './images/badge.png',
      };

      clients.matchAll({ includeUncontrolled: true }).then(function(clients) {
        clients.forEach(function(client) {
          client.postMessage({   
            sound: postSoundForOnce ? true : false, 
            time: current,
            title: true
          })
          postSoundForOnce = false;
        });
      });
      

      let request = indexedDB.open("sendPopUpdb");
      request.onsuccess = function(event) {
        let db = request.result;
        let readPopUpstate = db.transaction(["sendPopUp"]).objectStore("sendPopUp").get(0);
        readPopUpstate.onsuccess = function (event) { 
          if(readPopUpstate.result) {
            self.registration.showNotification(title, options);
          }
         };
        readPopUpstate.onerror = function (event) { console.log('fail to READ') };
      }

      let request2 = indexedDB.open("notificationdb");
      request2.onsuccess = function(event) {
        let db2 = request2.result;
        let addnotification = db2.transaction(["notification"], "readwrite").objectStore("notification").add({gas: [Gas]});
        addnotification.onsuccess = function (event) { 
          let count = db2.transaction(["notification"]).objectStore("notification").count();
          count.onsuccess = function() {
            if(count.result > 30) {
              let deleterecords = db2.transaction(["notification"], "readwrite").objectStore("notification");
              deleterecords.openCursor().onsuccess = function(event) {
                let cursor = event.target.result;
                if(cursor) {
                  deleterecords.delete(cursor.key);
                }
                else {}
              };
            };
          };
        };
        addnotification.onerror = function (event) { console.log('fail to ADD') };
      }
    }
  }

  if(data.type === "token") {
    let time = Date.now()
    let Token = []
    Token.push(Object.entries(data)[0])
    Token.push(time)
    Token.push(data.notigroup)

    clients.matchAll({ includeUncontrolled: true }).then(function(clients) {
      clients.length != 0 ? Token.push({ checked: true }) : Token.push({ checked: false })
    })

    clients.matchAll({ includeUncontrolled: true }).then(function(clients) {
      clients.forEach(function(client) {
        client.postMessage({   
          token: Token
        })
      });
    });

    if(data.noti) {
      let name = Object.entries(data)[0][0]
      let value = Object.entries(data)[4][1].value

      if(name === 'eth/usd') { name = 'ETH' }
      else{ name = 'Token' }

      const title = 'Shogun Tools';
      const options = {
        body: `${pad0CurrentTime(current)} ${name} reaches ${value} USD`,
        icon: './images/kamon.png',
        badge: './images/badge.png',
      };
      
      clients.matchAll({ includeUncontrolled: true }).then(function(clients) {
        clients.forEach(function(client) {
          client.postMessage({   
            sound: postSoundForOnce ? true : false, 
            time: current,
            title: true
          })
          postSoundForOnce = false;
        });
      });

      let request = indexedDB.open("sendPopUpdb");
      request.onsuccess = function(event) {
        let db = request.result;
        let readPopUpstate = db.transaction(["sendPopUp"]).objectStore("sendPopUp").get(0);
        readPopUpstate.onsuccess = function (event) { 
          if(readPopUpstate.result) {
            self.registration.showNotification(title, options);
          }
         };
        readPopUpstate.onerror = function (event) { console.log('fail to READ') };
      }

      let request2 = indexedDB.open("notificationdb");
      request2.onsuccess = function(event) {
        let db2 = request2.result;
        let addnotification = db2.transaction(["notification"], "readwrite").objectStore("notification").add({token: [Token]});
        addnotification.onsuccess = function (event) { 
          let count = db2.transaction(["notification"]).objectStore("notification").count();
          count.onsuccess = function() {
            if(count.result > 30) {
              let deleterecords = db2.transaction(["notification"], "readwrite").objectStore("notification");
              deleterecords.openCursor().onsuccess = function(event) {
                let cursor = event.target.result;
                if(cursor) {
                  deleterecords.delete(cursor.key);
                }
                else {}
              };
            };
          };
         };
        addnotification.onerror = function (event) { console.log('fail to ADD') };
      }
    }
  }
  postSoundForOnce = true;
}); 

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  clients.openWindow('http://localhost:9999/home');
});
