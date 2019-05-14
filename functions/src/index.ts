import * as functions from 'firebase-functions';


import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);


exports.newSubscriberNotification = functions.firestore
    .document('todos/{todoID}')
    .onCreate(async event =>{

        const data = event.data.data();
        const userId = data.userId;
        const subscriber = data.subscriberId;

        const payload ={
            notification:   {
                title: 'New Item Created',
                body: `${subscriber} is following your content`
            }
        };

        const db = admin.firestore();
        const devicesRef = db.collection('devices').where('userId', '==', userId);

        //get user tokens and send notifications

        const devices  = await devicesRef.get();

        const tokens =[];

        // loop over documents

        devices.forEach(result =>{
            const token = result.data().tokens;
            tokens.push(token);
        });

        // Send Notification

        return admin.messaging().sendToDevice(tokens, payload);


    });


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
