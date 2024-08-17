import { conf } from "../conf/conf";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"

const getResponse = async (request) => {
    const apiKey = conf.geminiApiKey;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
        ],
    });

    const result = await chatSession.sendMessage(request);
    const response = result.response.text()

    let newResp3;
    const check = response.includes("**")

    if (check) {
        let respArray = response.split('**')
        // console.log(respArray);
        let newResp = "";

        for (let i = 0; i < respArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                if (i !== 0) {
                    newResp += respArray[i];
                }
            } else {
                newResp += "<b>" + respArray[i] + "</b> <br/>";
            }
        }

        let newResp2 = newResp.split("*").join("<br/>")
        newResp3 = newResp2.split("undefined<br/>").join(" ")

    } else {
        newResp3 = response;

    }

    return newResp3
};

export default getResponse;
