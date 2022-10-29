
const config = {"system" : {"thymine" : 9999,"guanine" : 333}};
const alphabet = [null,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"," ", ",", ".", "?", ";", "/", "!", "%", "&", "|", "(", ")", "$", "*", "#", "°", "@", "[", "]", "{", "}", "=", "+", "-", "_", ":", "<", ">", "^", "'", '"', "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const a = "A";
const c = "C";
const sep = ["UUU"];
let codon = "";
let ser = "";
let propellerDataByt = 0;
let sepIndex = Math.floor(Math.random()*1);
let elev;
let pos = "";
let _thymine = config.system.thymine;
let _guanine = config.system.guanine;
let t = Math.floor(Math.random()*_thymine);
let g = Math.floor(Math.random()*_guanine);
let currentLayer = 0;
let readingKeys = [t,g];
let propeller = "";
let trPhrase = "";

async function generateCodons (phrase,enc_level) {
    var currentChar = 0;
    var phraseChars = phrase.split("");
    var phraseLength = phraseChars.length;
    propeller = "";
    codon = "";
    ser = ""
    do {
        var char = phraseChars[currentChar];
        var charIndex = alphabet.indexOf(char);
        elev = (t*charIndex)+(g*charIndex);
        ser = "";
        var serV = 0;
        do {
           var randomBase = Math.floor(Math.random()*2);
            if (randomBase == 0) {
                propeller = propeller + a;
                pos = pos + a;
                if (codon.length != 3) {
                    codon = codon + a;
                } else {
                    codon = a
                }
                serV = serV + 1;
                ser = ser + a;
            }
            if (randomBase == 1) {
                propeller = propeller + c;
                if (codon.length != 3) {
                    codon = codon + c;
                } else {
                    codon = c
                }
                serV = serV + 1 - 1;
                ser = ser + c;
            }
            if (serV == elev) {
                propeller = propeller + c + c;
            }
            
        } while (serV < elev) 
        propeller = propeller + sep[sepIndex];
        currentChar = currentChar+1;
    } while (currentChar <= phraseLength);

    if ((Math.round(pos.length/3)) != pos.length/3) {
        if (Math.round(pos.length/3) >= pos.length/3) {
            propeller = propeller + c;
            ser = ser + c;
        } else {
            var propellerArray = propeller.split("");
            var excIndex = propeller.split("").indexOf(c);
            propellerArray.splice(excIndex, excIndex+1);
            propeller = propellerArray.join("");
            var posArray = pos.split("");
            posArray.splice(0,1);
            pos = posArray.join("");
        }
    }

    if (propeller.split("")[(propeller.split("").length)-3] != "U") {
        propeller = propeller + "U";
    }

    propellerArray = propeller.split("");
    propellerArray.splice(propellerArray.length -8, propellerArray.length);
    propeller = propellerArray.join("");
    propellerDataByt = propeller.length;

    const prv_readingKeys = readingKeys;
    const prv_propeller = propeller;

    if (enc_level==1) {
        propeller = "";
        t = Math.floor(Math.random()*_thymine);
        g = Math.floor(Math.random()*_guanine);
        readingKeys = [t,g];
        currentLayer = currentLayer +1;
        generateCodons(prv_propeller,0)
    }
}

async function readCodons (propeller,readingKey1,readingKey2) {
    trPhrase="";
    const tym = readingKey1;
    const gua = readingKey2;
    let cIndex;

    var posD = propeller.split("C").join("");
    var serArray = posD.split("UUU");
    var currentSer = 0;
    do {
        var cSer = serArray[currentSer];
        var cSerLength = cSer.length;
        cIndex = Math.floor(cSerLength/(tym+gua));
        var ch = alphabet[cIndex];
        trPhrase = trPhrase + ch;
        currentSer = currentSer +1;
    } while (currentSer < serArray.length);
}
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
generateCodons(text,0).then(()=>{
    console.log("done");
    console.log(propellerDataByt);
    console.log(text.length)
})
 
