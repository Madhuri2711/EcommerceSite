import ErrorModel from '../models/website/errors'




class ErrorServices{
    get = async()=>{
        return await ErrorModel.find()
    }
}


export default ErrorServices