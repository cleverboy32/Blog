export function createSpot (num) {
    let array = [];
    for (let i = 0; i < num; i++) {
        array.push(i);
    }
    return array;
}

export default {
    createSpot: createSpot
}
