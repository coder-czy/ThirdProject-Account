// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var db = cloud.database()
// cloud.init({
//   env: "cloud-tirp-89b834"
// })
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try{
    return await db.collection('date').get()
  }catch(err){
    console.log('云函数调用错误',err)
  }
}