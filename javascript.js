let counter = 0
let inputcounter = 0
let divid = 0
let buttoncounter = 0
let ipadress = "http://127.0.0.1:3000/tasks"
let data = [{
}]


async function get() {
    const res = await fetch(ipadress, {
        method: 'GET'
    }).then
    data = await res.json()
}
get()
console.log(data)


data.forEach((item) => {
    if (item.id > counter) {
        counter = item.id
    }
})
if (counter > 1) {
    counter++
}
const mainbutton = document.getElementById("mainbutton")
const list = document.getElementById("mylist")
const textbox = document.getElementById("textbox")

mainbutton.addEventListener('click', () => {
    const textvalue = textbox.value
    data.push({
        id: counter++,
        text: textvalue,
        isDone: false
    })
    sohranenie(data)
    render()
    textbox.value = ''
})


function createnew(objectdata) {
    let div = document.createElement('div')
    let input = document.createElement("input")
    let label = document.createElement('label')
    let button = document.createElement('button')
    let icon = document.createElement('img')


    label.htmlFor = 'input' + ++inputcounter
    label.className = 'app__list__item__text'

    label.innerText = objectdata.text
    input.type = 'checkbox'
    input.id = 'input' + inputcounter
    button.className = 'app__list__item__icon'
    button.id = 'button' + ++buttoncounter
    icon.src = 'https://cdn-icons-png.flaticon.com/512/1483/1483063.png'
    icon.style.width = "100%";
    if (objectdata.isDone == false) {
        div.className = "app__list__item"
    }
    else {
        input.checked = true
        div.className = "app__list__item_done"
    }
    div.id = 'button' + buttoncounter
    button.appendChild(icon)
    div.appendChild(input)
    div.appendChild(label)
    div.appendChild(button)


    //document.getElementById("mylist").appendChild(div)
    button.addEventListener('click', () => {
        let objcounter = 0
        for (let item of data) {
            if (objectdata.id == item.id) {
                data.splice(objcounter, 1)
            }
            objcounter++
        }
        sohranenie(data)
        render()
        //list.removeChild(document.getElementById(div.id))
    })

    input.addEventListener('change', () => {
        if (div.className == 'app__list__item') {
            div.className = 'app__list__item_done'
            objectdata.isDone = true
        }
        else {
            div.className = 'app__list__item'
        }
        sohranenie(data)
    })
    return div
}

function render() {
    list.innerHTML = ''
    for (let item of data) {
        const tempel = createnew(item)
        list.appendChild(tempel)
    }
}

function sohranenie(objectofdata) {
    let temp = JSON.stringify(objectofdata)
    localStorage.setItem('main', temp)
}
render()
