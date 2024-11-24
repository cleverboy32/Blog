import { PageSize } from 'constant'


export function getDPI() {
    const tempDiv = document.createElement("div");
    tempDiv.style.width = "1in";
    tempDiv.style.visibility = "hidden";
    document.body.appendChild(tempDiv);
    const dpi = tempDiv.offsetWidth;
    document.body.removeChild(tempDiv);

    console.log(dpi, 'dpidpidpi')
    return dpi;
}


function mmToPixel(mm = 0, dpi: number) {
    // 1 inch = 25.4 mm
    const inches = mm / 25.4;
    const pixels = inches * dpi;

    console.log(pixels, 'pixel')
    return Math.floor(pixels);
}

export function pageSizeInPixels(pageSize: keyof typeof PageSize, customSize?: { height: number, width: number}) {
    const dpi = getDPI();

    let width_mm = PageSize[pageSize].width;
    let height_mm = PageSize[pageSize].height;

    if (customSize) {
        width_mm = customSize.width;
        height_mm = customSize.height;
    } else {
        width_mm = PageSize[pageSize].width;
        height_mm = PageSize[pageSize].height;
    }

    const width_px = mmToPixel(width_mm, dpi);
    const height_px = mmToPixel(height_mm, dpi);

    return { width: width_px, height: height_px };
}
