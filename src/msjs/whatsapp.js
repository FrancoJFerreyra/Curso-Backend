import twilio from 'twilio'
require('dotenv').config()

const accountSid = 'ACd6129e31aee633ca338aca03895c1055'
const authToken = process.env.TWILIOTOKEN

const client = twilio(accountSid, authToken)

const whatsappOptions = {
    body: '',
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+5491136341658'
}

const sendWhatsapp = async (messageOptions) =>{
    try {
    const message = await client.messages.create(messageOptions)
    console.log(message)
} catch (error) {
    console.log(error)
}
}
export {
    whatsappOptions,
    sendWhatsapp
}
