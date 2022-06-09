export const getData = async <T>(
  url: string,
  cartTotal: number,
  secret: string | null
)
: Promise<T> => {
  const res = await fetch(url, {
    method: 'Post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      amount: cartTotal*100,
      secret: secret
    })
  });

  const {client_secret: clientSecret} = await res.json();
  return await clientSecret;
}