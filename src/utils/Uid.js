export function uid() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


export const formatDate = (date) => {
  var day = date.getDate();
  var year = date.getFullYear();
  var month = date.toLocaleString('default', { month: 'long' })
  var strTime = month + ' ' + day + ", " + year;
  return strTime;
};