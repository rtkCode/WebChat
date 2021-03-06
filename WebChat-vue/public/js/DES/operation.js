const operation = {};

// convert a string into a binary number list
operation.toBinary=function(str){
    let b = [];
    let l = str.split("");
    for(let i=0; i<l.length; i++){
        // convert string into char code and convert it into binary number
        let bStr = l[i].charCodeAt().toString(2);
        // to prevent omitted 0 by js
        if(bStr.length<8){
            let lackZero= 8 - bStr.length;
            for(let j=0; j<lackZero; j++) {
                bStr="0"+bStr;
            }
        }
        // convert string into an integer list
        bStr=bStr.split("").map(Number);
        b=b.concat(bStr);
    }
    return b;
};

// convert an integer into a binary number string, similar to toBinary()
operation.intToBinary=function(int){
    let bStr = int.toString(2);
    if(bStr.length<4){
        let lackZero= 4 - bStr.length;
        for(let j=0; j<lackZero; j++) {
            bStr="0"+bStr;
        }
    }
    return bStr;
};

// xor
operation.XOR=function(a,b){
    let c = [];
    for(let i in a){
        if(a[i]==b[i]) c.push(0);
        else c.push(1);
    }
    return c;
};

// move an array to the left by n
operation.leftLoop=function(array, n){
    return array.slice(n).concat(array.slice(0,n))
};

// divide an array in to x sub-arrays of n
operation.divideArray=function(array, n){
    let index = 0;
    let afterArray = [];
    while(index < array.length) {
        afterArray.push(array.slice(index, index += n));
    }
    return afterArray;
};

export default operation