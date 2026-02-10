const oracledb = require("oracledb");
const express = require("express");
const cors = require("cors");
const app = express(); // 익스프레스 모듈을 활용 실체 기능.
app.use(express.static(__dirname));

// 셋업 추가. CORS
app.use(cors()); // CORS 요청 처리.
app.use(express.json()); //body 영역에 json 처리.

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

app.listen(3000, () => {
  console.log("http://localhost:3000");
}); // 서버 실행. (3000번 포트)
