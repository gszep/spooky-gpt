// express server configuration
const express = require('express')
const cors = require("cors")
const app = express()

// Allow cross-origin requests (CORS)
app.use(cors());

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// OpenAI API configuration
const OpenAI = require('openai')
const dotenv = require('dotenv').config()
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// main prompt function
app.post('/prompt', (request, respose) => {
    console.log("[Prompt] Received prompt for story")

    // prompt for the GPT-3 engine
    openai.chat.completions.create({
        messages: [{ role: "user", content: request.body.prompt }],
        model: "gpt-3.5-turbo",
        max_tokens: 200,
        n: 1,

        // response from the GPT-3 engine
    }).then((reply) => {
        console.log("[GPT] Responded with story")
        return respose.status(200).json({
            reply: reply.choices[0].message.content,
        })

        // error handling
    }).catch((error) => {
        return respose.status(500).json({
            error: error,
        })
    })
})

app.options("/prompt", (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.setHeader("Access-Control-Allow-Methods", "*");
    response.sendStatus(200);
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
