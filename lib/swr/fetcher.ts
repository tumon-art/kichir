/***
 * swr fetcher POST req funtion
 * @param {string} url takes url
 * @param {any} data take request body
 *
 */

export const fetcher = (url: string, data: any) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => r.json());
