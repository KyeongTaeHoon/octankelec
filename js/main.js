/*conatiner*/
const container = document.querySelector(".container");
/*popup*/
const popup = document.querySelector(".popup");
/*closeBtn*/
const closeBtn = document.querySelector(".btn-x");
/*팝업 닫기 함수*/
const closePopup = () => {
  /*hide 클래스 추가로 숨김*/
  popup.classList.add("hide");
  location.reload();
};

console.log("test")
const view1 = document.querySelector("#view1");
view1.addEventListener('click', (event) => {
    const id = event.target.getAttribute("class");
    const capital = event?.target?.dataset?.capital;
    const language = event?.target?.dataset?.language;
    const nationality = event?.target?.dataset?.nationality;
    if (id === "view1") {
        openPopup(capital, language, nationality);
    };
/*popup 열기*/
const openPopup = (capital, language, nationality) => {
  popup.classList.remove("hide");
  const popBody = document.querySelector(".popup-body");
  popBody.innerHTML = `<p>${capital}</p><p>${language}</p><p>${nationality}</p>`;
};
location.reload();
});