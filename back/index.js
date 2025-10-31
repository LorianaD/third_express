const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

function check_data(datas) {
    if (typeof datas.username !== 'string' || datas.username.length < 3 || datas.password.length < 6 || !datas.mail.includes('@') || !Number.isInteger(datas.age) || datas.password !== datas.passwordConfirm) {
        throw new Error('❌ Données invalides !');
    }
    else {
        return true;
    }
}

// app.get('/check2', (req, res) => {
//     const { username, mail, age, password, passwordConfirm } = req.query;

//     const datas = { 
//         username, 
//         mail, 
//         age: Number(age), 
//         password, 
//         passwordConfirm 
//     };

//     try {
//         check_data(datas);
//         return res.status(200).json({ message: "✅ Données valides !" });
//     } catch (error) {
//         return res.status(400).json({ error: error.message });
//     }
// });

app.post('/check', (req, res) => {
    // const datas = {username: "", mail: "", age: Number(), password: "" };
    const { username, mail, age, password, passwordConfirm } = req.body;
    const datas = { username, mail,  age: Number(age), password, passwordConfirm };
    try {
        check_data(datas)
        return res.status(200).json({ message: "✅ Données valides !" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});