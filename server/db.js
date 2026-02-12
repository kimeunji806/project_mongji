const oracledb = require("oracledb");

// 결과물 -> 객체.
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getConnection() {
  return await oracledb.getConnection({
    user: "scott",
    password: "tiger",
    connectString: "192.168.0.34:1521/xe",
  }); // 세션 가지고 오는 함수.
}
module.exports = { getConnection, oracledb };
