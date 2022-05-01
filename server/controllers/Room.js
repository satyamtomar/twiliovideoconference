const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// const { Config } = require("../config");
const Joi = require("@hapi/joi");
// const APP_CONSTANTS = require("../appConstants");
import responseMessages from "../resources/response.json";
import {findOrCreateRoom} from '../utils/findOrCreateRoom';
import {getAccessToken} from '../utils/generateAccessToken';
const Boom = require("boom");
import universalFunctions from "../utils/universalFunctions";

module.exports = {
  
  joinRoom: async (req, res) => {
    try {
      const schema = Joi.object({
        roomName: Joi.string().required(),
        identity:Joi.string().required(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
        // return 400 if the request has an empty body or no roomName
        if (!req.body || !req.body.roomName) {
          throw Boom.badRequest("Room Name is required")
        }
        const roomName = req.body.roomName;
        // find or create a room with the given roomName
        findOrCreateRoom(roomName);
        // generate an Access Token for a participant in this room
        const token = getAccessToken(roomName,req.body.identity);
        // res.send({
        //   token: token,
        // });
      

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Room successfully joined",
          data:token,
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

};
