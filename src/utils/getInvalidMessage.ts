export const getInvalidMessage = (element: HTMLInputElement) => {
  if (element.validity.valueMissing) {
    return "This field is required";
  } else if (element.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    return `Entered value is not the type of ${element.type}`;
  } else if (element.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    return `Entered value should be at least ${element.minLength} characters`;
  } else if (element.validity.tooLong) {
    // If the data is too short,
    // display the following error message.
    return `Entered value should be at most ${element.maxLength} characters`;
  } else {
    return "Entered value is invalid";
  }
};
