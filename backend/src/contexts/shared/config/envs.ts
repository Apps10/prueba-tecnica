import 'dotenv'
import * as Joi from 'joi'

interface Envs {
  DATABASE_URL: string,
  JWT_SECRET: string
}

const schema = Joi.object({ 
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required()
}).unknown(true)

const { error, value } = schema.validate(process.env)

if (error) {
  throw new Error(error.message)
}

const envs: Envs = value

export default {
  DATABASE_URL: envs.DATABASE_URL,
  JWT_SECRET: envs.JWT_SECRET
}