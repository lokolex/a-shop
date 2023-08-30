export const shortText = (text: string | undefined, limit: number) => {
  if (!text) {
    return;
  }

  if (text.length > limit) {
    const shortedText = text.substring(0, limit).concat('...');
    return shortedText;
  }
  return text;
};
