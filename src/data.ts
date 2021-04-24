export interface User {
  id: string;
  name: string;
  gender: "man" | "woman";
}

export interface QueryRecord {
  id: string;
  uid: string;
  query: string;
}

export interface UserKeywords {
  uid: string;
  keyword: string;
  frequency: number;
}

export interface KeywordFrequency {
  keyword: string;
  frequency: number;
}

export interface KeywordLength {
  keywordLength: number;
  frequency: number;
}

export let PeopleBook: User[] = [
  { id: "one1", name: "OptimusPrime", gender: "man" },
  { id: "two2", name: "Robin", gender: "man" },
  { id: "three3", name: "Kjeld", gender: "man" },
  { id: "four4", name: "Selena Kyle", gender: "woman" },
  { id: "five5", name: "Janet Jackson", gender: "woman" },
];

export let EyegleSpies: QueryRecord[] = [
  { id: "01", uid: "one1", query: "how to get energon" },
  { id: "02", uid: "two2", query: "who is batman?" },
  { id: "03", uid: "three3", query: "how to open a safe" },
  { id: "04", uid: "four4", query: "how to open a safe" },
  { id: "05", uid: "five5", query: "what happened to the jackson5?" },

  { id: "11", uid: "one1", query: "is sam okay" },
  { id: "12", uid: "two2", query: "how did the joker get his scars?" },
  { id: "13", uid: "three3", query: "price of carlsberg" },
  { id: "14", uid: "four4", query: "is Bruce okay?" },
  { id: "15", uid: "five5", query: "is abc easy as 123?" },

  { id: "21", uid: "one1", query: "where to find a good mechanic" },
  { id: "22", uid: "two2", query: "how to stitch scars properly?" },
  { id: "23", uid: "three3", query: "is egon okay" },
  { id: "24", uid: "four4", query: "mechanic to fix bike" },
  { id: "25", uid: "five5", query: "how to ruin superbowl?" },

  { id: "31", uid: "one1", query: "directions to the great pyramid of giza" },
  { id: "32", uid: "two2", query: "serious leg workout routine" },
  { id: "33", uid: "three3", query: "is benny serious?" },
  { id: "34", uid: "four4", query: "serious whip parkour" },
  { id: "35", uid: "five5", query: "whips and leather" },

  { id: "41", uid: "one1", query: "is rust serious?" },
  { id: "42", uid: "two2", query: "eating chicken considered cannibalism if named after a bird?" },
  { id: "43", uid: "three3", query: "is elevated heart rate related to old age?" },
  { id: "44", uid: "four4", query: "how old is alfred?" },
  { id: "45", uid: "five5", query: "workout routines" },

  { id: "51", uid: "one1", query: "is oil leakage related to old age" },
  { id: "52", uid: "two2", query: "best circus eu" },
  { id: "53", uid: "three3", query: "circus bird" },
  { id: "54", uid: "four4", query: "cat eats bird" },
  { id: "55", uid: "five5", query: "Michael king of pop" },
];

export const calculateKeywords = (records: QueryRecord[]): KeywordLength[] => {
  const queries: string[] = records.map((record) => record.query);
  let keywords: KeywordLength[] = [];

  queries.forEach((query) => {
    //separate each query into words
    let wordsArr: string[] = [...query.split(" ")];

    wordsArr.forEach((word) => {
      //for each word get the index of the word from the keyword collection
      let keywordIndex: number = keywords.findIndex(
        (keyword) => keyword.keywordLength === word.length
      );

      //if the keyword is not found, add it
      if (keywordIndex === -1) keywords.push({ keywordLength: word.length, frequency: 1 });
      //if it's found then add +1 to frequency
      else keywords[keywordIndex].frequency++;
    });
  });

  return keywords.sort((a, b) => a.frequency - b.frequency);
};

export const calculateUserKeywords = (records: QueryRecord[]): UserKeywords[] => {
  const queries: string[] = records.map((record) => record.query);
  let keywords: UserKeywords[] = [];

  queries.forEach((query, i) => {
    //separate each query into words
    let wordsArr: string[] = [...query.split(" ")];

    wordsArr.forEach((word) => {
      //for each word get the index of the word from the keyword collection
      let keywordIndex: number = keywords.findIndex(
        (keyword) => keyword.uid === records[i].uid && keyword.keyword === word
      );

      //if the keyword is not found, add it
      if (keywordIndex === -1) keywords.push({ uid: records[i].uid, keyword: word, frequency: 1 });
      //if it's found then add +1 to frequency
      else keywords[keywordIndex].frequency++;
    });
  });

  return keywords.sort((a, b) => a.frequency - b.frequency);
};

export const calculateKeywordFrequency = (records: QueryRecord[]): KeywordFrequency[] => {
  const queries: string[] = records.map((record) => record.query);
  let keywords: KeywordFrequency[] = [];

  queries.forEach((query) => {
    //separate each query into words
    let wordsArr: string[] = [...query.split(" ")];

    wordsArr.forEach((word) => {
      //for each word get the index of the word from the keyword collection
      let keywordIndex: number = keywords.findIndex((keyword) => keyword.keyword === word);

      //if the keyword is not found, add it
      if (keywordIndex === -1) keywords.push({ keyword: word, frequency: 1 });
      //if it's found then add +1 to frequency
      else keywords[keywordIndex].frequency++;
    });
  });

  return keywords.sort((a, b) => a.frequency - b.frequency);
};
