export async function onRequestGet({ request }) {
  const incoming = new URL(request.url);
  const upstream = new URL(
    "https://primat.nu/api/v3/demo/products"
  );

  for (const [key, value] of incoming.searchParams) {
    upstream.searchParams.append(key, value);
  }

  try {
    const response = await fetch(upstream.toString(), {
      headers: {
        Accept: "application/json"
      }
    });

    return new Response(response.body, {
      status: response.status,
      headers: {
        "content-type":
          response.headers.get("content-type") ||
          "application/json",
        "cache-control": "no-store"
      }
    });
  } catch (error) {
    return Response.json(
      { error: "Kunde inte hämta priser just nu." },
      { status: 500 }
    );
  }
}
