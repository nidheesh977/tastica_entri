import express from 'express'
import { convertJsonToCsv } from '../../../controller/JsonToCsv.js'


const testRouter = express.Router()


testRouter.get('/products',convertJsonToCsv);

export default testRouter