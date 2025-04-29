"use client";

import { useState } from "react";
import Link from "next/link";

// TYPES
type NormalQuestion = {
  type: "normal";
  realImg: string;
  aiImg: string;
  isRealLeft: boolean;
};

type SpecialQuestion = {
  type: "special";
  img: string;
  isReal: boolean;
};

type Question = NormalQuestion | SpecialQuestion;

// COMPOSANT PRINCIPAL
export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"funfact" | "artip" | null>(null);

  // DONNÉES
  const funFacts = [
    "En 2018, un tableau généré par IA a été vendu pour 432 500$ (Portrait d’Edmond de Belamy).",
    "La génération d’un Starter Pack IA consomme plusieurs litres d’eau.",
    "Hayao Miyazaki dénonçait dès 2013 les dangers de 'machines qui dessinent'.",
    "ChatGPT traite plus d’un milliard de requêtes par jour pour 400M d’utilisateurs.",
    "D'ici 2030, la consommation d'énergie des datas centers va doubler.",
    "Une vraie photo d'un flamant rose a gagné un concours car elle semblait générée par IA.",
    "Boris Eldagsen a gagné un concours photo avec une œuvre IA mais a refusé la récompense.",
    "L'IA peine à comprendre le mouvement logique dans une armure de jeu vidéo.",
    "Le regard et les mains sont souvent déformés dans les œuvres IA.",
    "Les galeries IA mélangent souvent plusieurs styles incohérents."
  ];

  const artips = [
    "Regardez les mains : souvent l'IA génère trop ou pas assez de doigts.",
    "Les yeux peuvent paraître vides ou étranges sur les images IA.",
    "Le design logique (mouvements, armures) est souvent absent chez l'IA.",
    "L'intention narrative est souvent inexistante dans les images IA.",
    "Surveillez un éclairage trop uniforme sur les œuvres IA.",
    "Les styles graphiques sont mélangés sans logique.",
    "Plus vous regardez longtemps, plus vous voyez des défauts sur une image IA.",
    "Les contrastes sont souvent mal gérés dans les images IA.",
    "Les personnages secondaires sont souvent monstrueux.",
    "Les émotions complexes sont très mal retranscrites par l'IA."
  ];

  // QUESTIONS
  const normalQuestions: NormalQuestion[] = [
    { type: "normal", realImg: "/images/Vraieoeuvre1.png", aiImg: "/images/Fausseoeuvre1.png", isRealLeft: true },
    { type: "normal", realImg: "/images/Vraieoeuvre2.png", aiImg: "/images/Fausseoeuvre2.png", isRealLeft: false },
    { type: "normal", realImg: "/images/Vraieoeuvre3.png", aiImg: "/images/Fausseoeuvre3.png", isRealLeft: true },
    { type: "normal", realImg: "/images/Vraieoeuvre4.png", aiImg: "/images/Fausseoeuvre4.png", isRealLeft: false },
    { type: "normal", realImg: "/images/Vraieoeuvre5.png", aiImg: "/images/Fausseoeuvre5.png", isRealLeft: true },
    { type: "normal", realImg: "/images/Vraieoeuvre6.png", aiImg: "/images/Fausseoeuvre6.png", isRealLeft: false },
    { type: "normal", realImg: "/images/Vraieoeuvre7.png", aiImg: "/images/Fausseoeuvre7.png", isRealLeft: true },
  ];

  const specialQuestions: SpecialQuestion[] = [
    { type: "special", img: "/images/VraiSpeciale1.png", isReal: true },
    { type: "special", img: "/images/VraiSpeciale2.png", isReal: true },
    { type: "special", img: "/images/FauxSpeciale1.png", isReal: false },
  ];

  const questions: Question[] = [...normalQuestions, ...specialQuestions];

  // FONCTIONS
  const getRandomFunFact = () => {
    return funFacts[Math.floor(Math.random() * funFacts.length)];
  };

  const getRandomArtip = () => {
    return artips[Math.floor(Math.random() * artips.length)];
  };

  const handleAnswer = (isCorrect: boolean) => {
    setIsCorrectAnswer(isCorrect);
    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback(getRandomFunFact());
      setFeedbackType("funfact");
    } else {
      setFeedback(getRandomArtip());
      setFeedbackType("artip");
    }
    setAnswered(true);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setIsCorrectAnswer(null);
      setFeedback("");
      setFeedbackType(null);
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    window.location.reload();
  };

  const current = questions[currentQuestion];

  return (
    <main className="quiz">
      <header className="quizHeader">
        <Link href="/">
          <button className="homeButton">🏠 Retour Accueil</button>
        </Link>
      </header>

      {!finished ? (
        <section className="quizSection">
          <h2 className="quizQuestionTitle">Question {currentQuestion + 1} / {questions.length}</h2>
          <p className="quizSubTitle">
            {current.type === "normal" ? "Quelle est la vraie œuvre ?" : "Cette œuvre est-elle humaine ou générée par IA ?"}
          </p>

          {current.type === "normal" ? (
            <div className="imagesContainer">
              <img
                src={current.isRealLeft ? current.realImg : current.aiImg}
                alt="Choix gauche"
                onClick={() => handleAnswer(current.isRealLeft)}
                className="quizImage"
              />
              <img
                src={!current.isRealLeft ? current.realImg : current.aiImg}
                alt="Choix droite"
                onClick={() => handleAnswer(!current.isRealLeft)}
                className="quizImage"
              />
            </div>
          ) : (
            <div className="specialImageContainer">
              <img src={current.img} alt="Oeuvre spéciale" className="quizImage" />
              <div className="specialButtons">
                <button className="choiceButton" onClick={() => handleAnswer(current.isReal)}>Vraie œuvre</button>
                <button className="choiceButton" onClick={() => handleAnswer(!current.isReal)}>Œuvre IA</button>
              </div>
            </div>
          )}

          {answered && (
            <>
              <div className="feedback fade-in">
                {isCorrectAnswer !== null && (
                  <div style={{ color: isCorrectAnswer ? "#22c55e" : "#ef4444", fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1rem" }}>
                    {isCorrectAnswer ? "✅ Bonne réponse !" : "❌ Mauvaise réponse."}
                  </div>
                )}
                <strong>{feedbackType === "funfact" ? "FUN FACT :" : "ARTIPS :"}</strong> {feedback}
              </div>
              <div className="nextButtonContainer">
                <button className="nextButton" onClick={nextQuestion}>➡️ Question suivante</button>
              </div>
            </>
          )}
        </section>
      ) : (
        <section className="resultSection">
          <h2 className="resultTitle">Votre Score : {score} / {questions.length}</h2>
          <p className="resultComment">
            {score <= 4 && "Ouch ! Tu peux progresser..."}
            {score >= 5 && score <= 7 && "Pas mal ! Tu commences à faire la différence."}
            {score >= 8 && score <= 9 && "Très bien joué ! Ton œil est presque infaillible."}
            {score === 10 && "Parfait ! Tu es un expert de l'art face à l'IA !"}
          </p>

          <div className="buttonsFinal">
            <button className="startButton" onClick={restartQuiz}>🔄 Rejouer</button>
            <Link href="/remerciements">
              <button className="startButton">🏁 Finir le Test</button>
            </Link>
          </div>
        </section>
      )}

      {/* CSS */}
      <style jsx>{`
        html, body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background: linear-gradient(to bottom right, #8b5cf6, #a78bfa);
          color: white;
          text-align: center;
          min-height: 100vh;
          overflow-x: hidden;
        }
        .quizHeader {
          text-align: left;
          padding: 1rem;
        }
        .homeButton {
          background: #facc15;
          color: #1e1b4b;
          font-weight: bold;
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          cursor: pointer;
        }
        .quizSection {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .imagesContainer, .specialImageContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }
        .quizImage {
          width: 280px;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.3s;
        }
        .quizImage:hover {
          transform: scale(1.05);
        }
        .specialButtons {
          margin-top: 1rem;
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .choiceButton {
          background: #facc15;
          color: #1e1b4b;
          font-weight: bold;
          padding: 1rem 2rem;
          border: none;
          border-radius: 10px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: background 0.3s;
        }
        .choiceButton:hover {
          background: #fde68a;
        }
        .feedback {
          margin-top: 2rem;
          padding: 1.2rem;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.5);
          max-width: 700px;
          animation: fadeIn 0.8s ease forwards;
        }
        .nextButtonContainer {
          margin-top: 3rem;
          text-align: center;
        }
        .nextButton {
          background: #22c55e;
          color: white;
          font-weight: bold;
          padding: 1rem 2rem;
          border: none;
          border-radius: 10px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: background 0.3s;
        }
        .nextButton:hover {
          background: #16a34a;
        }
        .resultSection {
          margin-top: 5rem;
        }
        .buttonsFinal {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 2rem;
          align-items: center;
        }
        .startButton {
          background: #facc15;
          color: #1e1b4b;
          font-weight: bold;
          padding: 1rem 2rem;
          border: none;
          border-radius: 10px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: background 0.3s;
        }
        .startButton:hover {
          background: #fde68a;
        }
        .quizQuestionTitle {
          font-size: 2.5rem;
          font-weight: bold;
          background: linear-gradient(to right, #8b5cf6, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }
        .quizSubTitle {
          font-size: 1.8rem;
          color: #facc15;
          margin-bottom: 2rem;
        }
        .resultTitle {
          font-size: 3rem;
          font-weight: bold;
          background: linear-gradient(to right, #8b5cf6, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 2rem;
          text-align: center;
        }
        .resultComment {
          font-size: 1.5rem;
          margin-top: 1rem;
          text-align: center;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive mobile */
        @media (max-width: 600px) {
          .quizImage {
            width: 80%;
          }
          .choiceButton {
            font-size: 1rem;
            padding: 0.8rem 1.5rem;
          }
          .startButton {
            width: 80%;
          }
          .nextButtonContainer {
            text-align: center;
          }
        }
      `}</style>
    </main>
  );
}






