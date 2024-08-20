let guName = 
['강서구', '강남구', '강동구', '광진구']

guName.forEach((item)=>{
    console.log(item);
    const guBTN = `
        <button id="gu-btn" onClick="
            console.log(this.textContent)
        ">${item}</button>
    `;
    document.querySelector(".states-btn-container")
      .insertAdjacentHTML("beforeend", guBTN);
});





