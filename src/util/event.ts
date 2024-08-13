export const createEvent = (key: string) => {
  const ev = new Event(key);
  return ev;
};
