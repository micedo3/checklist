let counter = 0
let inputcounter = 0
let divid = 0
let buttoncounter = 0
let ipadress = "http://127.0.0.1:3000/tasks"
let data = [{
}]

init()
async function get() {
    const res = await fetch(ipadress, {
        method: 'GET'
    })
    if(!res.ok){
        console.log('ALERT!!!!')
        return
    }
    data = await res.json()
}


async function createTask(data) {
    const res = await fetch(ipadress, {
        method: 'POST',
        body: JSON.stringify({
            text: data.text,
            isDone: data.isDone
        })
    })
    if(!res.ok){
        console.log('ALERT!!!!')
        return
    }
    return await res
}

async function  deleteTask(id) {
    const res = await fetch(ipadress, {
        method: "DELETE",
        body: JSON.stringify({
                id: id
         })
        
    })
    if(!res.ok){
        console.log('ALERT!!!!')
        return
    }
    return await res
}
async function  changeStatus(id) {
    const res = await fetch(ipadress, {
        method: "PATCH",
        body: JSON.stringify({
                id: id
         })
    })
    if(!res.ok){
        console.log('ALERT!!!!')
        return
    }
    return await res
}



async function init(){

    data.forEach((item) => {
        if (item.id > counter) {
            counter = item.id
        } 
        if (counter > 1) {
            counter++
        }
    })
    await get()
    render()
    console.log(data)
}
const mainbutton = document.getElementById("mainbutton")
const list = document.getElementById("mylist")
const textbox = document.getElementById("textbox")
mainbutton.addEventListener('click', async () => {
    
    const item = await createTask({
        text: textbox.value,
        isDone: false
    })
    await get()
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
    button.className = 'app__list__item__icon'
    icon.src = 'https://cdn-icons-png.flaticon.com/512/1483/1483063.png'
    icon.style.width = "100%";
    if (objectdata.isDone == false) {
        div.className = "app__list__item"
    }
    else {
        input.checked = true
        div.className = "app__list__item_done"
    }
    button.appendChild(icon)
    div.appendChild(input)
    div.appendChild(label)
    div.appendChild(button)

    button.addEventListener('click', async() => {
        await deleteTask(objectdata.id)
        await get()

        render()
    })
    
    input.addEventListener('change', async() => {
        await changeStatus(objectdata.id)
        await get()
        render()

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

render()
