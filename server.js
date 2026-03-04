const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // npm install node-fetch
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res)=>{
    const {message} = req.body;
    if(!message) return res.status(400).json({error:'No message'});

    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model:'gpt-3.5-turbo',
                messages:[{role:'user', content: message}],
                max_tokens:300
            })
        });
        const data = await response.json();
        const reply = data.choices[0].message.content;
        res.json({reply});
    } catch(e){
        res.status(500).json({error:'Error en OpenAI'});
    }
});

app.listen(PORT, ()=>console.log(`Servidor corriendo en http://localhost:${PORT}`));
