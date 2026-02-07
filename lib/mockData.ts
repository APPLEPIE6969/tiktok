export const studySets = [
  {
    id: "1",
    title: "Spanish Basics",
    description: "Common phrases and vocabulary for beginners.",
    termCount: 20,
    author: "Jules",
    updatedAt: "2 days ago",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
  },
  {
    id: "2",
    title: "React Hooks",
    description: "Deep dive into useState, useEffect, and custom hooks.",
    termCount: 15,
    author: "Jules",
    updatedAt: "5 hours ago",
    color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
  },
  {
    id: "3",
    title: "History of AI",
    description: "From Turing to Transformers.",
    termCount: 12,
    author: "Jules",
    updatedAt: "1 week ago",
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
  },
  {
    id: "4",
    title: "Molecular Biology",
    description: "Cell structure, DNA replication, and protein synthesis.",
    termCount: 34,
    author: "Jules",
    updatedAt: "3 days ago",
    color: "bg-green-500/10 text-green-500 border-green-500/20"
  },
]

export const flashcards: Record<string, { term: string; definition: string }[]> = {
  "1": [
    { term: "Hola", definition: "Hello" },
    { term: "Adiós", definition: "Goodbye" },
    { term: "Por favor", definition: "Please" },
    { term: "Gracias", definition: "Thank you" },
    { term: "Buenos días", definition: "Good morning" },
    { term: "Buenas noches", definition: "Good night" },
  ],
  "2": [
    { term: "useState", definition: "A Hook that lets you add React state to function components." },
    { term: "useEffect", definition: "A Hook that lets you perform side effects in function components." },
    { term: "useContext", definition: "A Hook that lets you subscribe to React context without nesting." },
    { term: "useReducer", definition: "A Hook that is an alternative to useState for complex state logic." },
  ],
  "3": [
    { term: "Alan Turing", definition: "Father of theoretical computer science and artificial intelligence." },
    { term: "Neural Network", definition: "A series of algorithms that endeavors to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates." },
    { term: "Machine Learning", definition: "A subset of AI that involves training algorithms to make predictions or decisions based on data." },
  ],
  "4": [
    { term: "Mitochondria", definition: "Powerhouse of the cell." },
    { term: "Nucleus", definition: "Control center of the cell containing DNA." },
  ]
}

export const quizzes: Record<string, any[]> = {
  "1": [
      {
          id: "q1",
          question: "What does 'Hola' mean?",
          options: ["Hello", "Goodbye", "Please", "Thank you"],
          correctAnswer: "Hello"
      },
      {
          id: "q2",
          question: "How do you say 'Please' in Spanish?",
          options: ["Hola", "Adiós", "Por favor", "Gracias"],
          correctAnswer: "Por favor"
      },
      {
          id: "q3",
          question: "Translate 'Good morning'.",
          options: ["Buenas noches", "Buenos días", "Adiós", "Hasta luego"],
          correctAnswer: "Buenos días"
      }
  ],
    "2": [
      {
          id: "q1",
          question: "Which hook is used for side effects?",
          options: ["useState", "useEffect", "useContext", "useReducer"],
          correctAnswer: "useEffect"
      },
       {
          id: "q2",
          question: "Which hook provides a way to pass data through the component tree?",
          options: ["useState", "useEffect", "useContext", "useRef"],
          correctAnswer: "useContext"
      }
  ],
    "3": [
      {
          id: "q1",
          question: "Who is considered the father of AI?",
          options: ["Elon Musk", "Alan Turing", "Bill Gates", "Steve Jobs"],
          correctAnswer: "Alan Turing"
      },
      {
          id: "q2",
          question: "What mimics the human brain in AI?",
          options: ["Database", "Neural Network", "Server", "Algorithm"],
          correctAnswer: "Neural Network"
      }
  ],
  "4": [
      {
          id: "q1",
          question: "What is the powerhouse of the cell?",
          options: ["Nucleus", "Ribosome", "Mitochondria", "Cytoplasm"],
          correctAnswer: "Mitochondria"
      }
  ]
}
