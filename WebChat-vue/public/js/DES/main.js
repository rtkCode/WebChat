import key from "./key.js"
import operation from "./operation.js"
import encode from "./encode.js"
import decode from "./decode.js"

const TZDES = {}

TZDES.DESEncode=function(plainText, password){
    // generate keys K1-K16
    let keys = key.keys(password);
    // encode URI to support Chinese
    plainText=encodeURI(plainText);

    // divide plain text into several lists of eight
    let plainTextList= operation.divideArray(plainText,8);

    // PKCS7Padding algorithm
    if(plainTextList[plainTextList.length-1].length==8){
        // if last item in list is eight characters
        plainTextList.push("88888888");
    }else{
        // use PKCS7Padding algorithm to make up
        plainTextList[plainTextList.length-1]=this.PKCS7Padding(plainTextList[plainTextList.length-1]);
    }

    let en = "";
    for(let i in plainTextList){
        // change plaintext into a list of binary numbers
        let binaryText = operation.toBinary(plainTextList[i]);

        let IPText = encode.IP(binaryText);
        let L0=IPText.slice(0,32);
        let R0=IPText.slice(32,64);

        // encode, output is a list of decimal numbers
        let encodedWordsList = encode.encode(L0,R0,keys);
        // join all item in list with "-", at this time the list is changed into a string
        let encodedWords = encodedWordsList.join("-");
        en=en+"-"+encodedWords
    }
    // remove the first "-"
    en=en.replace("-","");

    // use base64 to encode this string
    let base64Words = window.btoa(en);

    return base64Words;
};

TZDES.DESDecode=function(cipherText, password) {
    // generate keys K1-K16
    let keys = key.keys(password);
    // decode with base64
    let deBase64Words=window.atob(cipherText);
    // split the string in to a list of decimal numbers
    let encodedWordsList=deBase64Words.split("-");

    // turn decimal numbers into binary numbers
    let encodedWords=[];
    for(let i in encodedWordsList){
        let bStr = parseInt(encodedWordsList[i]).toString(2);
        // complete omitted numbers
        if(bStr.length<8){
            let lackZero= 8 - bStr.length;
            for(let j=0; j<lackZero; j++) {
                bStr="0"+bStr;
            }
        }
        encodedWords.push(bStr);
    }

    // turn all binary numbers into a list
    let en=encodedWords.join("");
    let en2=en.split("").map(Number);

    // divide them into several lists of 64
    let en3=operation.divideArray(en2,64);
    let plainText="";

    // decode
    for (let i in en3){
        plainText += decode.decode(en3[i],keys);
    }

    // remove the complemented characters according to PKCS7Padding algorithm
    let n = plainText[plainText.length-1];
    plainText=plainText.substring(0,plainText.length-parseInt(n));

    // decode URI
    plainText=decodeURI(plainText);

    return plainText;
};

// PKCS7Padding algorithm to make up for less than eight
TZDES.PKCS7Padding=function(str){
    let len=8-str.length;
    for(let i=0;i<len;i++){
        str+=len;
    }
    return str;
};

export default TZDES



