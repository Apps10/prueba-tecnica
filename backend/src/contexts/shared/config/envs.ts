import 'dotenv'
import * as Joi from 'joi'

interface Envs {
  DATABASE_URL: string,
  JWT_SECRET: string,
  UAT_SANDBOX_URL: string,
  UAT_SANDBOX_PUBLIC_KEY: string,
  UAT_SANDBOX_PRIVATE_KEY: string
  UAT_SANDBOX_INTEGRITY_KEY: string
  URL_CORS: string[]
}

const schema = Joi.object({ 
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  UAT_SANDBOX_URL: Joi.string().required(),
  UAT_SANDBOX_PUBLIC_KEY: Joi.string().required(),
  UAT_SANDBOX_PRIVATE_KEY: Joi.string().required(),
  UAT_SANDBOX_INTEGRITY_KEY: Joi.string().required(),
  URL_CORS: Joi.array().items(Joi.string()).required()
}).unknown(true)

const { error, value } = schema.validate({
  ...process.env,
  URL_CORS: process.env.URL_CORS.split(',')
})

if (error) {
  throw new Error(error.message)
}

const envs: Envs = value

export default {
  DATABASE_URL: envs.DATABASE_URL,
  JWT_SECRET: envs.JWT_SECRET,
  UAT_SANDBOX_URL: envs.UAT_SANDBOX_URL,
  UAT_SANDBOX_PUBLIC_KEY: envs.UAT_SANDBOX_PUBLIC_KEY,
  UAT_SANDBOX_PRIVATE_KEY: envs.UAT_SANDBOX_PRIVATE_KEY,
  UAT_SANDBOX_INTEGRITY_KEY: envs.UAT_SANDBOX_INTEGRITY_KEY,
  URL_CORS: envs.URL_CORS
}