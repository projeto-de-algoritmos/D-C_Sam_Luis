function mergeAndCount(left, right) {
    let i = 0, j = 0;
    let temp = []
    let count = left.count + right.count
    while(i < left.array.length && j < right.array.length) {
        if(left.array[i] > right.array[j]) {
            temp.push(right.array[j]);
            j++;
            count += left.array.length - i;
          } else {
            temp.push(left.array[i]);
            i++
          }
    }
    temp = [...temp, ...left.array.slice(i), ...right.array.slice(j)]
    return {array: temp, count }
}

function sortAndCount(obj) {
    if(obj.array.length === 1) {
        return {count: 0, array: obj.array};
    }

    let middle = Math.floor(obj.array.length/2)
    let left = {array: obj.array.slice(0, middle), count: obj.count}
    let right = {array: obj.array.slice(middle), count: obj.count}

    left = sortAndCount(left);
    right = sortAndCount(right);

    obj = mergeAndCount(left, right);

    return obj;
}

// let lol = [3,1,2]
// let a = [1,2,3]
// let b = [3,2,1]
// console.log(sortAndCount({array: lol, count: 0}))
// console.log(mergeAndCount({array: a, count: 0}, {array: b, count: 0}));