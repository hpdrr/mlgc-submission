const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { confidenceScore, label, explanation, suggestion } =
    await predictClassification(model, image);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: label,
    explanation: explanation,
    suggestion: suggestion,
    confidence: confidenceScore,
    createdAt: createdAt,
  };

  const response = h.response({
    status: "success",
    message:
      confidenceScore > 99
        ? "Model is predicted succesfully."
        : "Model is predicted successfully but under the threshold. Please use the correct picture",
    data,
  });
  response.code(201);
  return response;
}

async function getHistoriesHandler(request, h) {}
module.exports = { postPredictHandler, getHistoriesHandler };
