export const createEvent = (key: string) => {
  return new Event(key);
};

export const createCustomEvent = (key: string, detail: any) => {
  return new CustomEvent(key, { detail });
};
