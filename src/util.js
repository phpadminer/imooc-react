// 工具类的函数


// 根据用户信息返回跳转地址
export function getRedirectPath({type,avatar}) {
  // 先判断type
  let path = (type === 'boss')?'/boss':'niuren'
  if(!avatar){
    path += 'info'
  }
  return path
}