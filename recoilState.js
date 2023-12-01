import { atom } from "recoil";

export const quotesState = atom({
  key: "Quotes",
  default: [
    {
      quote:
        "hold the quote, press the checkbox on the left and press the trash icon to delete it",
      author: "ali",
    },
  ],
});
