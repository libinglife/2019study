//冒泡排序

var arr = [7,8,1,3,4,5,2,6,9];

function bubbleSort (array) {
    var length = array.length;
    var isSwap;

    for(var i=0;i<length;i++){
        // isSwap = false;
         for (var j= 0;j<length-1-i;j++){
             if(array[j]>array[j+1]){
                 // isSwap = true;
                 var temp = array[j+1];
                 array[j+1] = array[j];
                 array[j] = temp;
             }
         }
         // if(!isSwap){
         //     break;
         // }
    }
    return array;
}


console.log(bubbleSort(arr))