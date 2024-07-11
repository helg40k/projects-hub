// see https://next-auth.js.org/configuration/pages
const errorMap:any = {
  // Error page is needed
  Configuration: 'There is a problem with the server configuration. Please contact with the Administrator.',
  AccessDenied: "I'm sorry, the access is denied. Please contact with the Administrator.",
  Verification: 'A server error is occurred, please try again later.',
  Default: 'A server error is occurred. Please contact with the Administrator.',

  // Sign-in page is needed
  OAuthSignin: 'There is a problem with the server configuration. Please contact with the Administrator.',
  OAuthCallback: 'A server error is occurred, please try again later or contact with the Administrator.',
  OAuthCreateAccount: 'Cannot create a new account, please try again later or contact with the Administrator.',
  EmailCreateAccount: 'Cannot create a new account, please try again later or contact with the Administrator.',
  Callback: 'The access was restricted.',
  OAuthAccountNotLinked: 'Such email is already used, but not with this account. Please contact with the Administrator.',
  EmailSignin: 'Sending the e-mail with the verification token failed. Please try again later.',
  CredentialsSignin: "A server error is occurred. Please contact with the Administrator.",
  SessionRequired: 'The unauthorized access was occurred. Please contact with the Administrator.'
}

const getErrorMessage = (errorCode:string|undefined|null):string|undefined => {
  if (!errorCode) {
    return undefined;
  }
  return errorMap[errorCode];
}

export default getErrorMessage;
