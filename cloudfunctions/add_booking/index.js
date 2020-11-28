// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event==>',event)

// 保存记账数据，关联用户UserInfo
try{
return await db.collection('booking').add({
  // data:需要添加的数据
  data:event
});
}catch(err){
console.log('err云函数错误',err)
}


}