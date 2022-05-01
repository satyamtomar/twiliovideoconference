require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const express = require("express");
const cors=require('cors');
const app = express();

const port = 5000;
const {ROOM_ROUTES} =require('./routes');
// use the Express JSON middleware
app.use(express.json());
app.use(cors());
// create the twilioClient
// const twilioClient = require("twilio")(
//   process.env.TWILIO_API_KEY_SID,
//   process.env.TWILIO_API_KEY_SECRET,
//   { accountSid: process.env.TWILIO_ACCOUNT_SID }
// );

// const findOrCreateRoom = async (roomName) => {
//   try {
//     // see if the room exists already. If it doesn't, this will throw
//     // error 20404.
//     await twilioClient.video.rooms(roomName).fetch();
//   } catch (error) {
//     // the room was not found, so create it
//     if (error.code == 20404) {
//       await twilioClient.video.rooms.create({
//         uniqueName: roomName,
//         type: "go",
//       });
//     } else {
//       // let other errors bubble up
//       throw error;
//     }
//   }
// };
// const getAccessToken = (roomName) => {
//     // create an access token
//     const token = new AccessToken(
//       process.env.TWILIO_ACCOUNT_SID,
//       process.env.TWILIO_API_KEY_SID,
//       process.env.TWILIO_API_KEY_SECRET,
//       // generate a random unique identity for this participant
//       { identity: uuidv4() }
//     );
//     // create a video grant for this specific room
//     const videoGrant = new VideoGrant({
//       room: roomName,
//     });
  
//     // add the video grant
//     token.addGrant(videoGrant);
//     // serialize the token and return it
//     return token.toJwt();
//   };

app.use('/',ROOM_ROUTES);
// Start the Express server
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});