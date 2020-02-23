/**生成随机Id */
const get_Id = () => {
  let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  let Id = "";
  for (let i = 0; i < 16; i++) {
    Id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return Id;
};

let obj = {
  get_Id
};

export default obj;
