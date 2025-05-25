function handler(event) {
  const request = event.request;
  const headers = request.headers;

  if (headers.host.value.endsWith('.cloudfront.net')) {
    return {
      statusCode: 403,
      statusDescription: "Forbidden",
      body: "Access denied",
    };
  }

  return request;
}