import { response } from "express";
import request from "request"
require('dotenv').config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
// const IMG_GET_STARTED = 'https://bit.ly/loghorizon-chatbot'
const IMG_MAIN_MENU = 'https://img.freepik.com/free-vector/modern-restaurant-menu-fast-food_52683-48982.jpg?w=2000'
const IMG_HOURS = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-open-hours-poster-template-design-679efb3c48c0f2dbcfb9a07d337bd562_screen.jpg?ts=1637039341'
const IMG_SHOW_ROOMS = 'https://images.squarespace-cdn.com/content/v1/5f8f46ebf88e8a03d3dd5466/1620936876522-6N7VP0ABJH73N79G659D/53_BanquetLG.png'
const IMG_GET_STARTED = 'https://assets.architecturaldigest.in/photos/63733ec2a2dd6ea6560eb6da/16:9/pass/Ditas%20Interior%20Image%20-%201%20(8).png'
function callSendAPI(sender_psid,response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    }); 
}
let getUserName = (sender_psid) => {
    return new Promise((resolve, reject) => {
        // Send the HTTP request to the Messenger Platform
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                body = JSON.parse(body)
                let username = `${body.first_name} ${body.last_name}`;
                console.log("usename: ",username);
                resolve(username);
            } else {
                console.error("Unable to send message:" + err);
                reject(err);
            }
        });
    })
}
let handleGetStarted = (sender_psid) => {
    return new Promise( async (resolve,reject)=>{
        try {
            let username = await getUserName(sender_psid);
            let response1 = { "text": `OK. Welcome ${username} and have a good day. Make yourselft at home!` };
            let response2 = GetStartedTemplate();

            // send text message
            await callSendAPI(sender_psid,response1);
            // send generic tempalte_generic
            await callSendAPI(sender_psid, response2);
            resolve('Done');
        } catch (e) {
            reject(e);
        }
    })
}
let GetStartedTemplate = () =>{
    let response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Welcome to LOGHORIZON Restaurant",
                        "subtitle": "This is the list of our restaurant's specialty",
                        "image_url": IMG_GET_STARTED,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "MAIN MENU",
                                "payload": "MAIN_MENU",
                            },
                            {
                                "type": "postback",
                                "title": "MAKE A RESERVATION!",
                                "payload": "RESERVE_TABLE",
                            },
                            {
                                "type": "postback",
                                "title": "USER GUIDE CHATBOT",
                                "payload": "GUIDE_TO_USE",
                            }
                        ],
                    }]
                }
            }
        }
    return response;
}
let handleSendMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response2 = GetMainMenuTemplate();

            await callSendAPI(sender_psid, response2);
            resolve('Done');
        } catch (e) {
            reject(e);
        }
    })
}
let GetMainMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                    "title": "Our Restaurent Menus",
                    "subtitle": "We are pleased to offer you a wide-range of menu for lunch and dinner",
                    "image_url": IMG_MAIN_MENU,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "LUNCH",
                            "payload": "LUNCH_MENU",
                        },
                        {
                            "type": "postback",
                            "title": "DINNER",
                            "payload": "DINNER_MENU",
                        },
                    ],
                },
                    {
                        "title": "Hours",
                        "subtitle": "MON-FRI 10AM-11PM | SAT 5PM - 10PM | SUM 5PM - 9PM",
                        "image_url": IMG_HOURS,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "MAKE A RESERVATION!",
                                "payload": "RESERVE_TABLE",
                            },
                        ],
                    },
                    {
                        "title": "Bandqut Restaurant",
                        "subtitle": "Restaurant accomodates up to 300 seated guests and similar at cooktail reception",
                        "image_url": IMG_SHOW_ROOMS,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "SHOW ROOMS",
                                "payload": "SHOW_ROOMS",
                            },
                        ],
                    }
            ]
            }
        }
    }
    return response;
}
module.exports = {
    handleGetStarted: handleGetStarted,
    callSendAPI: callSendAPI,
    handleSendMainMenu: handleSendMainMenu
}