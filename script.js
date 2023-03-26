let data = {}

let showLoad = false

function showLoading() {

}

async function searchMeaning() {
    
    const app = document.getElementsByClassName('app_content')[0]
    const empty = document.getElementsByClassName('empty_screen')[0]
    app.style.display = "none";
    empty.style.display = "grid";
    empty.innerHMTL = "Loading"
    const word = document.getElementById('search')

    try {
        
        if (!word.value) {
            // alert
            alert('search word is empty')
        }
        if (data.word === word.value) {
            return ;
        } else {
            let fetchData = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`)
            fetchData.then((response) => {
                return response.json()
            }).then(res => {
                data = res[0]
                showLoad = false
                return showData(res[0])
            })
        }

    } catch (error) {
       return alert(error)
    }
    
}

function showData(newData) {
    console.log(newData)
    const app = document.getElementsByClassName('app_content')[0]
    const empty = document.getElementsByClassName('empty_screen')[0]
    if (!newData) {
        empty.innerHMTL = "Oops! Word not found."
    }
    
   
    app.style.display = "flex";
    empty.style.display = "none";
    const word_heading = document.getElementById('word_heading')
    const word_pne = document.getElementById('word_subtitle')
    
    // heading
    word_heading.textContent = newData.word;
    word_pne.textContent = newData.phonetic;

    //* meaning
        // * meaning - noun
    let nounMeaning = newData.meanings[0]
    let i = 0
    let nounDiv = document.querySelector('.word_div_desc ul')
    while (nounMeaning && nounMeaning.definitions && i < nounMeaning.definitions.length){
        let newLi = document.createElement('li')
        let newSpan = document.createElement('span')
        newSpan.textContent = nounMeaning.definitions[i].definition
        newLi.append(newSpan)
        nounDiv.append(newLi)
        i++;
    }
    
    // * meaning - verb
    let verbMeaning = newData.meanings[1]
    i = 0
    let verbDiv = document.getElementById('word_verb_list')
    while (verbMeaning && verbMeaning.definitions && i < verbMeaning.definitions.length) {
        let newLi = document.createElement('li')
        let newLiInside = document.createElement('li')
        let newSpan = document.createElement('span')
        newSpan.textContent = verbMeaning.definitions[i].definition
        newLiInside.textContent = verbMeaning.definitions[i].example
        newLiInside.classList.add('inside_list_item')
        newLi.append(newSpan, newLiInside)
        verbDiv.append(newLi)
        i++;
    }
        
    const source_url = document.getElementById('source_url')
    source_url.href = newData.sourceUrls[0]
    source_url.textContent = newData.sourceUrls[0]
    console.log(newData)
    
}


function playAudio() {
    let audioSorces = data?.phonetics
    if (audioSorces.length === 0) return alert('No audio avilable this word')
    let audioPlay = document.getElementsByTagName('audio')[0]
    for (let i = 0; i < audioSorces.length ; i++) {
        if (audioSorces[i].audio) {
            audioPlay.src = audioSorces[i].audio 
            audioPlay.play()
        }
    }
}








// toggle 
const toggle = document.getElementsByClassName('toggle_mode')[0]
const body = document.getElementsByTagName('body')[0]



toggle.onclick = function () {
    toggle.classList.toggle('active')
    body.classList.toggle('active')

    // search box
    const search_box = document.querySelector('.search_box')
    const search_input = document.querySelector('.search_box input')

    search_box.classList.toggle('active')
    search_input.classList.toggle('active')

    const legends = document.querySelectorAll('.new_section legend')
    legends.forEach((legend) => {
        legend.classList.toggle('active')
    })


    const lis = document.querySelectorAll('li span')
    lis.forEach((li) => {
        li.classList.toggle('active')
    })


    const select = document.getElementsByTagName('select')[0]
    select.classList.toggle('active')
}
