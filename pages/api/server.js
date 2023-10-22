// express server configuration
const express = require('express')
const app = express()

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

    // prompt for the GPT-3 engine
    openai.chat.completions.create({
        messages: [{ role: "user", content: request.body.prompt }],
        model: "gpt-3.5-turbo",
        max_tokens: 200,
        n: 1,

        // response from the GPT-3 engine
    }).then((reply) => {
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

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
