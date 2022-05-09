const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const { v4: uuidv4 } = require("uuid");

const twilioClient = require("twilio")(
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET,
    { accountSid: process.env.TWILIO_ACCOUNT_SID }
  );
const findOrCreateRoom = async (roomName) => {
    try {
      // see if the room exists already. If it doesn't, this will throw
      // error 20404.
      await twilioClient.video.rooms(roomName).fetch();
    } catch (error) {
      // the room was not found, so create it
      if (error.code == 20404) {
        await twilioClient.video.rooms.create({
          uniqueName: roomName,
        //   type: "go",
        });
      } else {
        // let other errors bubble up
        throw error;
      }
    }
  };

  
  module.exports={
      findOrCreateRoom
}