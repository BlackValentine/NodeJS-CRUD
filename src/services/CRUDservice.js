import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstname,
        lastName: data.lastname,
        address: data.address,
        gender: data.gender == 1 ? true : false,
        roleId: data.roleId,
        phoneNumber: data.phonenumber,
      });
      resolve()
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = async (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true
            })
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: id},
                raw: true
            })
            if(user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if(user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save()
                resolve()
            } else {
                resolve()
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUserData = (id) => {
  return new Promise(async(resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {id: id}
      })
      if(user) {
        await user.destroy()
        resolve()
      } else {
        resolve()
      }
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  createNewUser,
  getAllUser,
  getUserById,
  updateUserData,
  deleteUserData
};
