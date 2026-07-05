# Document QA Application

This project is a Node.js application that allows users to upload PDF or DOC files, ask questions related to the content of the documents, and receive responses using the local Ollama AI API.

## Features

- Upload PDF and DOC files
- Ask questions related to the uploaded documents
- Receive AI-generated responses based on document content

## Project Structure

```
document-qa-app
├── src
│   ├── app.js                  # Entry point of the application
│   ├── controllers
│   │   └── documentController.js # Handles document uploads and queries
│   ├── routes
│   │   └── documentRoutes.js    # Sets up routes for document operations
│   ├── services
│   │   └── ollamaService.js      # Interacts with the local Ollama AI API
│   ├── middleware
│   │   └── uploadMiddleware.js    # Middleware for handling file uploads
│   ├── utils
│   │   └── parser.js             # Utility functions for parsing documents
│   └── config.js                 # Configuration settings for the application
├── uploads                        # Directory for temporarily storing uploaded documents
├── package.json                   # npm configuration file
├── .gitignore                     # Specifies files to be ignored by Git
└── README.md                      # Documentation for the project
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd document-qa-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables as needed in a `.env` file.

## Usage

1. Start the application:
   ```
   npm start
   ```

2. Access the application in your browser at `http://localhost:3000`.

3. Use the interface to upload a document and ask questions related to its content.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.