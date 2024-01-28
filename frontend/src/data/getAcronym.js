export function getAcronym(inputString) {
  const words = inputString.split(" ");
  if(words.length===1){
    const acronym = words[0].slice(0,2).toUpperCase();
    return acronym;
  }
  const acronym = words[0][0].toUpperCase()+words[1][0].toUpperCase();

  return acronym;
}

