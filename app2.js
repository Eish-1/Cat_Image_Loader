// ----------- cat facts --------------
let url = "https://catfact.ninja/fact"; 
// ----------- cat picss --------------
let url2 = "https://api.thecatapi.com/v1/images/search?limit=12";

async function catFacts(url){
    try{
        let response = await axios.get(url);
        return ('"'+response.data.fact+'"');
    }catch(err){
        console.log(err);
        return ("oops! caught an error");
    }
}

// catFacts(url);
let h3 = document.querySelector("h3");
let btn = document.querySelector(".btn");
let bigbox = document.querySelector("#bigbox");

let btn2 = document.querySelector(".btn2");
let selectBox = document.querySelector("select");
let subP = document.querySelector(".subP");

// Fixed: https://www.w3docs.com/snippets/javascript/how-to-get-the-value-of-selected-option-in-a-select-box.html#:~:text=You%20can%20either%20select%20text,value%20of%20selected%20attribute%20value.&text=let%20selectedValue%20%3D%20%24(%22%23selectVal,val()%3B
function showSelect(){
    let selectedValue = selectBox.value;
    return (selectedValue);
}

btn2.addEventListener("click",()=>{
    let sV = showSelect();
    // console.log(sV)
    url2 = "https://api.thecatapi.com/v1/images/search?limit=" + sV;
    // console.log(url2)
    // url2 = url2 + sV;
    subP.innerText = "Amount of Cat Stuff about to load : "+sV
})

btn.addEventListener("click",async()=>{
    bigbox.innerHTML = '';

    console.log("button was clicked.");

    let catData = await catFacts(url);
    h3.innerText = catData;

    await showCatApi(url2);
    
})

// Cat Images using Cat API
async function theCatApi(source){
    try{
        let head = {headers: {'x-api-key': "live_UT6RtIrzgZUGPO25KHn31CAvmfpstXLSVvdWaLBLx123RpKco3UEL03IDZVMTDQh" }}
        let response = await axios.get(source,head);
        let result = response.data;

        // let resData = result.filter(img=> img.image?.url!=null)

        return (result);
        // return resData;
    }catch(err){
        console.log(err);
        return ">Oh an error occured<";
    }
}

async function showCatApi(url2){
    let arr = await theCatApi(url2);

    for (ele of arr){
        let smallbox = document.createElement("div");
        let image = document.createElement("img");
        let anchor = document.createElement("a");

        smallbox.classList.add("smallbox");
        image.setAttribute("src",ele.url);
        anchor.setAttribute("href",ele.url);
        anchor.innerText = "Source";

        bigbox.appendChild(smallbox);
        smallbox.appendChild(image);
        smallbox.appendChild(anchor);

        console.log(ele.url);
    }
}