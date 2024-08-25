// list.js에서 저장된 전역변수 clickedKinderName을 localStorage로 저장했다가 가져오기
document.addEventListener("DOMContentLoaded", function() {
    let clickedKinderName = localStorage.getItem('clickedKinderName');
    
    if (clickedKinderName) {
      searchDetail(clickedKinderName);
    } else {
      console.error("No KinderName found in localStorage.");
    }
  });
 
  function searchDetail(clickedKinderName){
    fetch("./json/kinderGeneral.json")
    .then((response) => response.json())
    .then((data) => {

    // data.DATA 중 kindername으로 조회한 정보가 clickedKinderName과 일치하는지 필터링
    // .trim().toLowerCase()를 쓰면 띄어쓰기나 대소문자로 인한 불일치를 해소
        let kinderInfo = data.DATA.filter((item) =>
            item.kindername.trim().toLowerCase() === clickedKinderName.trim().toLowerCase()
        );
        console.log(kinderInfo);
    });
};
