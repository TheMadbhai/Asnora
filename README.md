# Asnora – The Smart Lecture Companion

A modern, minimal web application that helps students instantly understand lecture transcripts using AI-powered analysis.

## ✨ Features

- 📝 **Paste or upload** lecture transcripts (.txt files)
- 🤖 **AI-powered analysis** via n8n + OpenAI webhook
- 🧾 **Simplified summaries** for easy understanding
- 📚 **Important references** extraction
- 🎓 **Smart flashcards** generation for studying
- ✉️ **Email delivery** (optional)
- 🎨 **Minimal black & white** design
- 📱 **Fully responsive** layout

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd asnora
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

## 🛠️ Built With

- **React** - UI framework
- **Vite** - Build tool
- **n8n** - Workflow automation
- **OpenAI** - AI processing

## 📦 Project Structure

```
asnora/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── InputSection.jsx
│   │   ├── LoadingState.jsx
│   │   ├── ResultsSection.jsx
│   │   ├── Toast.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Design

- **Theme**: Minimal black & white interface
- **Typography**: Inter font family
- **Layout**: Center-aligned with generous whitespace
- **Animations**: Smooth fade-in transitions

## 🔌 API Integration

The app connects to an n8n webhook that processes lecture transcripts and returns:

```json
{
  "summary": "Simplified explanation text",
  "references": ["Name1", "Book2", "Org3"],
  "flashcards": [{"Q": "Question?", "A": "Answer"}, ...]
}
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 💡 Usage

1. Paste your lecture transcript or upload a .txt file
2. (Optional) Enter your email address
3. Click "Generate Summary" or press Ctrl + Enter
4. View your AI-generated summary, references, and flashcards!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

ISC

## 👥 Team

Built with ❤️ using n8n + OpenAI | Team Asnora
