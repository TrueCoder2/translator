
const express = require('express')
const app = express();
const cors = require('cors')
app.use(cors());
 
app.get('/' , (req,res) => {
    res.send("welcome to server")
})

app.get('/trans', async (req, res) => {
    try {
        const { text, source, target } = req.query;
        const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${source}|${target}`;
        const response = await fetch(url);
        const json = await response.json();
        const matches = await json.matches;
        const translatedText = matches[matches.length - 1].translation || 'No translation found';
        console.log(translatedText)
        res.send(translatedText);
    } catch (error) {
        console.log(error);
        res.send('Something went wrong!');
    }
});
 
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});