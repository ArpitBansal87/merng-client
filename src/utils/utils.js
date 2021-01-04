export function convertQueryString(url) {
  const arr = url.slice(1).split(/&|=/);
  let params = {};

  for (let i = 0; i < arr.length; i += 2) {
    const key = arr[i],
      value = arr[i + 1];
    params[key] = value;
  }
  return params;
}
