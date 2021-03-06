import operation from "./operation.js"

const encode = {};

// IP table replace
encode.IP=function(binaryText){
    let IPList = [58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4,
        62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8,
        57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3,
        61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7];
    let IPText = [];
    for(let i in IPList){
        IPText.push(binaryText[IPList[i]-1]);
    }
    return IPText;
};

// E table replace
encode.ETable=function(R0){
    let EList = [32,  1,  2,  3,  4,  5,  4,  5,
        6,  7,  8,  9,  8,  9, 10, 11,
        12, 13, 12, 13, 14, 15, 16, 17,
        16, 17, 18, 19, 20, 21, 20, 21,
        22, 23, 24, 25, 24, 25, 26, 27,
        28, 29, 28, 29, 30, 31, 32,  1];
    let EText=[];
    for(let i in EList){
        EText.push(R0[EList[i]-1]);
    }
    return EText;
};

// S table replace
encode.STable=function(ETextK1){
    // initialize S_table
    let SList=[];

    let Slist1=[];
    let Slist2=[];
    let Slist3=[];
    let Slist4=[];
    let Slist5=[];
    let Slist6=[];
    let Slist7=[];
    let Slist8=[];

    Slist1.push([14,  4, 13,  1,  2, 15, 11,  8,  3, 10,  6, 12,  5,  9,  0,  7]);
    Slist1.push([ 0, 15,  7,  4, 14,  2, 13,  1, 10,  6, 12, 11,  9,  5,  3,  8]);
    Slist1.push([4,  1, 14,  8, 13,  6,  2, 11, 15, 12,  9,  7,  3, 10,  5,  0]);
    Slist1.push([15, 12,  8,  2,  4,  9,  1,  7,  5, 11,  3, 14, 10,  0,  6, 13]);

    Slist2.push([15,  1,  8, 14,  6, 11,  3,  4,  9,  7,  2, 13, 12,  0,  5, 10]);
    Slist2.push([3, 13,  4,  7, 15,  2,  8, 14, 12,  0,  1, 10,  6,  9, 11,  5]);
    Slist2.push([0, 14,  7, 11, 10,  4, 13,  1,  5,  8, 12,  6,  9,  3,  2, 15]);
    Slist2.push([13,  8, 10,  1,  3, 15,  4,  2, 11,  6,  7, 12,  0,  5, 14,  9]);

    Slist3.push([10,  0,  9, 14,  6,  3, 15,  5,  1, 13, 12,  7, 11,  4,  2,  8]);
    Slist3.push([13,  7,  0,  9,  3,  4,  6, 10,  2,  8,  5, 14, 12, 11, 15,  1]);
    Slist3.push([13,  6,  4,  9,  8, 15,  3,  0, 11,  1,  2, 12,  5, 10, 14,  7]);
    Slist3.push([1, 10, 13,  0,  6,  9,  8,  7,  4, 15, 14,  3, 11,  5,  2, 12]);

    Slist4.push([7, 13, 14,  3,  0,  6,  9, 10,  1,  2,  8,  5, 11, 12,  4, 15]);
    Slist4.push([13,  8, 11,  5,  6, 15,  0,  3,  4,  7,  2, 12,  1, 10, 14, 19]);
    Slist4.push([10,  6,  9,  0, 12, 11,  7, 13, 15,  1,  3, 14,  5,  2,  8,  4]);
    Slist4.push([3, 15,  0,  6, 10,  1, 13,  8,  9,  4,  5, 11, 12,  7,  2, 14]);

    Slist5.push([2, 12,  4,  1,  7, 10, 11,  6,  5,  8,  3, 15, 13,  0, 14,  9]);
    Slist5.push([14, 11,  2, 12,  4,  7, 13,  1,  5,  0, 15, 13,  3,  9,  8,  6]);
    Slist5.push([4,  2,  1, 11, 10, 13,  7,  8, 15,  9, 12,  5,  6,  3,  0, 14]);
    Slist5.push([11,  8, 12,  7,  1, 14,  2, 13,  6, 15,  0,  9, 10,  4,  5,  3]);

    Slist6.push([12,  1, 10, 15,  9,  2,  6,  8,  0, 13,  3,  4, 14,  7,  5, 11]);
    Slist6.push([10, 15,  4,  2,  7, 12,  9,  5,  6,  1, 13, 14,  0, 11,  3,  8]);
    Slist6.push([9, 14, 15,  5,  2,  8, 12,  3,  7,  0,  4, 10,  1, 13, 11,  6]);
    Slist6.push([4,  3,  2, 12,  9,  5, 15, 10, 11, 14,  1,  7,  6,  0,  8, 13]);

    Slist7.push([4, 11,  2, 14, 15,  0,  8, 13,  3, 12,  9,  7,  5, 10,  6,  1]);
    Slist7.push([13,  0, 11,  7,  4,  9,  1, 10, 14,  3,  5, 12,  2, 15,  8,  6]);
    Slist7.push([1,  4, 11, 13, 12,  3,  7, 14, 10, 15,  6,  8,  0,  5,  9,  2]);
    Slist7.push([6, 11, 13,  8,  1,  4, 10,  7,  9,  5,  0, 15, 14,  2,  3, 12]);

    Slist8.push([13,  2,  8,  4,  6, 15, 11,  1, 10,  9,  3, 14,  5,  0, 12,  7]);
    Slist8.push([1, 15, 13,  8, 10,  3,  7,  4, 12,  5,  6, 11,  0, 14,  9,  2]);
    Slist8.push([7, 11,  4,  1,  9, 12, 14,  2,  0,  6, 10, 13, 15,  3,  5,  8]);
    Slist8.push([2,  1, 14,  7,  4, 10,  8, 13, 15, 12,  9,  0,  3,  5,  6, 11]);

    SList.push(Slist1);
    SList.push(Slist2);
    SList.push(Slist3);
    SList.push(Slist4);
    SList.push(Slist5);
    SList.push(Slist6);
    SList.push(Slist7);
    SList.push(Slist8);

    // divide ETextK1 into 8 arrays
    let eightArray=operation.divideArray(ETextK1,6)

    let SSum = "";


    // replace in S table
    for(let i in eightArray){
        let row = eightArray[i][0].toString()+eightArray[i][5].toString();
        let col = eightArray[i][1].toString()+eightArray[i][2].toString()+eightArray[i][3].toString()+eightArray[i][4].toString();

        let rowInt=parseInt(row, 2);
        let colInt=parseInt(col, 2);

        let s = SList[i][rowInt][colInt];
        s = operation.intToBinary(s);
        SSum+=s;
    }

    return SSum.split("").map(Number);
};

// P table replace
encode.PTable=function(SText){
    let PList=[16,  7, 20, 21, 29, 12, 28, 17,
        1, 15, 23, 26,  5, 18, 31, 10,
        2,  8, 24, 14, 32, 27,  3,  9,
        19, 13, 30,  6, 22, 11,  4, 25];
    let PText = [];
    for(let i in PList){
        PText.push(SText[PList[i]-1]);
    }
    return PText
};

// IP1 table replace
encode.IP1=function(list){
    let IP1List = [40,  8, 48, 16, 56, 24, 64, 32,
        39,  7, 47, 15, 55, 23, 63, 31,
        38,  6, 46, 14, 54, 22, 62, 30,
        37,  5, 45, 13, 53, 21, 61, 29,
        36,  4, 44, 12, 52, 20, 60, 28,
        35,  3, 43, 11, 51, 19, 59, 27,
        34,  2, 42, 10, 50, 18, 58, 26,
        33,  1, 41,  9, 49, 17, 57, 25];
    let array = [];
    for(let i in IP1List){
        array.push(list[IP1List[i]-1]);
    }
    return array;
};

// final encode
encode.encode=function(L0,R0,keys){
    let L=L0;
    let R=R0;
    let Rp="";

    for(let i=0; i<16; i++){
        Rp = R;
        let E=this.ETable(R);
        let EK = operation.XOR(E,keys[i]);
        let S = this.STable(EK);
        let P =this.PTable(S);
        R = operation.XOR(L,P);
        L=Rp;
    }
    let R16L16 = R.concat(L);
    let ip1 = this.IP1(R16L16);

    // turn bits array into a list of string
    let encodeBinaryTextList = operation.divideArray(ip1, 8); // store bits list
    let encodeBinaryTextList2=[]; // store binary string list
    for(let i in encodeBinaryTextList){
        let str="";
        for(let j in encodeBinaryTextList[i]){
            str+=encodeBinaryTextList[i][j];
        }
        encodeBinaryTextList2.push(str);
    }

    // turn binary in to decimal
    let decimalTextList=[];
    for(let i in encodeBinaryTextList2){
        decimalTextList.push(parseInt(encodeBinaryTextList2[i],2));
    }

    return decimalTextList; // return a list of decimal code string
};

export default encode