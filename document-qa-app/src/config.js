const config = {
    PORT: process.env.PORT || 3000,
    OLLAMA_API_URL: process.env.OLLAMA_API_URL || 'http://localhost:11434/api',
    UPLOADS_DIR: './uploads',
    ALLOWED_FILE_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

module.exports = config;