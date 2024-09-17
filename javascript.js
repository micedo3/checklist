let counter = 0
let divid = 0
let buttoncounter = 0

const mainbutton = document.getElementById("mainbutton")
const list = document.getElementById("mylist")
const textbox = document.getElementById("textbox")

mainbutton.addEventListener('click', ()=> {
    let div = document.createElement('div')
    let input = document.createElement("input")
    let label = document.createElement('label')
    let button = document.createElement('button')
    let icon = document.createElement('img')
    
    
    label.htmlFor = 'input' + ++counter
    label.className = 'app__list__item__text'
    label.innerText= textbox.value
    input.type='checkbox'
    input.id = 'input' + counter
    button.className ='app__list__item__icon'
    button.id = 'button' + ++buttoncounter
    icon.src = 'https://cdn-icons-png.flaticon.com/512/1483/1483063.png'
    icon.style.width = "100%";
    div.className = "app__list__item"
    div.id = 'button' + buttoncounter
    button.appendChild(icon)
    div.appendChild(input)
    div.appendChild(label)
    div.appendChild(button)
    
    
    document.getElementById("mylist").appendChild(div)
    button.addEventListener('click', ()=> {
        list.removeChild(document.getElementById(div.id))
    })

    input.addEventListener('change', ()=> {
        if (div.className == 'app__list__item'){
            div.className = 'app__list__item_done'
        }
        else{
            div.className ='app__list__item'
        }
    })
})