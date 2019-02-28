function bad_id(n){

    num=randomNum(n/3);
    if(num==0) {
        return [];
    }else{
        var arr = [];
        arr=arr.range(0,n+1);
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



// console.log(bad_id(20))

module.exports = bad_id;




