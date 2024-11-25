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
        // generationConfig: { responseMimeType: "application/json" }
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
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

    function convertToHTML(text) {
        let header = null;

        // Extract the first line and set it as the header
        const lines = text.split('\n');
        if (lines.length > 0 && lines[0].includes("##")) {
            header = lines[0].replace(/^##\s*/, ''); // Remove '## ' from the first line
            lines[0] = ''; // Clear the first line after extracting the header
        }

        // Convert the remaining lines into HTML
        let body = lines.join('\n');

        // Remove asterisks and add a new line after them
        body = body.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        body = body.replace(/\*/g, '');

        // Replace paragraph breaks (double new lines) with <p> tags
        body = body.replace(/\n\n/g, '</p><br/><p>');
        body = body.replace(/\n/g, '<br/>'); // Replace single new lines with <br>
        // Wrap the content with <p> tags and add the header

        // console.log(text);
        // console.log(body);
        return {
            header: header,
            content: body,
        };
    }

    const { header, content } = convertToHTML(response);
    // console.log(header);
    // console.log(content);

    return { header, content }
};

export default getResponse;
