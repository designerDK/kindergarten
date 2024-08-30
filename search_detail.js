// 필터 내용 중 어레이가 2개 이상인 경우 눌렀던 목록 중 주소에서 구 버튼 텍스트와 일치하는 것만 하나 찾아내야함
// 따라서 index.js에서 저장된 전역변수 clickedGuName를 localStorage로 저장했다가 가져오기

// list.js에서 저장된 전역변수 clickedKinderName을 localStorage로 저장했다가 가져오기
document.addEventListener("DOMContentLoaded", function () {
    let clickedIndex = localStorage.getItem('clickedIndex');
    let clickedKinderName = localStorage.getItem('clickedKinderName');

    if (clickedIndex, clickedKinderName) {
        searchDetail(clickedIndex, clickedKinderName);
    } else {
        console.error("No Name found in localStorage.");
    }
});
 
  function searchDetail(clickedIndex, clickedKinderName){
    fetch("./json/kinderGeneral.json")
    .then((response) => response.json())
    .then((data) => {

    // filter: data.DATA 속 kindername이 특정 명칭(clickedKinderName)과 일치하는지 여부를 판단하고 일치하는 것을 배열로 반환
    // .trim().toLowerCase()를 쓰면 띄어쓰기나 대소문자로 인한 불일치를 해소
        let kinderInfos = data.DATA.filter((item) =>
            item.kindername.trim().toLowerCase() === clickedKinderName.trim().toLowerCase()
        );
        console.log(clickedKinderName)
        console.log(clickedIndex)

        const detailTitle = `
            <h1>${clickedKinderName} 정보</h1>
        `

        const detailBasic = `
        <div class="detail-basicGrp">
            <div class="detail-basic">
                <div class="kinder-title">
                    <div class="kinder-tag">
                        ${kinderInfos[clickedIndex].establish}
                    </div>
                    <div class="kinder-name">
                        ${kinderInfos[clickedIndex].kindername}
                    </div>
                </div>
                <div class="detail-basicInfo">
                    <div class="key-value">
                        <div class="key">
                            전화번호
                        </div>
                        <div class="value">
                            ${kinderInfos[clickedIndex].telno}
                        </div>
                    </div>
                    <div class="key-value">
                        <div class="key">
                            운영시간
                        </div>
                        <div class="value">
                            ${kinderInfos[clickedIndex].opertime}
                        </div>
                    </div>
                </div>
            </div>
            <div class="detail-icon">아이콘</div>
        </div>
        <div class="detail-subInfo">
            <div class="key-value">
                <div class="key">
                    설립일
                </div>
                <div class="value">
                    ${kinderInfos[clickedIndex].edate}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    개원일
                </div>
                <div class="value">
                    ${kinderInfos[clickedIndex].odate}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    대표자명
                </div>
                <div class="value">
                    ${kinderInfos[clickedIndex].rppnname}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    원장명
                </div>
                <div class="value">
                    ${kinderInfos[clickedIndex].ldgrname}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    교육청명
                </div>
                <div class="value">
                    ${kinderInfos[clickedIndex].officeedu}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    교육지원청명
                </div>
                <div class="value">
                    ${kinderInfos[clickedIndex].subofficeedu}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    홈페이지
                </div>
                <div class="value">
                    ${kinderInfos[clickedIndex].hpaddr}
                </div>
            </div>
        </div>
        `

        const classNumData = `
        <div class="data-card">
            <div class="data-contents">
                <div class="data-title">
                    학급수
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            만 3세 반
                        </div>
                        <div class="value">
                            ${kinderInfos[clickedIndex].clcnt3}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            만 4세 반
                        </div>
                        <div class="value">
                            ${kinderInfos[clickedIndex].clcnt4}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            만 5세 반
                        </div>
                        <div class="value">
                            ${kinderInfos[clickedIndex].clcnt5}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            혼합반
                        </div>
                        <div class="value">
                            ${kinderInfos[clickedIndex].mixclcnt}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            특수학급
                        </div>
                        <div class="value">
                            ${kinderInfos[clickedIndex].shclcnt}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
            </div>

            <div class="data-totalContainer">
                <div class="data-totalKey">
                    총 학급
                </div>
                <div class="data-totalValue">
                    ${Number(kinderInfos[clickedIndex].clcnt3) + Number(kinderInfos[clickedIndex].clcnt4)
                    + Number(kinderInfos[clickedIndex].clcnt5) + Number(kinderInfos[clickedIndex].mixclcnt)
                    + Number(kinderInfos[clickedIndex].shclcnt)
                    }개
                </div>
            </div>
        </div>
        `
        const kidNumData = `
        <div class="data-card">
            <div class="data-contents">
                <div class="data-title">
                    유아수
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            만 3세 반
                        </div>
                        <div class="value">
                            ${kinderInfos[clickedIndex].ppcnt3}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            만 4세 반
                        </div>
                        <div class="value">
                            ${kinderInfos[clickedIndex].ppcnt4}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            만 5세 반
                        </div>
                        <div class="value">
                            ${kinderInfos[clickedIndex].ppcnt5}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            혼합반
                        </div>
                        <div class="value">
                            ${kinderInfos[clickedIndex].mixppcnt}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
                <div class="data-keyValue-barGraph">
                    <div class="key-value">
                        <div class="key">
                            특수학급
                        </div>
                        <div class="value">
                            ${kinderInfos[clickedIndex].shppcnt}
                        </div>
                    </div>
                    <div class="barGraph-container">
                        <div class="barGraph">그래프</div>
                    </div>
                </div>
            </div>

            <div class="data-totalContainer">
                <div class="data-totalKey">
                    총 유아수
                </div>
                <div class="data-totalValue">
                    ${Number(kinderInfos[clickedIndex].ppcnt3) + Number(kinderInfos[clickedIndex].ppcnt4)
                    + Number(kinderInfos[clickedIndex].ppcnt5) + Number(kinderInfos[clickedIndex].mixppcnt)
                    + Number(kinderInfos[clickedIndex].shppcnt)
                    }명
                </div>
            </div>
        </div>
        `
        document.querySelector(".detail-title")
            .insertAdjacentHTML("beforeend", detailTitle);
        document.querySelector(".detail-container")
            .insertAdjacentHTML("beforeend", detailBasic);

        document.querySelector(".data-container")
            .insertAdjacentHTML("beforeend", classNumData);

        document.querySelector(".data-container")
            .insertAdjacentHTML("beforeend", kidNumData);
    });
};

