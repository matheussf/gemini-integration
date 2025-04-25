const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.get("/", (req, res) => {
    if (!req.session.conversation) {
        req.session.conversation = [{ role: "user", content: ":)" }]; 
    }
    res.render("index", { conversation: req.session.conversation });
});

app.post("/", async (req, res) => {
    const userInput = req.body.user_input;
    if (userInput) {
      req.session.conversation.push({ role: "user", content: userInput });

      try {
        const conversationForApi = req.session.conversation.filter(item => item.role !== "system");
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: conversationForApi.map(item => ({
                    role: item.role,
                    parts: [{ text: item.content }]
                })),
                generationConfig: {
                    temperature: 0.9,
                    topK: 1,
                    topP: 1,
                    maxOutputTokens: 2048,
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const assistantReply = response.data.candidates[0].content.parts[0].text;
        req.session.conversation.push({ role: "assistant", content: assistantReply });
      } catch (error) {
        console.error("Error calling Gemini API:", error.response ? error.response.data : error.message);
        req.session.conversation.push({
            role: "assistant",
            content: "Sorry, there was an error processing your request with Gemini."
        });
      }
    }
    res.redirect("/");
});

app.get("/reset", (req, res) => {
    req.session.conversation = [{ role: "user", content: ":)" }];
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});