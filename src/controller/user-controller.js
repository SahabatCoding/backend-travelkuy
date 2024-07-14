import userService from "../service/user-service.js"

const succses = (req, res, next)=>{
    try {
        res.status(200).json({
            data : 'succses'
        })
    } catch (error) {
        next(200)
    }
}


const register = async (req, res, next)=>{
    try {
        const result = await userService.register(req.body)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next)=>{
    try {
        const result = await userService.login(req.body)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next)=>{
    try {
        const username = req.user.username

        const result = await userService.get(username)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next)=>{
    try {
        const user = req.user.username
        const request = req.body
        request.username = user

        const result = await userService.update(request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
        
    }
}

const logout = async (req, res, next)=>{
    try {
        const result = await userService.logout(req.user.username)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }

}


export default{
    register,
    login,
    get,
    update,
    logout,
    succses
}