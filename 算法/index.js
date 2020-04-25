/*
 * @version: 
 * @Author: 李兵
 * @Date: 2019-06-10 23:23:56
 * @LastEditTime: 2020-04-14 22:45:02
 */
//冒泡排序

var arr = [7, 8, 1, 3, 4, 5, 2, 6, 9];

function bubbleSort(array) {
    var length = array.length;
    var isSwap;

    for (var i = 0; i < length; i++) {
        // isSwap = false;
        for (var j = 0; j < length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                // isSwap = true;
                var temp = array[j + 1];
                array[j + 1] = array[j];
                array[j] = temp;
            }
        }
        // if(!isSwap){
        //     break;
        // }
    }
    return array;
}

function mybobl(array) {

    // var arr = [7, 8, 1, 3, 4, 5, 2, 6, 9];

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {

            if (array[j] <= array[j + 1]) {
                console.log(i + '---' + j)
                let temp = array[j + 1]; //大的复制给temp
                array[j + 1] = array[j];
                array[j] = temp
            }
        }
    }
    return array
}


// console.log(bubbleSort(arr))
console.log(mybobl(arr))