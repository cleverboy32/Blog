export function createSpot (num: number) {
    const array: number[] = [];
    for (let i = 0; i < num; i++) {
        array.push(i);
    }
    return array;
}


export async function readFile (file?: File) {
    if (!file) {
        return void(0);
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result;
            resolve(content);
        };
        reader.onerror = (e) => {
            reject("File could not be read! Code " + e.target?.error?.code);
        };
        reader.readAsText(file);
    })
}




