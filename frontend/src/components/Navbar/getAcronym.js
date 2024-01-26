export function getAcronym(inputString) {
  const words = inputString.split(" ");
  const acronym = words[0][0].toUpperCase()+words[1][0].toUpperCase();

  return acronym;
}

