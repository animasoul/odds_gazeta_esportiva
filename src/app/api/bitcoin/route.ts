export async function GET() {
  const res = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json", {
    next: { revalidate: 10 },
  });
  const data = await res.json();

  return Response.json(data);
}
