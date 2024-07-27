export function loadImage(src : string) {
    const img = new Image();
    img.src = src; // 이미지 경로 설정

    return img;
}
