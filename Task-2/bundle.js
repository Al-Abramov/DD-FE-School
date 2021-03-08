//task 2.1
function sort(a, b) {
    return a.filter(i => !b.includes(i));
}

console.log(sort([1,2,2,2,3],[2, 9, 99, -1]));


//Task 2.2

function alphabetPosition(str) {
    let sort = str.toLowerCase().split('').filter(i => i > 'a' && i < 'z');

return sort.map(i => i.charCodeAt() - 'a'.charCodeAt() + 1);
}

console.log(alphabetPosition("The sunset sets at twelve o' clock."))


//task 2.3
function powSplit(num) {
    let res = num.toString().split('').map(a => a * a).join('');
    return res;
}

console.log(powSplit(9119));

