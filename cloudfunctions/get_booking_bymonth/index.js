// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var db = cloud.database();
var _ = db.command;


// 云函数入口函数
exports.main = async (event, context) => {
  var condition = {
    date: _.gte(event.start).and(_.lte(event.end)),
    userInfo: event.userInfo
  }
  if(event.titles){
    condition.titles=event.titles
  }
try{
return await db.collection('booking').where(condition).get();
}catch(err){
  console.log('err云函数调用失败',err)
}
}