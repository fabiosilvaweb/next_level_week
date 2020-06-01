import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  response.json({ msg: "Olá Mundo!" })
})

app.listen(3333, () => console.log("✔ Server started!"))
