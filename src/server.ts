import express from 'express';
import "reflect-metadata";
import './database';
import logRequest from './middlewares/logRequests';
import { router } from './routes';



const app = express()
app.use(express.json())
app.use(router) // Middleware do roteador da aplicação
app.use(logRequest) // Middleware para log de requisições


const port = 3335 // Porta


// Rota descrição
app.get('/', (request, response) => {
  response.json({
    "type": "Node Application",
    "description": "API Note Promotion Score",
    "author": "<tonybsilvadev@gmail.com>"
  })
})

app.listen(port, () => console.log(`🚀 Server started on ${port}!`))