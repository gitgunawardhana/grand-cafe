function isValueInSessionStorage(keyToCheck: string) {
  return sessionStorage.getItem(keyToCheck) !== null;
}

export { isValueInSessionStorage };
