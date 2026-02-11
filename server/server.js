const express = require("express");
const cors = require("cors");
const { getConnection } = require("./db");
const oracledb = require("oracledb");
const path = require("path"); // 파일 경로 안전하게 다루기 위한 node 내장 모듈

const app = express(); // 익스프레스 모듈을 활용 실체 기능.

// 셋업 추가. CORS
app.use(cors()); // CORS 허용
app.use(express.json()); // 요청 body에 들어온 json을 객체로 변환
// client 폴더를 정적파일(html, css, js) 제공 폴더로 지정
app.use(express.static(path.join(__dirname, "../client")));

// 루트 주소 접속 테스트용. 라우팅.
app.get("/", (req, res) => {
  res.send("OK");
});

// 상품 목록 조회 api. 테이블명: shop
app.get("/shop", async (req, res) => {
  const conn = await getConnection();
  const { rows } = await conn.execute(`select * from shop order by shop_no`);
  res.json(rows);
});

// 로그인 api. 테이블명: shop_login.
app.post("/shop_login", async (req, res) => {
  const { id, password } = req.body; // 클라이언트가 보낸 로그인 정보 가져오기
  const conn = await getConnection();
  const { rows } = await conn.execute(
    `
    SELECT SHOP_LOGIN_ID
    FROM SHOP_LOGIN
    WHERE SHOP_LOGIN_ID = :id
    AND SHOP_LOGIN_PW = :pw
    `,
    { id, pw: password },
    { outFormat: oracledb.OUT_FORMAT_OBJECT },
  );

  if (rows.length > 0) {
    res.json({
      success: true,
      msg: "로그인 성공",
      userId: rows[0].SHOP_LOGIN_ID.trim(),
    });
  } else {
    res.json({ success: false, msg: "아이디 혹은 비밀번호가 틀렸습니다." });
  }
});

// 상품 등록 api. 테이블명: shop_add
app.post("/shop_add", async (req, res) => {
  const { no, name, price, description, category } = req.body;
  const conn = await getConnection();
  const result = await conn.execute(
    `INSERT INTO shop_add(shop_add_name, shop_add_price, shop_add_description)
     VALUES(:name, :price, :description)`,
    { name, price: Number(price), description },
    { autoCommit: true }
  );

  if (result.rowsAffected) {
    res.json({
      retCode: "OK",
      shop_add_name: name,
      shop_add_price: price,
      shop_add_description: description,
    });
  } else {
    res.json({ retCode: "NG" });
  }
  await conn.close();
});

  // 기존 상품 전체 조회
app.get("/shop_list", async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `SELECT 
          shop_add_name as "name",
          shop_add_price as "price",
          shop_add_description as "description"
       FROM shop_add
       ORDER BY shop_add_name`,
      {},
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
    await conn.close();
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: err.message }); // JSON 반환
  }
});


  // 상품 삭제
app.delete("/shop_delete/:name", async (req, res) => {
  const { name } = req.params;
  const conn = await getConnection();
  const result = await conn.execute(
    `DELETE FROM shop_add WHERE shop_add_name = :name`,
    { name },
    { autoCommit: true }
  );

  if (result.rowsAffected) {
    res.json({ retCode: "OK" });
  } else {
    res.json({ retCode: "NG" });
  }
});


app.listen(3000, () => {
  console.log("http://localhost:3000");
}); // 서버 실행. (3000번 포트)
