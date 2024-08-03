export function loadImage(src: string, createEvent?: Event) {
  const img = new Image();
  img.src = src; // 이미지 경로 설정
  img.onload = () => {
    createEvent && dispatchEvent(createEvent);
  };

  return img;
}
