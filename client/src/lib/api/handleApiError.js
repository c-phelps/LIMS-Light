// consistent error handler for api layer
async function handleError(response, fnName) {
  if (response.ok) return true;
  let message = "Unknown error";

  try {
    const data = await response.json();
    message = data.message || message;
  } catch (e) {}
  throw new Error(`${fnName} failed: ${message}`);
}
module.exports = {
  handleError,
};
