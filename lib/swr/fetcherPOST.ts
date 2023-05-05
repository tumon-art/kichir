/***
 * swr fetcher POST req funtion
 * @param url takes url
 * @param data take request body
 *
 */

export const fetcherPOST = (url: string, data: any) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .catch((err) => err);
