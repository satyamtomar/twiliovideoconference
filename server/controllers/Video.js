const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// const { Config } = require("../config");
const Joi = require("@hapi/joi");
// const APP_CONSTANTS = require("../appConstants");
import responseMessages from "../resources/response.json";
import {videoToken} from '../utils/tokens';
const Boom = require("boom");
import universalFunctions from "../utils/universalFunctions";
const twilioConfig={twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    apiKey:process.env.TWILIO_API_KEY_SID ,
    apiSecret: process.env.TWILIO_API_KEY_SECRET,
  }}

module.exports = {
  
  getRoomToken: async (req, res) => {
    try {
      const schema = Joi.object({
        roomName: Joi.string().required(),
        identity:Joi.string().required(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
        // return 400 if the request has an empty body or no roomName
        console.log("twilioconfig",twilioConfig);
        const identity = req.body.identity;
        const room = req.body.roomName;
        const token = videoToken(identity, room, twilioConfig);
        // sendTokenResponse(token, res);
if(!token){
    throw Boom.badRequest("token not found")
}
      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Room successfully joined",
          data:token.toJwt(),
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

};
