import { subscribe } from "diagnostics_channel"

const express = require('express')
const app = express()
const cors =  require('cors')

app.use(cors())

app.get('/', (req : any, res: any) => {
    res.json({name: "Code Bless You", subscribe: true})
})

app.listen(5000, () => console.log("Server is listening on 5000"))