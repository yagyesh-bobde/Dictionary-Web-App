let data = {}

let showLoad = false
function showLoading() {

}

async function searchMeaning() {
    showLoad = true
    const word = document.getElementById('search')
    if(!word.value) {
        // 
    }
    if(data.word === word.value) {
        return alert('already searched');
    } else {
        let fetchData = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`)
        fetchData.then((response) => {
            return response.json()
        }).then(res => {
            data=res[0]
            showLoad = false
            return showData(res[0])
        })
    }
}

function showData(newData) {
    console.log(newData)
    if (!newData) {
        console.error("no data");
        alert("No data on the search term")
    }
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
    
}


function playAudio() {
    let audioSorces = data?.phonetics
    if (audioSorces.length === 0) return alert('No audio for this word')
    let audioPlay = document.getElementsByTagName('audio')[0]
    for (let i = 0; i < audioSorces.length ; i++) {
        if (audioSorces[i].audio) {
            audioPlay.src = audioSorces[i].audio 
            audioPlay.play()
        }
    }
}