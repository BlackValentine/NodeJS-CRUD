import db from '../models/index';
import CRUDservice from '../services/CRUDservice'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch(e) {
        console.log(e)
    }
    return res.render('homepage.ejs')
}

let getLavaPage = (req, res) => {
    return res.render('./test/about.ejs')
}

let getCRUD = (req, res) => {
    return res.render('CRUD.ejs')
}

let postCRUD = async(req, res) => {
    let message = await CRUDservice.createNewUser(req.body)
    console.log(message)
    return res.send('Bạn đã đăng ký thành công')
}

let displayGetCRUD = async(req, res) => {
    let data = await CRUDservice.getAllUser()
    return res.render('displayCRUD.ejs', {
        data: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId) {
        let userData = await CRUDservice.getUserById(userId)
        return res.render('editCRUD.ejs', {
            data: userData
        })
    } else {
        return res.send('User not found!')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDservice.updateUserData(data)
    return res.send('Updated')
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if(id) {
        await CRUDservice.deleteUserData(id)
        return res.send('Delete User Success')
    } else {
        return res.send('Fail to delete User')
    }
}

module.exports = {
    getHomePage,
    getLavaPage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD
}