let guName = 
['강서구', '강남구', '강동구', '광진구', '송파구']

// 구 버튼을 눌렀을 때 그 텍스트콘텐츠 정보를 clickedGuName이라는 전역변수에 저장하고 다른 페이지에서도 사용하기 위한 코드
let clickedGuName;
localStorage.setItem('clickedGuName', clickedGuName);

//검색한 키워드
let searchedKeyword = "";
localStorage.setItem('searchedKeyword', searchedKeyword);

//검색창에서 검색 했을 때 그 키워드를 포함하는 유치원명을 모두 배열로 저장
let searchedArray = [];

// 구 버튼을 생성하고 눌렀을 때 서치리스트 기능을 실행
guName.forEach((item) => {
  const guBTN = `
        <button id="gu-btn" onClick="
            clickedGuName = this.textContent;
            localStorage.setItem('clickedGuName', clickedGuName);
            location.href = 'list.html';
        ">${item}</button>
    `;
    document.querySelector(".states-btn-container")
    .insertAdjacentHTML("beforeend", guBTN);
});

//검색창 인풋값으로 검색해주는 버튼
document.querySelector(".search-btn")
    .addEventListener("click", function(){
        searchedKeyword = document.querySelector(".input").value;
        localStorage.setItem('searchedKeyword', searchedKeyword);
        directSearchList(searchedKeyword)
    })

//서치 버튼 클릭 시 작동되는 기능
function directSearchList(searchedKeyword){
    fetch("./json/kinderGeneral.json")
    .then((response) => response.json())
    .then((data) => {
        //searchedArray가 push되면서 배열이 계속 쌓이는 현상을 초기화 해줌
        searchedArray = [];

        //인풋에 입력한 searchedKeyword 포함한 모든 유치원명을 searchedArray라는 배열로 넣어줌
        for (let i = 0; i < data.DATA.length; i++) {
            if (data.DATA[i].kindername.includes(searchedKeyword)) {
                searchedArray.push(data.DATA[i].kindername);
            }
        }
        console.log(searchedArray)

        //searchedArray에 있는 유치원명들을 kindername으로 가지고 있는 데이터들을 배열로 가져옴
        let directKinderInfos = data.DATA.filter((item) =>
            searchedArray.includes(item.kindername.trim()) 
        );
        console.log(directKinderInfos)
    })
}

//미입력 검색 시 전목록 나오므로 예외처리필요
//검색결과 없을 때 메시지, 페이지 이동x