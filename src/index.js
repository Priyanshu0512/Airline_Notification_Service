const {ServerConfig,Logger} = require('./config');
const express = require('express');
const app =express();
const apiRoutes =require('./routes');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mailSender = require('./config/email_config');


app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT, async function exec(){
    console.log(`Successfully started the server on ${ServerConfig.PORT}`);
    Logger.info("Success",{});
    try {
        const response = await mailSender.sendMail({
            from: ServerConfig.GMAIL_EMAIL,
            to: 'abc@gmail.com',
            subject: 'is the service working?',
            text: "hi"
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
})