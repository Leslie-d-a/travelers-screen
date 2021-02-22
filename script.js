var lettersOne = document.getElementById('letters')
var lettersTwo = document.getElementById('backLetters')
var width = window.innerWidth
var height = window.innerHeight

var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z']

function createElement(type, name, appendTo, text, style, id) {
    var element = document.createElement(type)
    element.className = name
    element.innerHTML = text
    element.style = style
    element.id = id
    document.getElementById(appendTo).appendChild(element)
}
while (lettersOne.firstChild) {
    lettersOne.firstChild.remove();
}
while (lettersTwo.firstChild) {
    lettersTwo.firstChild.remove();
}
for (a = 0; a < Math.floor(height / 35); a++) {
    for (i = 0; i < Math.floor(width / 35); i++) {
        createElement('div', 'letter1', 'letters', letters[Math.floor(Math.random() * 25)], "grid-area:" + (a + 1) + "/" + (i + 1) + "/" + (a + 2) + "/" + (i + 2) + ";")
        createElement('div', 'letter2', 'backLetters', letters[Math.floor(Math.random() * 25)], "grid-area:" + (a + 1) + "/" + (i + 1) + "/" + (a + 2) + "/" + (i + 2) + ";")
        createElement('div', 'traveler', 'traveler', "" , "grid-area:" + (a + 1) + "/" + (i + 1) + "/" + (a + 2) + "/" + (i + 2) + ";", i.toString()+" "+a.toString())
    }
    lettersOne.innerHTML += "<br>"
    lettersTwo.innerHTML += "<br>"
}
setInterval(function(){
    [...document.getElementById('letters').children].forEach(child => child.innerHTML = letters[Math.floor(Math.random() * 25)]);
    [...document.getElementById('backLetters').children].forEach(child => child.innerHTML = letters[Math.floor(Math.random() * 25)]);
}, 300);

function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}
var countLine=0
var letterDelay = 50;

var text = [
    ["Traveler 3468","T.E.L.L. coordinates received","","reception confirmed","","Re: reception per","Traveller 0115 confirmed"],
    ["Mission:  FAIL <5001, 5002>","Status:   RETRY <att 3>","TELL rev: E-67.47m","Seq Init: Traveler 5003","","",""],
    ["Mission:  ACTIVE <5008>","Status:   new","TELL:     48.7713N 122.1141W","Seq Init: Traveler 5009","","",""],
    ["TRAV PROGRAM VER ONE","Status: FAIL","RESET","LOAD SEQ:","TRAV PROGRAM:","VER TWO...... BEGIN",""]
]
var colorData = ["",
    [
        {
            "line":0,
            "colorNums":[15,16,17,18,19,20,21,22,23,24,25,26]
        }
    ],[
        {
            "line":0,
            "colorNums":[17,18,19,20,21,22]
        }
    ],[
        {
            "line":1,
            "colorNums":[8,9,10,11]
        },{
            "line":5,
            "colorNums":[14,15,16,17,18]
        }
    ]
]


var colors = ["",
    [
        {
            "color1" : "rgb(255,20,20)",
            "color2" : "0 0 10px rgb(200,20,20)"
        }
    ],[
        {
            "color1" : "rgb(120,255,120)",
            "color2" : "0 0 10px rgb(50,200,50)"
        }
    ],[
        {
            "color1" : "rgb(255,20,20)",
            "color2" : "0 0 10px rgb(200,20,20)"
        },{
            "color1" : "rgb(120,255,120)",
            "color2" : "0 0 10px rgb(50,200,50)"
        }
    ]
]


async function displayText(){
    let num = Math.floor(Math.random() * 3)
    let colorNum=0;
    let colorLine=0;
    let y = Math.floor(Math.random() * 5)+10
    for (i=0;i<text[num].length;i++,y++){
        if (text[num][i] != ""){
            let word = text[num][i].split("")
            if (num == 1 || num == 2 || num == 3){
                start = 10
            } else {
                start = Math.floor(Math.random() * Math.floor(width / 35-word.length))
            }
            for (a=0;a<word.length;a++){
                await sleep(letterDelay);
                if (colorData[num][colorLine]!= undefined && colorData[num][colorLine].colorNums[colorNum] == a && colorData[num][colorLine].line == i){
                    colorNum++
                    document.getElementById((a+start)+" "+y.toString()).style.color = colors[num][colorLine].color1
                    document.getElementById((a+start)+" "+y.toString()).style.textShadow = colors[num][colorLine].color2
                }
                document.getElementById((a+start)+" "+y.toString()).innerHTML = word[a]
            }
            if (colorData[num][colorLine]!= undefined && colorData[num][colorLine].line == i){
                colorLine++
            }
        }
    }
}

async function load(){
        [...document.getElementById('traveler').children].forEach(child => child.innerHTML = "")
        await displayText()
        await sleep(6000)
        load()
}
load()


