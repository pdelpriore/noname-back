export const ErrorCodes = {
  "23505-email": "UNIQUE_EMAIL",
};

export enum ErrorResponse {
  SOMETHING_WRONG = "SOMETHING_WRONG",
  UNAUTHORIZED = "UNAUTHORIZED",
  ISEMAIL_EMAIL = "ISEMAIL_EMAIL",
  MINLENGTH_NAME = "MINLENGTH_NAME",
  MINLENGTH_PASSWORD = "MINLENGTH_PASSWORD",
  MAXLENGTH_NAME = "MAXLENGTH_NAME",
  UNIQUE_EMAIL = "UNIQUE_EMAIL",
  WRONG_PASSWORD = "WRONG_PASSWORD",
}

interface IErrorTypes {
  [key: string]: string;
}

export const ErrorTypes: IErrorTypes = {
  [ErrorResponse.SOMETHING_WRONG]: "Cos poszlo nie tak, sprobuj ponownie",
  [ErrorResponse.UNAUTHORIZED]: "Nie masz autoryzacji",
  [ErrorResponse.ISEMAIL_EMAIL]: "Niepoprawny adres email.",
  [ErrorResponse.MINLENGTH_NAME]:
    "Nazwa uzytkownika musi zawierac conajmniej 5 znakow",
  [ErrorResponse.MINLENGTH_PASSWORD]: "Haslo musi zawierac conajmniej 5 znakow",
  [ErrorResponse.MAXLENGTH_NAME]:
    "Nazwa uzytkownika nie moze zawierac wiecej niz 20 znakow",
  [ErrorResponse.UNIQUE_EMAIL]: "Podany adres email jest juz zajety",
  [ErrorResponse.WRONG_PASSWORD]: "Nieprawidlowe haslo",
};
