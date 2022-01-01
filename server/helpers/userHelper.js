const db = require('../config/connection')

var collections = require('../config/constants')
const bcrypt = require('bcryptjs')
const { ObjectId } = require('mongodb')

module.exports = {
    // register user
    registerUser: (userData) =>{
        return new Promise(async (resolve, reject)=>{
            
            let userExist = await db.get().collection(collections.USER_COLLECTION).findOne(
                {
                     $or: [
                         { email: userData.email },
                         { phone: userData.email }
                     ] 
                }
            )

            if(userExist){
                resolve({userExist: true})
            }
            else {
                userData.password = await bcrypt.hash(userData.password, 10)
                userData.date = new Date()
                db.get().collection(collections.USER_COLLECTION).insertOne({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    phone: userData.phone,
                    password: userData.password,
                    createdAt: userData.date
                })
                .then((res)=>{
                    resolve({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        phone: userData.phone

                    })
                })
            }
        })
    },

    // Login user
    loginUser: (userData)=>{
        return new Promise(async (resolve, reject)=>{
            let loginStatus = false;
            let response = {};
            let user = await db
              .get()
              .collection(collections.USER_COLLECTION)
              .findOne(
                {
                    $or: [
                        { email: userData.email },
                        { phone: userData.email }
                    ] 
               }
              );
            if (user) {
              bcrypt.compare(userData.password, user.password).then((status) => {
                if (status) {
                  response.user = user;
                  resolve(response);
                } else {
                  console.log("Login failed");
                  resolve({ loginFailed: true });
                }
              });
            } else {
              console.log("User not found");
              resolve({ notFound: true });
            }
        })
    },

    // apply form
    applyForm: (formData) =>{
        return new Promise(async (resolve, reject)=>{

            formData.status = 'Pending'
            
            let userExist = await db.get().collection(collections.USER_COLLECTION).findOne({ _id: ObjectId(formData.userId)})

            if(!userExist){
                resolve({userNotExist: true})
            }
            else {
                
                formData.date = new Date()
                db.get().collection(collections.APPLICATIONS_COLLECTION).insertOne({
                    userId: ObjectId(formData.userId),
                    name: formData.name,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    email: formData.email,
                    phone: formData.phone,
                    companyName: formData.companyName,
                    teamAndBackground: formData.teamAndBackground,
                    aboutProducts: formData.aboutProducts,
                    problemToSolve: formData.problemToSolve,
                    uniqueSolution: formData.uniqueSolution,
                    valuePropositionOfCustomer: formData.valuePropositionOfCustomer,
                    competitors: formData.competitors,
                    revenueModel: formData.revenueModel,
                    marketSize: formData.marketSize,
                    marketPlan: formData.marketPlan,
                    incubationType: formData.incubationType,
                    applyDate: formData.date,
                    status: formData.status,
                })
                .then((res)=>{
                    resolve({
                        userId: ObjectId(formData._id),
                        name: formData.name,
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        email: formData.email,
                        phone: formData.phone,
                        companyName: formData.companyName,
                        teamAndBackground: formData.teamAndBackground,
                        aboutProducts: formData.aboutProducts,
                        problemToSolve: formData.problemToSolve,
                        uniqueSolution: formData.uniqueSolution,
                        valuePropositionOfCustomer: formData.valuePropositionOfCustomer,
                        competitors: formData.competitors,
                        revenueModel: formData.revenueModel,
                        marketSize: formData.marketSize,
                        marketPlan: formData.marketPlan,
                        incubationType: formData.incubationType,
                        applyDate: formData.date,
                        status: formData.status,

                    })
                })
            }
        })
    },

    // application details
    applicationDetails: (userId) =>{
        return new Promise(async (resolve, reject)=>{
            
            let userExist = await db.get().collection(collections.APPLICATIONS_COLLECTION).findOne({ userId: ObjectId(userId.userId)})
            if(!userExist){
                resolve({userNotExist: true})
            }
            else {
                resolve(userExist)
            }
        })
    },

    adminLogin: (adminData)=>{
        return new Promise(async (resolve, reject)=>{
            let loginStatus = false;
            let response = {};
            let admin = await db
              .get()
              .collection(collections.ADMIN_COLLECTION)
              .findOne(
                {
                    $or: [
                        { email: adminData.email },
                        { phone: adminData.email }
                    ] 
               }
              );
            if (admin) {
              bcrypt.compare(adminData.password, admin.password).then((status) => {
                if (status) {
                  response.admin = admin;
                  resolve(response);
                } else {
                  console.log("Login failed");
                  resolve({ loginFailed: true });
                }
              });
            } else {
              console.log("Admin not found");
              resolve({ notFound: true });
            }
        })
    },

     // all application details
     allApplication: () =>{
        return new Promise(async (resolve, reject)=>{
            
            let allData = await db.get().collection(collections.APPLICATIONS_COLLECTION).find().toArray()
            if(!allData){
                resolve({noData: true})
            }
            else {
                resolve(allData)
            }
        })
    },

    // change status
    changeStatus: (data) =>{
        return new Promise(async (resolve, reject)=>{
            
            let userExist = await db.get().collection(collections.APPLICATIONS_COLLECTION).findOne({ userId: ObjectId(data.userId)})
            if(!userExist){
                resolve({userNotExist: true})
            }
            else {
                if(data.status === 'Processing'){
                    await db.get().collection(collections.APPLICATIONS_COLLECTION).updateOne({ userId: ObjectId(data.userId)},{
                        $set: {
                            status: 'Processing'
                        }
                    })
                    resolve(userExist)
                }
                else if(data.status === 'Rejected'){
                    await db.get().collection(collections.APPLICATIONS_COLLECTION).updateOne({ userId: ObjectId(data.userId)},{
                        $set: {
                            status: 'Rejected'
                        }
                    })
                    resolve(userExist)
                }
                else if(data.status === 'Approved'){
                    await db.get().collection(collections.APPLICATIONS_COLLECTION).updateOne({ userId: ObjectId(data.userId)},{
                        $set: {
                            status: 'Approved'
                        }
                    })
                    resolve(userExist)
                }
                else if(data.slot && data.status === 'Booked'){
                    data.slot = parseInt(data.slot)
                    await db.get().collection(collections.APPLICATIONS_COLLECTION).updateOne({ userId: ObjectId(data.userId)},{
                        $set: {
                            slot: data.slot,
                            status: 'Booked'

                        }
                    })
                    resolve(userExist)
                }
            }
        })
    },
} 


