var intensity = [];
var data = {
    x: [],
    y: [],
    z: [],
    i: [],
    j: [],
    k: []
};
var ijkIndex = {
    i: [0, 3, 5, 3, 4, 7, 0, 6, 4, 1, 6, 3],
    j: [1, 2, 1, 7, 5, 6, 4, 2, 5, 0, 7, 2],
    k: [3, 0, 3, 5, 7, 4, 6, 0, 1, 4, 3, 6]
};

var size = 3;
var point = size + 1;

function random(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function getXYZ() {
    for (let floor = 0; floor < point; floor++) {
        let z = floor;
        for (let i = 0; i < Math.pow(point, 2); i++) {
            let x = Math.floor(i / point);
            let y = i % point;
            data.x.push(x);
            data.y.push(y);
            data.z.push(z);
            intensity.push((z * Math.pow(point, 2) + i) / (Math.pow(point, 3)));
        }
        // console.log(`floor: ${floor}`);
        // console.log(data);
        // data = { x: [], y: [], z: [] };
    }
    console.log(intensity);
}

function initSurfaceSet() { //size:4 point:5
    var d = new Array();
    for (let z = 0; z < size; z++) {
        let zplus = z * point * point;
        for (let y = 0; y < size; y++) {
            let yplus = zplus + y * point;
            for (let x = 0; x < size; x++) {
                let one = [];
                one.push(x + yplus, x + 1 + yplus, x + point + yplus, x + point + 1 + yplus, x + point * point + yplus, x + point * point + 1 + yplus, x + point * point + point + yplus, x + point * point + point + 1 + yplus);
                d.push(one);
                // console.log(one);
            }
        }
    }
    return d;
}

function getIJK() {
    var d = initSurfaceSet();
    for (let c = 0; c < d.length; c++) {
        let cube = d[c];
        let i = ijkIndex.i;
        let j = ijkIndex.j;
        let k = ijkIndex.k;
        let i1 = [],
            j1 = [],
            k1 = [];
        for (let index = 0; index < i.length; index++) {
            i1.push(cube[i[index]]);
            j1.push(cube[j[index]]);
            k1.push(cube[k[index]]);
        }
        // console.log(i1);
        // console.log(j1);
        // console.log(k1);
        // console.log("----------------------");
        data.i.push.apply(data.i, i1);
        data.j.push.apply(data.j, j1);
        data.k.push.apply(data.k, k1);
    }
}

function init() {
    getXYZ();
    getIJK();
}
// getXYZ();
// initSurfaceSet();
// getIJK();


// point set
// floor: 0  { x: [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4 ],
//             y: [ 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4 ],
//             z: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] }
// floor: 1  { x: [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4 ],
//             y: [ 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4 ],
//             z: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ] }
// floor: 2  { x: [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4 ],
//             y: [ 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4 ],
//             z: [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ] }
// floor: 3  { x: [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4 ],
//             y: [ 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4 ],
//             z: [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ] }
// floor: 4  { x: [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4 ],
//             y: [ 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4 ],
//             z: [ 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ] }

//cube set
// [ 0, 1, 5, 6, 25, 26, 30, 31 ]
// [ 1, 2, 6, 7, 26, 27, 31, 32 ]
// [ 2, 3, 7, 8, 27, 28, 32, 33 ]
// [ 3, 4, 8, 9, 28, 29, 33, 34 ]
// [ 5, 6, 10, 11, 30, 31, 35, 36 ]
// [ 6, 7, 11, 12, 31, 32, 36, 37 ]
// [ 7, 8, 12, 13, 32, 33, 37, 38 ]
// [ 8, 9, 13, 14, 33, 34, 38, 39 ]
// [ 10, 11, 15, 16, 35, 36, 40, 41 ]
// [ 11, 12, 16, 17, 36, 37, 41, 42 ]
// [ 12, 13, 17, 18, 37, 38, 42, 43 ]
// [ 13, 14, 18, 19, 38, 39, 43, 44 ]
// [ 15, 16, 20, 21, 40, 41, 45, 46 ]
// [ 16, 17, 21, 22, 41, 42, 46, 47 ]
// [ 17, 18, 22, 23, 42, 43, 47, 48 ]
// [ 18, 19, 23, 24, 43, 44, 48, 49 ]
// [ 25, 26, 30, 31, 50, 51, 55, 56 ]
// [ 26, 27, 31, 32, 51, 52, 56, 57 ]
// [ 27, 28, 32, 33, 52, 53, 57, 58 ]
// [ 28, 29, 33, 34, 53, 54, 58, 59 ]
// [ 30, 31, 35, 36, 55, 56, 60, 61 ]
// [ 31, 32, 36, 37, 56, 57, 61, 62 ]
// [ 32, 33, 37, 38, 57, 58, 62, 63 ]
// [ 33, 34, 38, 39, 58, 59, 63, 64 ]
// [ 35, 36, 40, 41, 60, 61, 65, 66 ]
// [ 36, 37, 41, 42, 61, 62, 66, 67 ]
// [ 37, 38, 42, 43, 62, 63, 67, 68 ]
// [ 38, 39, 43, 44, 63, 64, 68, 69 ]
// [ 40, 41, 45, 46, 65, 66, 70, 71 ]
// [ 41, 42, 46, 47, 66, 67, 71, 72 ]
// [ 42, 43, 47, 48, 67, 68, 72, 73 ]
// [ 43, 44, 48, 49, 68, 69, 73, 74 ]
// [ 50, 51, 55, 56, 75, 76, 80, 81 ]
// [ 51, 52, 56, 57, 76, 77, 81, 82 ]
// [ 52, 53, 57, 58, 77, 78, 82, 83 ]
// [ 53, 54, 58, 59, 78, 79, 83, 84 ]
// [ 55, 56, 60, 61, 80, 81, 85, 86 ]
// [ 56, 57, 61, 62, 81, 82, 86, 87 ]
// [ 57, 58, 62, 63, 82, 83, 87, 88 ]
// [ 58, 59, 63, 64, 83, 84, 88, 89 ]
// [ 60, 61, 65, 66, 85, 86, 90, 91 ]
// [ 61, 62, 66, 67, 86, 87, 91, 92 ]
// [ 62, 63, 67, 68, 87, 88, 92, 93 ]
// [ 63, 64, 68, 69, 88, 89, 93, 94 ]
// [ 65, 66, 70, 71, 90, 91, 95, 96 ]
// [ 66, 67, 71, 72, 91, 92, 96, 97 ]
// [ 67, 68, 72, 73, 92, 93, 97, 98 ]
// [ 68, 69, 73, 74, 93, 94, 98, 99 ]
// [ 75, 76, 80, 81, 100, 101, 105, 106 ]
// [ 76, 77, 81, 82, 101, 102, 106, 107 ]
// [ 77, 78, 82, 83, 102, 103, 107, 108 ]
// [ 78, 79, 83, 84, 103, 104, 108, 109 ]
// [ 80, 81, 85, 86, 105, 106, 110, 111 ]
// [ 81, 82, 86, 87, 106, 107, 111, 112 ]
// [ 82, 83, 87, 88, 107, 108, 112, 113 ]
// [ 83, 84, 88, 89, 108, 109, 113, 114 ]
// [ 85, 86, 90, 91, 110, 111, 115, 116 ]
// [ 86, 87, 91, 92, 111, 112, 116, 117 ]
// [ 87, 88, 92, 93, 112, 113, 117, 118 ]
// [ 88, 89, 93, 94, 113, 114, 118, 119 ]
// [ 90, 91, 95, 96, 115, 116, 120, 121 ]
// [ 91, 92, 96, 97, 116, 117, 121, 122 ]
// [ 92, 93, 97, 98, 117, 118, 122, 123 ]
// [ 93, 94, 98, 99, 118, 119, 123, 124 ]