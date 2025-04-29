"use client";

import { useState } from "react";
import Link from "next/link";

// Types
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

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"funfact" | "artip" | null>(
    null
  );

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
    "Les galeries IA mélangent souvent plusieurs styles incohérents.",
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
    "Les émotions complexes sont très mal retranscrites par l'IA.",
  ];

  const questions: Question[] = [
    {
      type: "normal",
      realImg: "/images/Vraieoeuvre1.png",
      aiImg: "/images/Fausseoeuvre1.png",
      isRealLeft: true,
    },
    {
      type: "normal",
      realImg: "/images/Vraieoeuvre2.png",
      aiImg: "/images/Fausseoeuvre2.png",
      isRealLeft: false,
    },
    {
      type: "normal",
      realImg: "/images/Vraieoeuvre3.png",
      aiImg: "/images/Fausseoeuvre3.png",
      isRealLeft: true,
    },
    {
      type: "normal",
      realImg: "/images/Vraieoeuvre4.png",
      aiImg: "/images/Fausseoeuvre4.png",
      isRealLeft: false,
    },
    {
      type: "normal",
      realImg: "/images/Vraieoeuvre5.png",
      aiImg: "/images/Fausseoeuvre5.png",
      isRealLeft: true,
    },
    {
      type: "normal",
      realImg: "/images/Vraieoeuvre6.png",
      aiImg: "/images/Fausseoeuvre6.png",
      isRealLeft: false,
    },
    {
      type: "normal",
      realImg: "/images/Vraieoeuvre7.png",
      aiImg: "/images/Fausseoeuvre7.png",
      isRealLeft: true,
    },
    { type: "special", img: "/images/VraiSpeciale1.png", isReal: true },
    { type: "special", img: "/images/VraiSpeciale2.png", isReal: true },
    { type: "special", img: "/images/FauxSpeciale1.png", isReal: false },
  ];

  const handleAnswer = (isCorrect: boolean) => {
    if (answered) return;
    setIsCorrectAnswer(isCorrect);
    setFeedback(
      isCorrect
        ? funFacts[Math.floor(Math.random() * funFacts.length)]
        : artips[Math.floor(Math.random() * artips.length)]
    );
    setFeedbackType(isCorrect ? "funfact" : "artip");
    if (isCorrect) setScore((prev) => prev + 1);
    setAnswered(true);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswered(false);
      setIsCorrectAnswer(null);
      setFeedback("");
      setFeedbackType(null);
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => window.location.reload();
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
          <h2 className="quizQuestionTitle">
            Question {currentQuestion + 1} / {questions.length}
          </h2>
          <p className="quizSubTitle">
            {current.type === "normal"
              ? "Quelle est la vraie œuvre ?"
              : "Cette œuvre est-elle humaine ou générée par IA ?"}
          </p>

          {current.type === "normal" ? (
            <div className="imagesContainer">
              <img
                src={current.isRealLeft ? current.realImg : current.aiImg}
                alt="Choix gauche"
                onClick={() => handleAnswer(current.isRealLeft)}
                className={`quizImage ${
                  answered ? (current.isRealLeft ? "correct" : "incorrect") : ""
                }`}
              />
              <img
                src={!current.isRealLeft ? current.realImg : current.aiImg}
                alt="Choix droite"
                onClick={() => handleAnswer(!current.isRealLeft)}
                className={`quizImage ${
                  answered
                    ? !current.isRealLeft
                      ? "correct"
                      : "incorrect"
                    : ""
                }`}
              />
            </div>
          ) : (
            <div className="specialImageContainer">
              <img
                src={current.img}
                alt="Oeuvre spéciale"
                className="quizImage"
              />
              <div className="specialButtons">
                <button
                  className="choiceButton"
                  onClick={() => handleAnswer(current.isReal)}
                  disabled={answered}
                >
                  Vraie œuvre
                </button>
                <button
                  className="choiceButton"
                  onClick={() => handleAnswer(!current.isReal)}
                  disabled={answered}
                >
                  Œuvre IA
                </button>
              </div>
            </div>
          )}

          {answered && (
            <>
              <div className="feedback fade-in">
                <div
                  style={{
                    color: isCorrectAnswer ? "#22c55e" : "#ef4444",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  {isCorrectAnswer
                    ? "✅ Bonne réponse !"
                    : "❌ Mauvaise réponse."}
                </div>
                <strong>
                  {feedbackType === "funfact" ? "FUN FACT :" : "ARTIPS :"}
                </strong>{" "}
                {feedback}
              </div>
              <div className="nextButtonContainer">
                <button className="nextButton" onClick={nextQuestion}>
                  ➡️ Question suivante
                </button>
              </div>
            </>
          )}
        </section>
      ) : (
        <section className="resultSection">
          <h2 className="resultTitle">
            Votre Score : {score} / {questions.length}
          </h2>
          <p className="resultComment">
            {score <= 4 && "Ouch ! Tu peux progresser..."}
            {score >= 5 &&
              score <= 7 &&
              "Pas mal ! Tu commences à faire la différence."}
            {score >= 8 &&
              score <= 9 &&
              "Très bien joué ! Ton œil est presque infaillible."}
            {score === 10 && "Parfait ! Tu es un expert de l'art face à l'IA !"}
          </p>
          <div className="buttonsFinal">
            <button className="startButton" onClick={restartQuiz}>
              🔄 Rejouer
            </button>
            <Link href="/remerciements">
              <button className="startButton">🏁 Finir le Test</button>
            </Link>
          </div>
        </section>
      )}

      <style jsx>{`
        .quiz {
          padding: 2rem;
          max-width: 900px;
          margin: auto;
          text-align: center;
        }
        .quizHeader {
          margin-bottom: 2rem;
        }
        .homeButton {
          background: #6d28d9;
          color: white;
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          border: none;
          font-size: 1rem;
          cursor: pointer;
        }
        .quizQuestionTitle {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .quizSubTitle {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }
        .imagesContainer {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        .quizImage {
          width: 45%;
          cursor: pointer;
          transition: transform 0.3s, border 0.3s;
          border: 5px solid transparent;
          border-radius: 12px;
        }
        .quizImage:hover {
          transform: scale(1.03);
        }
        .correct {
          border-color: #22c55e;
        }
        .incorrect {
          border-color: #ef4444;
        }
        .specialImageContainer {
          margin-bottom: 2rem;
        }
        .specialButtons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .choiceButton {
          padding: 0.8rem 1.5rem;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          cursor: pointer;
        }
        .choiceButton:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .feedback {
          margin-top: 2rem;
          font-size: 1.2rem;
        }
        .fade-in {
          animation: fadeIn 0.8s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .nextButtonContainer {
          margin-top: 2rem;
        }
        .nextButton {
          background: #10b981;
          color: white;
          padding: 1rem 2rem;
          font-size: 1.2rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }
        .resultSection {
          margin-top: 3rem;
        }
        .resultTitle {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .resultComment {
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }
        .buttonsFinal {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        .startButton {
          background: #6366f1;
          color: white;
          padding: 1rem 2rem;
          font-size: 1.2rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }
      `}</style>
    </main>
  );
}
