export type Validator = (values: { [key: string]: string }) => Map<string, string | null>;

export const validator: Validator = (values) => {
  const regName = /^(?!\d+$)[^(~!@#$%*&()_—+=|:;"'`<>,.?\\/\\^\s)]{1,30}$/;
  const FirstPartOfRegExp = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))/;
  const SecondPartOfRegExp =
    /@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regMail = new RegExp(`${FirstPartOfRegExp.source}${SecondPartOfRegExp.source}`);

  const nameValid = (val: string | undefined) => {
    if (val === undefined) return null;
    if (val.length === 0) return 'This field is required';
    if (regName.test(val)) return null;
    return 'Please enter a valid Name.';
  };
  const emailValid = (val: string | undefined) => {
    if (val === undefined) return null;
    if (val.length === 0) return 'This field is required';
    if (regMail.test(val) && val.length <= 30) return null;
    return 'Please enter a valid e-mail address.';
  };

  const resultValidate = new Map();
  resultValidate.set('firstName', nameValid(values.firstName));
  resultValidate.set('lastName', nameValid(values.lastName));
  resultValidate.set('email', emailValid(values.email));

  return resultValidate;
};
