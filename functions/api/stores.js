export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const place = url.searchParams.get("place");

  if (!place) {
    return Response.json(
      { error: "Ange ort eller postnummer." },
      { status: 400 }
    );
  }

  const primatUrl =
    "https://primat.nu/api/v3/demo/stores/resolve?place=" +
    encodeURIComponent(place);

  try {
    const response = await fetch(primatUrl);

    const data = await response.json();

    return Response.json(data, {
      status: response.status,
      headers: {
        "Cache-Control": "public, max-age=3600"
      }
    });
  } catch (error) {
    return Response.json(
      { error: "Kunde inte hämta butiker just nu." },
      { status: 500 }
    );
  }
}
