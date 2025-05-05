import React, { useEffect, useState } from 'react';
import '../styles/chat.css';

const steps = [
  { id: 'nombre', pregunta: '¿Cómo quieres que te llame?' },
  {
    id: 'tono',
    pregunta: '¿Qué tono prefieres que use para hablarte?',
    opciones: ['Neutro', 'Poético', 'Amigable', 'Confianzudo', 'Chistoso'],
  },
];

const ChatOnboarding = () => {
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (stepIndex < steps.length) {
      setTyping(true);
      const timer = setTimeout(() => setTyping(false), 1500);
      return () => clearTimeout(timer);
    } else {
      // Cuando termina el onboarding, llama a LiryComposer
      fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responses),
      })
        .then((res) => res.json())
        .then((data) => {
          setChatLog((prev) => [...prev, `🌸 ${data.response}`]);
        });
    }
  }, [stepIndex]);

  const handleSubmit = () => {
    if (!userInput && !steps[stepIndex].opciones) return;
    const currentStep = steps[stepIndex];
    const respuesta = userInput || 'Respuesta';
    setChatLog((prev) => [...prev, `💬 ${respuesta}`]);
    setResponses((prev) => ({ ...prev, [currentStep.id]: respuesta }));
    setUserInput('');
    setStepIndex(stepIndex + 1);
  };

  const handleOptionClick = (option: string) => {
    const currentStep = steps[stepIndex];
    setChatLog((prev) => [...prev, `💬 ${option}`]);
    setResponses((prev) => ({ ...prev, [currentStep.id]: option }));
    setStepIndex(stepIndex + 1);
  };

  const currentStep = steps[stepIndex];

  return (
    <div className="chat-container">
      <div className="chat-bubble-container">
        {chatLog.map((msg, index) => (
          <div key={index} className="chat-bubble user">{msg}</div>
        ))}
        {stepIndex < steps.length && (
          <div className="chat-bubble system">
            {typing ? '⌛ Escribiendo...' : currentStep.pregunta}
          </div>
        )}
      </div>
      {!typing && currentStep && (
        <div className="chat-input-area">
          {currentStep.opciones ? (
            currentStep.opciones.map((opcion, i) => (
              <button key={i} onClick={() => handleOptionClick(opcion)}>{opcion}</button>
            ))
          ) : (
            <>
              <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Escribe tu respuesta..."
              />
              <button onClick={handleSubmit}>Enviar</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatOnboarding;
