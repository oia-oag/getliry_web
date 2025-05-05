
import React, { useState, useEffect } from 'react';

const ChatOnboarding = () => {
  const steps = [
    { id: 'nombre', pregunta: '¿Cómo quieres que te llame?', key: 'nombre' },
    {
      id: 'tono',
      pregunta: '¿Qué tono prefieres que use para hablarte?',
      key: 'tono',
      opciones: ['Neutro', 'Poético', 'Amigable', 'Confianzudo', 'Chistoso']
    }
  ];

  const [chatLog, setChatLog] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState({});

  useEffect(() => {
    if (stepIndex < steps.length) {
      setTyping(true);
      const timer = setTimeout(() => setTyping(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [stepIndex]);

  const handleSubmit = () => {
    if (!userInput && !steps[stepIndex].opciones) return;

    const currentStep = steps[stepIndex];
    const answer = userInput || selectedOption;

    setChatLog([...chatLog, { sender: 'user', text: answer }]);
    setResponses({ ...responses, [currentStep.key]: answer });
    setUserInput('');
    setSelectedOption('');
    setStepIndex(stepIndex + 1);
  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setTimeout(() => {
      handleSubmit();
    }, 600);
  };

  return (
    <div className="chat-container">
      {chatLog.map((msg, idx) => (
        <div key={idx} className={\`bubble \${msg.sender}\`}>{msg.text}</div>
      ))}

      {typing && <div className="bubble assistant">Liry está escribiendo...</div>}

      {!typing && stepIndex < steps.length && (
        <>
          <div className="bubble assistant">{steps[stepIndex].pregunta}</div>
          {steps[stepIndex].opciones ? (
            <div className="options">
              {steps[stepIndex].opciones.map((op, i) => (
                <button key={i} onClick={() => handleOptionClick(op)}>{op}</button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="Escribe aquí..."
            />
          )}
        </>
      )}
    </div>
  );
};

export default ChatOnboarding;
