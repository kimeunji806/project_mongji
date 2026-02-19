const addBtn = document.querySelector("#addbtn");
const productList = document.querySelector("#productList");
const logoutIcon = document.querySelector("#logoutIcon");

// 페이지 로드시 기존 상품 가져오기
window.addEventListener("DOMContentLoaded", () => {
  fetch("http://192.168.0.34:3000/shop_list")
    .then((resp) => resp.json())
    .then((data) => {
      if (!Array.isArray(data)) {
        return;
      }
      data.forEach((item) => {
        const row = makeRow(item);
        productList.appendChild(row);
      });
    });
});

// 페이지 로드시 카테고리 불러오기
window.addEventListener("DOMContentLoaded", () => {
  fetch("http://192.168.0.34:3000/shop_category")
    .then((resp) => resp.json())
    .then((data) => {
      const select = document.querySelector("#add-category");
      data.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.CATEGORY_NAME;
        option.textContent = cat.CATEGORY_NAME;
        select.appendChild(option);
      });
    })
    .catch((err) => console.log(err));
});

//상품 등록
addBtn.addEventListener("click", () => {
  const name = document.querySelector("#add-name").value.trim();
  const price = document.querySelector("#add-price").value.trim();
  const description = document.querySelector("#add-description").value.trim();
  const category = document.querySelector("#add-category").value;

  if (!name || !price || !category) {
    alert("상품명, 가격, 카테고리 입력은 필수입니다.");
    return;
  }

  fetch("http://192.168.0.34:3000/shop_add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      price: price,
      description: description,
      category: category,
    }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.retCode === "OK") {
        alert("상품 등록 완료");

        //테이블에 row 추가
        const newRow = makeRow(data);
        productList.appendChild(newRow);

        //입력창 초기화
        document.querySelector("#add-name").value = "";
        document.querySelector("#add-price").value = "";
        document.querySelector("#add-description").value = "";
        document.querySelector("#add-category").value = "";
      } else {
        alert("상품 등록 실패");
      }
    })
    .catch((err) => {
      console.log(err);
      alert("서버 오류");
    });
});

// 삭제 버튼
function makeRow(data) {
  const tr = document.createElement("tr");

  //서버 키 직접 참조해서 컬럼 생성
  const tdName = document.createElement("td");
  tdName.innerText = data.SHOP_NAME || "";
  tr.appendChild(tdName);

  const tdPrice = document.createElement("td");
  tdPrice.innerText = data.SHOP_PRICE || "";
  tr.appendChild(tdPrice);

  const tdDescription = document.createElement("td");
  tdDescription.innerText = data.SHOP_DESCRIPTION || "";
  tr.appendChild(tdDescription);

  const tdCategory = document.createElement("td");
  tdCategory.innerText = data.SHOP_CATEGORY || "";
  tr.appendChild(tdCategory);

  //삭제 버튼 컬럼
  const td = document.createElement("td");
  const btn = document.createElement("button");
  btn.innerText = "삭제";
  btn.addEventListener("click", () => {
    const name = data.SHOP_NAME;
    if (!name) {
      alert("상품명을 찾을 수 없습니다.");
      return;
    }
    fetch(`http://192.168.0.34:3000/shop_delete/${encodeURIComponent(name)}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result.retCode === "OK") tr.remove();
        else alert("삭제 실패");
      });
  });
  td.appendChild(btn);
  tr.appendChild(td);

  return tr;
}

// 로그아웃
logoutIcon.addEventListener("click", function () {
  localStorage.removeItem("loginUser");
  alert("로그아웃 되었습니다");
  window.location.href = "login.html";
});
