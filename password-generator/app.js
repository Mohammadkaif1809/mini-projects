let p = document.querySelector('p');
let button = document.querySelector('button');
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}<>?";
let inp_box = document.querySelector('#input')
let copy = document.querySelector('.copy')
let eyeClose = document.querySelector('#eyeClose');
let eyeOpen = document.querySelector('#eyeOpen');
let copypopup = document.querySelector('#copyPopup')
let generatepopup = document.querySelector('#generatePopup')

button.addEventListener('click',()=>{
    let allChars = upper +lower+ numbers + symbols;
    const maxlen = 10;
    let password = "";
    password += upper[Math.floor(Math.random()* upper.length)];
    password += lower[Math.floor(Math.random()* lower.length)];
    password += numbers[Math.floor(Math.random()* numbers.length)];
    password += symbols[Math.floor(Math.random()* symbols.length)];
    for (let i= password.length ; i<maxlen ;i++){
        password += allChars[Math.floor(Math.random()*allChars.length)];
    }

    password = password.split("").sort(()=>Math.random()-0.5).join("")

    inp_box.value = password
    console.log(password);
    
})

eyeClose.addEventListener('click',()=>{
    inp_box.type = 'text'
    eyeClose.hidden = true
    eyeOpen.hidden = false
})

eyeOpen.addEventListener('click',()=>{
    inp_box.type = 'password'
    eyeOpen.hidden = true
    eyeClose.hidden = false
})

copy.addEventListener('click',()=>{
    if (inp_box.value.length===0){
    generatepopup.classList.add('show2')
        setTimeout(()=>{
            generatepopup.classList.remove('show2')
        },1200)
    }
    else if (inp_box.value.length>0){
        navigator.clipboard.writeText(inp_box.value)
        copypopup.classList.add('show1')
        setTimeout(()=>{
            copypopup.classList.remove('show1')
        },800)
    }
})

