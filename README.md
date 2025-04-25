# Gemini Integration

A Node.js-based API service that integrates with the Gemini Pro LLM (via Google AI) to process chat messages using Google's `@google/generative-ai` SDK.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js v18+ (recommended)
- npm (comes with Node.js)
- A valid Google AI API Key with access to Gemini Pro

### Installation

1. **Clone this repository**:

   ```bash
   git clone https://github.com/your-username/gemini-integration.git
   cd gemini-integration
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file at the root of the project with the following content:

   ```env
   GEMINI_API_KEY=your_google_generative_ai_key_here
   ```

   > 🔒 Never commit your `.env` file to version control.

---

## 🧪 Running the Project

Start the development server:

```bash
node index.js
```

The server will be available at [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Project Structure

```
gemini-integration/
├── .env                   # Environment variables (you need to create this)
├── index.js               # Entry point for Express server
├── package.json
└── README.md              # You're here
```

---

## 🔐 Environment Variables

| Key             | Description                          |
|----------------|--------------------------------------|
| `GEMINI_API_KEY`| Your Google Generative AI API key    |

You can get your API key from: [Google AI Studio](https://makersuite.google.com/app)

---

## 📄 License

MIT License. See `LICENSE` for more information.

---
