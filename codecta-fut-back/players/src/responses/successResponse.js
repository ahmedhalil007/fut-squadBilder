export const successResponse = (body) => {
    return {
        isBase64Encoded: false,
        statusCode: 200,
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
    };
}