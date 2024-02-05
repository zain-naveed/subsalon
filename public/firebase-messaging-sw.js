importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

if ('serviceWorker' in navigator) {
  
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function(registration) {
      firebase.messaging().useServiceWorker(registration);
    }).catch(function(err) {
    });
  }
  

let app = firebase.initializeApp({
  apiKey: "AIzaSyD0GLPIc6ZblgvZL1CXY1rebc085bqaxRk",
  authDomain: "salon-substitute.firebaseapp.com",
  projectId: "salon-substitute",
  storageBucket: "salon-substitute.appspot.com",
  messagingSenderId: "507623433397",
  appId: "1:507623433397:web:9cd9d43d8934fc0bab8afc",
  measurementId: "G-MQ7ZGB1S50"
})
const initMessaging = firebase.messaging(app)
self.addEventListener("send",()=> "alsdjkfls")
initMessaging.onBackgroundMessage(function(payload) {
  
 // Customize notification here
  const notification = payload.data;
  const notificationTitle = payload.data.body.title;
  const notificationOptions = {
    body: payload.data.body,
  };
  self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(all => all.forEach(client => {
    client.postMessage("Responding to ");
    // client.postMessage("Responding to ");
   }))
   self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('push',  function(event) {
  // const notificationOptions = {
  //   body: 'asdfasdf',
  // };
  // self.registration.showNotification("asdf",
  // notificationOptions)
  // tried  self.registration.showNotification('Hello World') but still does not show up
 });


