console.log('Selection sort');
function selectionSort(arr){
    let minIdx, temp,
        len = arr.length;
    for(let i = 0; i < len-1; i++){
        minIdx = i;
        for(let j = i+1; j<len; j++){
            if(arr[j]<=arr[minIdx]){
                minIdx = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
    return arr;
}


