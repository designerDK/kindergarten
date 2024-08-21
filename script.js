let guName = 
['강서구', '강남구', '강동구', '광진구']

let clickedGuName;


// 구 버튼을 생성하고 눌렀을 때 서치리스트 기능을 실행
guName.forEach((item)=>{
    console.log(item);
    const guBTN = `
        <button id="gu-btn" onClick="
            clickedGuName = this.textContent;
            console.log(clickedGuName);
            searchList();
        ">${item}</button>
    `;
    document.querySelector(".states-btn-container")
      .insertAdjacentHTML("beforeend", guBTN);
});

// 구 버튼 눌렀을 때 서치해서 목록을 생성해주는 기능
function searchList(){
  fetch("./json/kinderGeneral.json")
  .then((response) => response.json())
  .then((data) => {

    for(let i = 0; i < data.DATA.length; i++){
      if(data.DATA[i].addr.includes(clickedGuName)){
        console.log(data.DATA[i].addr)
        console.log(data.DATA[i].establish)
        // 리스트페이지로 이동
        // 리스트페이지의 항목에 넣어주기
      }else{}
    }

  });
}
