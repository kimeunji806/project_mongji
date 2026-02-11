fetch("http://localhost:3000/shop")
  .then((res) => res.json())
  .then((list) => {
    const main = document.querySelector("#productList");
    main.innerHTML = ""; // 기존 내용 비우기

    list.forEach((item) => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="img/${item.SHOP_NAME}.jpg" alt="${item.SHOP_NAME}" />
        <p class="category">${item.SHOP_CATEGORY}</p>
        <p class="name">${item.SHOP_NAME}</p>
        <p class="shop_price">
          ${item.SHOP_PRICE.toLocaleString()}원<br>
          <span>⭐️⭐️⭐️⭐️⭐️(${item.REVIEW})</span>
        </p>
      `;
      main.appendChild(card);
    });
  })

  .catch((err) => {
    console.error("상품 목록 불러오기 실패", err);
  });
