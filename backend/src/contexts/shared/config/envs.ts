import Joi from 'joi'
import joi from 'joi'

interface Envs {
  DATABASE_URL: string
}

const schema = joi.object({ 
  DATABASE_URL: Joi.string().required(),
}).unknown(true)

const { error, value } = schema.validate(process.env)

if(error) {
  throw new Error(error.message)
}

const envs: Envs = value

export default envs