import operation from "./operation.js"

const key = {};

// loop Ci and Di using loop table
key.loop=function(C0,D0){
    let leftLoopList = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

    let CArray = []; // replaced Ci
    let DArray = []; // replaced Di
    let array = []; // replaced CiDi

    CArray.push(C0);
    DArray.push(D0);

    for(let i in leftLoopList){
        let thisC = operation.leftLoop(CArray[i],leftLoopList[i]);
        let thisD = operation.leftLoop(DArray[i],leftLoopList[i]);
        CArray.push(thisC);
        DArray.push(thisD);
        array.push(thisC.concat(thisD)); // add replaced Ci and replaced Di together
    }

    return array;
};

// replace CiDi by PC2 table and generate keys Ki
key.PC2=function(CDArray){
    let keyList = [];
    let PC2List = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10,
        23, 19, 12, 4, 26,  8, 16, 7, 27, 20, 13,  2,
        41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48,
        44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
    for(let a in CDArray){
        let key = [];
        // replace
        for(let i in PC2List){
            key.push(CDArray[a][PC2List[i]-1]);
        }
        keyList.push(key);
    }
    return keyList;
};

// PC1 table replace
key.PC1=function(binaryKey){
    let PC1List = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
    let PC1Key = [];
    for(let i in PC1List){
        PC1Key.push(binaryKey[PC1List[i]-1]);
    }
    return PC1Key
};

// generate key list
key.keys=function(password){
    let binaryKey = operation.toBinary(password);
    let PC1Key = this.PC1(binaryKey);

    let C0=PC1Key.slice(0,28);
    let D0=PC1Key.slice(28,56);
    let CDArray = this.loop(C0,D0);

    let keys = this.PC2(CDArray);
    return keys;
};

export default key