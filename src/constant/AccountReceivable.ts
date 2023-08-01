import { AccountAvailableSubject } from "../types/AccountReceivable";

export const ACCOUNT_SUBJECT_SELECTIONS = ["SELL_PRICE", "BASE_PRICE"] as const;

const accountReceivableSubjectTypeAndText = ACCOUNT_SUBJECT_SELECTIONS.map(
  (subject) => {
    if (subject === "SELL_PRICE") return [subject, "Sell Price"];
    return [subject, "Base Price"];
  }
);

export const getAccountReceivableSubjectText = (
  subject?: AccountAvailableSubject | null
) => {
  return (
    accountReceivableSubjectTypeAndText.find((el) => el[0] === subject)?.[1] ||
    ""
  );
};

export const getAccountReceivableSubjectPriority = (text: string) => {
  return accountReceivableSubjectTypeAndText.findIndex((el) => el[1] === text);
};
