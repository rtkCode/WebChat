import operation from "./operation.js"
import encode from "./encode.js"

const decode = {};

// decode
decode.decode=function(encodedWords,keys){
    let R16L16=encode.IP(encodedWords);

    let R16=R16L16.slice(0,32);
    let L16=R16L16.slice(32,64);

    let L=L16;
    let R=R16;
    let Rp="";

    // inverse operation
    for(let i=15; i>-1; i--){
        Rp=L;
        let E=encode.ETable(Rp);
        let EK = operation.XOR(E,keys[i]);
        let S = encode.STable(EK);
        let P =encode.PTable(S);
        L = operation.XOR(R,P);
        R=Rp;
    }

    let L0R0 = L.concat(R);
    let ip = encode.IP1(L0R0);

    // divide binary list into lists of 8
    let plainBinaryList=operation.divideArray(ip,8);
    let plainBinary=[];

    // join 8 binary numbers together
    for(let i in plainBinaryList){
        plainBinary.push(plainBinaryList[i].join(""));
    }

    // turn binary in to decimal
    let decimalTextList=[];
    for(let i in plainBinary){
        decimalTextList.push(parseInt(plainBinary[i],2));
    }

    // turn decimal code in to character
    let plainText="";
    for(let i in decimalTextList){
        plainText+=String.fromCharCode(decimalTextList[i]);
    }

    return plainText;
};

export default decode