# Text Summarizer

A modern web application built with React and Vite that uses Hugging Face's BART (Bidirectional and Auto-Regressive Transformers) model to generate concise summaries of long text. This application provides an intuitive interface for users to input text and receive AI-powered summaries instantly.

## 🚀 Features

- **AI-Powered Summarization**: Utilizes Facebook's BART-large-CNN model for high-quality text summarization
- **Modern UI/UX**: Clean, responsive design with a split-screen layout for input and output
- **Real-time Processing**: Fast summarization with loading states and error handling
- **CORS Handling**: Smart proxy configuration for seamless API integration in development
- **Error Management**: Comprehensive error handling with user-friendly messages
- **Environment-based Configuration**: Secure API key management using environment variables

## 🛠️ Technologies Used

- **React 19.2.0** - Modern UI library for building interactive interfaces
- **Vite 7.2.4** - Next-generation frontend build tool for fast development
- **Hugging Face Inference API** - Access to pre-trained BART-large-CNN model
- **CSS3** - Custom styling for a polished user experience

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Hugging Face Account** with an API token

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Algorithm-bot/Web_Tech_LAB_4.git
   cd Web_Tech_LAB_4/text-summarizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `text-summarizer` directory:
   ```env
   VITE_HUGGING_FACE_TOKEN=your_hugging_face_api_token_here
   ```
   
   To get your Hugging Face API token:
   - Go to [Hugging Face Settings](https://huggingface.co/settings/tokens)
   - Create a new token with "Read" permissions
   - Copy the token and paste it in your `.env` file

## 🚀 Usage

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - The application will be available at `http://localhost:5173` (or the port shown in terminal)

3. **Use the application**
   - Paste or type your text in the left panel
   - Click the "Summarize Text" button
   - View the generated summary in the right panel

## 📁 Project Structure

```
text-summarizer/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── .env                 # Environment variables (not committed)
├── .gitignore          # Git ignore rules
├── vite.config.js      # Vite configuration with proxy setup
├── package.json        # Project dependencies and scripts
└── README.md          # Project documentation
```

## 🔌 API Configuration

This application uses the Hugging Face Inference API with the following configuration:

- **Model**: `facebook/bart-large-cnn`
- **Endpoint**: `https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn`
- **Method**: POST
- **Authentication**: Bearer token (Hugging Face API token)

### Development Mode

In development, the application uses a Vite proxy to handle CORS issues. The proxy configuration is set up in `vite.config.js` to route requests through the development server.

## 📝 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🎨 Features in Detail

### Text Input
- Large textarea for comfortable text input
- Real-time text editing
- Placeholder text for user guidance

### Summarization
- Automatic text processing
- Loading indicators during API calls
- Error messages for failed requests
- Support for various text lengths

### Error Handling
- Network error detection
- API error messages
- Model loading status (503 errors)
- Rate limiting notifications
- Invalid API key detection

## 🔒 Security Notes

- **Never commit your `.env` file** - It contains sensitive API tokens
- The `.env` file is already included in `.gitignore`
- Always use environment variables for API keys
- Keep your Hugging Face API token secure and private

## 🐛 Troubleshooting

### Common Issues

1. **404 Error**: Ensure you're using the correct API endpoint and model name
2. **401 Error**: Check that your Hugging Face API token is valid and has proper permissions
3. **CORS Error**: The development proxy should handle this automatically. Restart the dev server if issues persist
4. **503 Error**: The model is loading. Wait a moment and try again
5. **429 Error**: Rate limit exceeded. Wait before making another request

## 📚 Resources

- [Hugging Face Documentation](https://huggingface.co/docs)
- [BART Model Card](https://huggingface.co/facebook/bart-large-cnn)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)

## 👤 Author

**Algorithm-bot**

## 📄 License

This project is part of a Web Technology Lab assignment.

## 🙏 Acknowledgments

- Hugging Face for providing the BART model and Inference API
- Facebook AI Research for developing the BART model
- React and Vite communities for excellent tooling

---

**Note**: This application requires an active internet connection and a valid Hugging Face API token to function.
