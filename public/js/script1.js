const male = document.querySelector('#man');
const gen1 = document.querySelector('#gen1');
const gen2 = document.querySelector('#gen2');
const maleContainer =document.querySelector('#male-container');
const femaleContainer =document.querySelector('#female-container');
const female =document.querySelector('#woman');
const main = document.querySelector('#main');
const btn =document.querySelector('#btn');
const gender = document.getElementsByName('gender');

function removeProfile(){
    if(gender[0].checked === true){
        femaleContainer.style.opacity = '0';
        gen1.innerHTML = '.M.';
    }else if(gender[1].checked === true){
        maleContainer.style.opacity ='0';
        gen2.innerHTML = '.F.';
    }else{
        alert('You must choose a gender');
    }
}

btn.addEventListener('click',removeProfile);