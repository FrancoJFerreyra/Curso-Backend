import twilio from "twilio";

import { config } from 'dotenv'
config()

const accountSid = "ACd6129e31aee633ca338aca03895c1055";
const authToken = process.env.TWILIOTOKEN;

const client = twilio(accountSid, authToken);

const messageTextOptions = {
  body: "Se recibio su pedido",
  from: "+17472944153",
  to: "+",
};

const sendTextMessage = async (messageOptions) => {
  try {
    const message = await client.messages.create(messageOptions);
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

export {
    messageTextOptions,
    sendTextMessage
}
