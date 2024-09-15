// list.js에서 저장된 전역변수들을 localStorage로 저장했다가 가져오기
document.addEventListener("DOMContentLoaded", function () {
    let clickedkinderCode = localStorage.getItem('clickedkinderCode');
    let clickedKinderName = localStorage.getItem('clickedKinderName');

    if (clickedkinderCode, clickedKinderName) {
        searchDetail(clickedkinderCode, clickedKinderName);
    } else {
        console.error("No Name found in localStorage.");
    }
});

function searchDetail(clickedkinderCode, clickedKinderName) {
    fetch("./json/kinderGeneral.json")
        .then((response) => response.json())
        .then((data) => {

            // filter: data.DATA 속 kindername이 특정 명칭(clickedKinderName)과 일치하는지 여부를 판단하고 일치하는 것을 배열로 반환
            // .trim().toLowerCase()를 쓰면 띄어쓰기나 대소문자로 인한 불일치를 해소
            let kinderInfos = data.DATA.filter((item) =>
                item.kindername.trim().toLowerCase() === clickedKinderName.trim().toLowerCase()
            );
            // kinderInfos는 복수의 데이터가 들어올 수 있으므로 clickedkinderCode를 통해 클릭한 리스트의 데이터와 일치하는 데이터만 찾아냄
            let kinderInfoPick = kinderInfos.filter((item) =>
                item.kindercode === clickedkinderCode
            )

            let kinderImg = kinderInfoPick[0].addr.match(/(\S+구)/); //주소 중 '구'로 끝나는 단어 찾기

            const detailTitle = `
            <h1>${clickedKinderName} 정보</h1>
        `

            const detailBasic = `
        <div class="detail-basicGrp">
            <div class="detail-basic">
                <div class="kinder-title">
                    <div class="kinder-tag">
                        ${kinderInfoPick[0].establish}
                    </div>
                    <div class="kinder-name">
                        ${kinderInfoPick[0].kindername}
                    </div>
                </div>
                <div class="detail-basicInfo">
                    <div class="key-value">
                        <div class="key">
                            전화번호
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].telno}
                        </div>
                    </div>
                    <div class="key-value">
                        <div class="key">
                            운영시간
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].opertime}
                        </div>
                    </div>
                    <div class="key-value">
                        <div class="key">
                            주소
                        </div>
                        <div class="value">
                            ${kinderInfoPick[0].addr}
                        </div>
                    </div>
                </div>
            </div>
            <img class="states-icon-L" src="/data/statesIcon/${kinderImg[0]}.svg" alt="">
        </div>
        <div class="detail-subInfo">
            <div class="key-value">
                <div class="key">
                    설립일
                </div>
                <div class="value">
                    ${kinderInfoPick[0].edate}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    개원일
                </div>
                <div class="value">
                    ${kinderInfoPick[0].odate}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    대표자명
                </div>
                <div class="value">
                    ${kinderInfoPick[0].rppnname}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    원장명
                </div>
                <div class="value">
                    ${kinderInfoPick[0].ldgrname}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    교육청명
                </div>
                <div class="value">
                    ${kinderInfoPick[0].officeedu}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    교육지원청명
                </div>
                <div class="value">
                    ${kinderInfoPick[0].subofficeedu}
                </div>
            </div>
            <div class="key-value">
                <div class="key">
                    홈페이지
                </div>
                <div class="value">
                    ${kinderInfoPick[0].hpaddr}
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
                <canvas id="class-chart" width="100%" height="100%"></canvas>
            </div>

            <div class="data-totalContainer">
                <div class="data-totalKey">
                    총 학급
                </div>
                <div class="data-totalValue">
                    ${Number(kinderInfoPick[0].clcnt3) + Number(kinderInfoPick[0].clcnt4)
                + Number(kinderInfoPick[0].clcnt5) + Number(kinderInfoPick[0].mixclcnt)
                + Number(kinderInfoPick[0].shclcnt)
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
                <canvas id="kidnum-chart" width="100%" height="100%"></canvas>
            </div>

            <div class="data-totalContainer">
                <div class="data-totalKey">
                    총 유아수
                </div>
                <div class="data-totalValue">
                    ${Number(kinderInfoPick[0].ppcnt3) + Number(kinderInfoPick[0].ppcnt4)
                + Number(kinderInfoPick[0].ppcnt5) + Number(kinderInfoPick[0].mixppcnt)
                + Number(kinderInfoPick[0].shppcnt)
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


            new Chart(document.getElementById('class-chart'), {
                type: 'doughnut',
                data: {
                    labels: [
                        `만 3세 반 ${kinderInfoPick[0].clcnt3 !== null ? kinderInfoPick[0].clcnt3 : '-'}`,
                        `만 4세 반 ${kinderInfoPick[0].clcnt4 !== null ? kinderInfoPick[0].clcnt4 : '-'}`,
                        `만 5세 반 ${kinderInfoPick[0].clcnt5 !== null ? kinderInfoPick[0].clcnt5 : '-'}`,
                        `혼합반 ${kinderInfoPick[0].mixclcnt !== null ? kinderInfoPick[0].mixclcnt : '-'}`,
                        `특수학급 ${kinderInfoPick[0].shclcnt !== null ? kinderInfoPick[0].shclcnt : '-'}`
                    ], // y축 값
                    datasets: [
                        {
                            data: [
                                kinderInfoPick[0].clcnt3 !== null ? kinderInfoPick[0].clcnt3 : '0',
                                kinderInfoPick[0].clcnt4 !== null ? kinderInfoPick[0].clcnt4 : '0',
                                kinderInfoPick[0].clcnt5 !== null ? kinderInfoPick[0].clcnt5 : '0',
                                kinderInfoPick[0].mixclcnt !== null ? kinderInfoPick[0].mixclcnt : '0',
                                kinderInfoPick[0].shclcnt !== null ? kinderInfoPick[0].shclcnt : '0'
                            ], // x축 값
                            
                            backgroundColor: [
                                '#00C7E2', // 만 3세 반 색상
                                '#FF5733', // 만 4세 반 색상
                                '#FFC300', // 만 5세 반 색상
                                '#DAF7A6', // 혼합반 색상
                                '#C70039'  // 특수학급 색상
                            ], // 그래프 각각의 색상 지정
            
                            borderWidth: 0 // 흰색 보더를 없애는 설정
                        }
                    ]
                },
                options: {
                    responsive: true,

                    plugins: {
                        legend: {
                            display: true,
                            position: 'left',
                            labels: {
                                font: {
                                    size: 14 // 범례텍스트 사이즈
                                },
                                boxWidth: 10, // 범례크기
                                boxHeight: 10 // 범례크기
                            },
                        }
                    },

                    scales: { // x축과 y축에 대한 설정
                        x: {
                            grid: { // 축에 대한 격자선
                                display: false, // grid 활성화 (기본값 true)
                            },
                            ticks: {
                                display: false // x축 데이터
                            },
                            border: {
                                display: false // x축의 축선 숨김
                            }
                        },
                        y: {
                            grid: { // 축에 대한 격자선
                                display: false, // grid 활성화 (기본값 true)
                            },
                            ticks: {
                                display: false, // y축 눈금 텍스트 표시
                            },
                            border: {
                                display: false // y축의 축선 숨김
                            }
                        }
                    }
                }
            });

            new Chart(document.getElementById('kidnum-chart'), {
                type: 'bar',
                data: {
                    labels: [
                        `만 3세 반 ${kinderInfoPick[0].ppcnt3 !== null ? kinderInfoPick[0].ppcnt3 : '-'}`,
                        `만 4세 반 ${kinderInfoPick[0].ppcnt4 !== null ? kinderInfoPick[0].ppcnt4 : '-'}`,
                        `만 5세 반 ${kinderInfoPick[0].ppcnt5 !== null ? kinderInfoPick[0].ppcnt5 : '-'}`,
                        `혼합반 ${kinderInfoPick[0].mixppcnt !== null ? kinderInfoPick[0].mixppcnt : '-'}`,
                        `특수학급 ${kinderInfoPick[0].shppcnt !== null ? kinderInfoPick[0].shppcnt : '-'}`
                    ], // y축 값
                    datasets: [
                        {
                            data: [
                                kinderInfoPick[0].ppcnt3 !== null ? kinderInfoPick[0].ppcnt3 : '0',
                                kinderInfoPick[0].ppcnt4 !== null ? kinderInfoPick[0].ppcnt4 : '0',
                                kinderInfoPick[0].ppcnt5 !== null ? kinderInfoPick[0].ppcnt5 : '0',
                                kinderInfoPick[0].mixppcnt !== null ? kinderInfoPick[0].mixppcnt : '0',
                                kinderInfoPick[0].shppcnt !== null ? kinderInfoPick[0].shppcnt : '0'
                            ], // x축 값

                            backgroundColor: [
                                '#00C7E2', // 만 3세 반 색상
                                '#FF5733', // 만 4세 반 색상
                                '#FFC300', // 만 5세 반 색상
                                '#DAF7A6', // 혼합반 색상
                                '#C70039'  // 특수학급 색상
                            ], // 그래프 각각의 색상 지정
            
                            maxBarThickness: 20 // 그래프 최대 두께

                        }
                    ]
                },
                options: {
                    indexAxis: 'y',

                    responsive: true,

                    plugins: {
                        legend: {
                            display: false // 범례 표시 여부 (false로 설정하여 범례 숨김)
                        }

                    },

                    scales: { // x축과 y축에 대한 설정
                        x: {
                            grid: { // 축에 대한 격자선
                                display: false, // grid 활성화 (기본값 true)
                            },
                            ticks: {
                                display: false // x축 데이터
                            },
                            border: {
                                display: false // x축의 축선 숨김
                            }
                        },
                        y: {
                            grid: { // 축에 대한 격자선
                                display: false, // grid 활성화 (기본값 true)
                            },
                            ticks: {
                                display: true, // y축 눈금 텍스트 표시
                                color: '#FF5733',
                                font: {
                                    size: 16,
                                    family: 'pretendard',
                                    weight: '400'
                                }
                            },
                            border: {
                                display: false // y축의 축선 숨김
                            }
                        }
                    }
                }
            });
        });
};

