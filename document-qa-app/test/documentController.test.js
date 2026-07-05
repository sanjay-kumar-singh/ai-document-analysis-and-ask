const test = require('node:test');
const assert = require('node:assert/strict');

const DocumentController = require('../src/controllers/documentController');

test('askQuestion uses the Ollama service when available', async () => {
  const controller = new DocumentController();
  controller.ollamaService = {
    askQuestion: async (question) => ({ answer: `answer for ${question}` }),
  };

  const req = {
    body: { question: 'What is this document about?' },
    app: { locals: { documentContent: 'Some uploaded content.' } },
  };

  const res = {
    payload: null,
    statusCode: null,
    json(payload) {
      this.payload = payload;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
  };

  await controller.askQuestion(req, res);

  assert.equal(res.statusCode, null);
  assert.equal(res.payload.answer, 'answer for What is this document about?');
});
