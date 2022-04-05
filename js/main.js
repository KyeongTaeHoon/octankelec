/*conatiner*/

const container = document.querySelector(".container");

/*popup*/

const popup = document.querySelector(".popup");

/*closeBtn*/

const closeBtn = document.querySelector("#closebtn");

/*팝업 닫기 함수*/

const closePopup = () => {

console.log("test2")

/*hide 클래스 추가로 숨김*/

popup.classList.add("hide");

  //location.reload();

};

/*popup 열기*/

const openPopup = async (userid, itemid, eventtype) => {
const result = await fetch(
        "https://random-data-api.com/api/nation/random_nation?size=30"
      );
popup.classList.remove("hide");

const popBody = document.querySelector(".popup-body");

popBody.innerHTML = `<p>${capital}</p><p>${language}</p><p>${nationality}</p>`;

};

/*팝업 닫기 버튼 클릭 시 클로즈 함수 호출*/

closeBtn.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closePopup();
    location.reload();
  }

});

const view1 = document.querySelector("#view1");

view1.addEventListener('click', (event) => {
  const id = event.target.getAttribute("class");

  const userid = event?.target?.dataset?.userid;
console.log(userid)
  const itemid = event?.target?.dataset?.itemid;

const eventtype = event?.target?.dataset?.eventtype;

openPopup(userid, itemid, eventtype);


/*popup 열기*/

});
/*page 이동(노드서버로 호출)*/
const movePage = (userid, itemid, eventtype) => {
    location.href = `/user-inter/100/3700/watch`;
  };