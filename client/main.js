const tbtn = document.querySelector("#tc");
const mbtn = document.querySelector("#mc");
const kbtn = document.querySelector("#kc");

const main = document.querySelector("#productList"); //상품 목록

let currentCategory = null;

const logoutIcon = document.querySelector("#logoutIcon");

function loadProducts() {
  fetch("http://localhost:3000/shop")
    .then((res) => res.json())
    .then((list) => {
      main.innerHTML = ""; // 기존 목록 초기화

      list.forEach((item) => {
        // 현재 필터가 없거나 일치하는 카테고리만 표시
        if (!currentCategory || item.SHOP_CATEGORY === currentCategory) {
          const card = makeProductCard(item); // 상품 카드 생성
          main.appendChild(card); // DOM에 추가
        }
      });
    })
    .catch((err) => {
      console.error("상품 목록 불러오기 실패", err);
    });
}

function makeProductCard(item) {
  const card = document.createElement("div");
  card.className = "product-card"; // 카드 스타일 클래스

  // 카드 안 HTML 표기
  card.innerHTML = `
    <img src="img/${item.SHOP_NAME}.jpg" alt="${item.SHOP_NAME}" />
    <p class="category">${item.SHOP_CATEGORY}</p>
    <p class="name">${item.SHOP_NAME}</p>
    <p class="shop_price">${item.SHOP_PRICE.toLocaleString()}원</p>
    <p>⭐️⭐️⭐️⭐️⭐️(${item.SHOP_REVIEW})</p>
  `;

  return card; // 카드 DOM 반환
}

tbtn.addEventListener("click", () => {
  currentCategory = "티셔츠"; // 필터 상태 설정
  loadProducts(); // 목록 갱신
});

mbtn.addEventListener("click", () => {
  currentCategory = "마스킹테이프";
  loadProducts();
});

kbtn.addEventListener("click", () => {
  currentCategory = "키링";
  loadProducts();
});

window.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});

// 로그아웃
logoutIcon.addEventListener("click", function () {
  localStorage.removeItem("loginUser");
  alert("로그아웃 되었습니다");
  window.location.href = "login.html";
});
