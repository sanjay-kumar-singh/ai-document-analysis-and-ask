class OllamaService {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint.replace(/\/$/, '');
    }

    async askQuestion(question, documentContent = '') {
        const prompt = documentContent
            ? `You are answering questions from the provided document. Use only the document content below.\n\nDocument content:\n${documentContent}\n\nQuestion: ${question}\n\nAnswer briefly and directly.`
            : `Answer the following question briefly and directly.\n\nQuestion: ${question}`;

        console.log('Sending prompt to Ollama API:', prompt);
        const response = await fetch(`${this.apiEndpoint}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gemma4:cloud',
                prompt,
                stream: false,
            }),
        });
        console.log('Received response from Ollama API:', response);

        const text = await response.text();
        if (!text) {
            return { answer: 'No answer returned.' };
        }

        try {
            const data = JSON.parse(text);
            return {
                answer: data?.response || data?.message?.content || 'No answer returned.',
            };
        } catch (error) {
            return { answer: text };
        }
    }
}

module.exports = OllamaService;