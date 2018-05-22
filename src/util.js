// 工具
// 根据用户信息 返回跳转地址
export function getRedirectPath ({type, avatar}) {
  // user.type /boss /genius
  // user.acatar /bossinfo /geniusinfo
  let url = (type === 'boss') ? '/boss' : '/genius'
  if (!avatar) {
    // 如果没有头像在跳转后面加上info变为/bossinfo 或者 /geniusinfo
    url += 'info'
  }
  return url
}