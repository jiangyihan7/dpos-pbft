function bad_id(n,arr){
    num=randomNum(n/3);
    console.log(num);
    if(num==0) {
        return 'None';
    }else{
        return getRandomArrayElements(arr,num);
    }
}

function randomNum(max) {
    num=Math.floor(Math.random()*(max));
    return num;
}
Array.prototype.range = function ( start,end ){
    var _self = this;
    var length = end - start +1;
    var step = start - 1;
    return Array.apply(null,{length:length}).map(function (v,i){step++;return step;});
}

//从数组中随机取count个元素
function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);}


var array = [];
array=array.range(1,20)
console.log(bad_id(20, array))


