let userId = document.querySelector("#user-id");
let userPw = document.querySelector("#user-pw");
let loginForm = document.querySelector("#login");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  login();
});

function login() {
  let lgid = userId.value;
  let lgpw = userPw.value;

  fetch("http://localhost:3000/shop_login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: lgid, password: lgpw }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert(data.msg);
        if (data.userId && data.userId.trim().toLowerCase() === "admin") {
          window.location.href = "add.html"; //관리자 페이지
        } else {
          window.location.href = "main.html"; //사용자 페이지
        }
      } else {
        alert(data.msg);
      }
    });
}
