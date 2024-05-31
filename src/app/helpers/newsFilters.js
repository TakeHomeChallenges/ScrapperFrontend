export const filterLongTitles = (entries) => {
    return entries.filter(entry => countWords(entry.title) > 5)
                  .sort((a, b) => b.comments - a.comments);
};

export const filterShortTitles = (entries) => {
    return entries.filter(entry => countWords(entry.title) <= 5)
                  .sort((a, b) => b.points - a.points);
};

const countWords = (str) => {
    return str.split(/\s+/)  // Split by any whitespace
              .filter(word => word.match(/^[a-zA-Z]+(?:['-][a-zA-Z]+)*$/)).length;
};
