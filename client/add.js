const addBtn = document.querySelector("#addbtn");
const productList = document.querySelector("#productList");

// 페이지 로드 시 기존 상품 가져오기
window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/shop_list")
    .then(resp => resp.json())
    .then(data => {
      data.forEach(item => {
        const row = makeRow(item);
        productList.appendChild(row);
      });
    })
    .catch(err => console.log(err));
});

addBtn.addEventListener("click", () => {
    const name = document.querySelector("#add-name").value.trim();
    const price = document.querySelector("#add-price").value.trim();
    const description = document.querySelector("#add-description").value.trim();

    if(!name || !price) {
        alert("상품명과 가격 입력은 필수입니다.");
        return;
    }

    fetch("http://localhost:3000/shop_add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
      name: name,
      price: Number(price),
      description: description,
    }),
})
.then((resp) => resp.json())
.then((data) => {
    if(data.retCode === "OK"){
        alert("상품 등록 완료");

        //테이블에 row 추가
        const newRow = makeRow(data);
        productList.appendChild(newRow);

        //입력창 초기화
        document.querySelector("#add-name").value = "";
        document.querySelector("#add-price").value = "";
        document.querySelector("#add-description").value = "";
    }else{
        alert("상품 등록 실패");
    }
})
.catch((err) => {
    console.log(err);
    alert("서버 오류");
});
});

function makeRow(data) {
  const tr = document.createElement("tr");

  ["name", "price", "description"].forEach(key => {
    const td = document.createElement("td");
    td.innerText = data[key] !== undefined ? data[key] : "";
    tr.appendChild(td);
  });

  const td = document.createElement("td");
  const btn = document.createElement("button");
  btn.innerText = "삭제";
  btn.addEventListener("click", () => {
    if (!data.name) {
      alert("상품명을 찾을 수 없습니다.");
      return;
    }
    fetch(`http://localhost:3000/shop_delete/${encodeURIComponent(data.name)}`, { method: "DELETE" })
    .then(resp => resp.json())
    .then(result => {
      if (result.retCode === "OK") tr.remove();
      else alert("삭제 실패");
      });
  });
  td.appendChild(btn);
  tr.appendChild(td);
  return tr;
}