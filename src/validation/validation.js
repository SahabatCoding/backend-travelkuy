import { ResponseError } from "../error/response-error.js"

export const validate  = (schema , req)=>{
    const result = schema.validate(req ,{
        abortEalry : false
    })

    if(result.error){
        throw new ResponseError(400, result.error.message)
    }else{
        return result.value
    }
}