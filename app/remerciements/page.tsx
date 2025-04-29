"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ThanksPage() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionCenter = rect.top + rect.height / 2;
        if (
          sectionCenter > windowHeight / 4 &&
          sectionCenter < (3 * windowHeight) / 4
        ) {
          section.style.transform = "scale(1.05)";
        } else {
          section.style.transform = "scale(1)";
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="thanksPage">
      <header className="thanksHeader">
        <Link href="/">
          <button className="homeButton">🏠 Retour Accueil</button>
        </Link>
      </header>

      <section className="thanksSection">
        <h1 className="thanksTitle">Remerciements</h1>

        {[
          {
            title: "Artistes",
            content: [
              "Nous tenons à remercier chaleureusement :",
              "N.L. — Fleurs, photographie",
              "Amandine B. — Petite Fusée, illustration numérique, avril 2025",
              "Alexandre S. — Kuroo (personnage de Haikyuu), illustration",
              "Martine GJINI — Le marcheur (Contact : gjinimartine@gmail.com)",
              "Amandine B. — Mer de la Côte d'Azur, photographie, novembre 2024",
              "Alexandre S. — Suguru (personnage de Jujutsu Kaisen), illustration",
              "Durand Théo — Cherry, illustration numérique, avril 2025",
              "Martine GJINI — Nu",
            ],
          },
          {
            title: "Encadrement",
            content: [
              "Merci à Madame Eynaud, professeure de projet entrepreneurial à l'IAE de Saint-Étienne,",
              "ainsi qu'à Marie-Charlotte Julia, notre tutrice, pour leurs conseils et leur accompagnement précieux.",
            ],
          },
          {
            title: "Participants",
            content: [
              "Merci à tous les artistes et étudiants interviewés,",
              "aux licences arts de Saint-Étienne pour leur aide,",
              "et à tous ceux qui ont répondu à notre questionnaire.",
            ],
          },
          {
            title: "Réflexion sur l'Art",
            content: [
              "La définition officielle du Petit Robert de l'Art est : \"Moyen d'obtenir un résultat (par l'effet d'aptitudes naturelles)\" ou \"Ensemble de connaissances et de règles d'action, dans un domaine particulier\".",
              "Pourtant, l'art est bien plus vaste : l'esthétique, le laid, qui peut être artiste ? L'art dépend de chacun : des goûts, de l'âge, de l'éducation... autant de réponses que d'individus.",
            ],
          },
          {
            title: "Mot de fin",
            content: [
              "Aujourd'hui, en faisant ce test, vous ne trouverez pas une vérité absolue sur la place de l'IA dans l'art.",
              "Vous trouverez des pistes, des critiques, des ouvertures. À vous de juger. Mais surtout : ne vous fermez pas au reste...",
            ],
          },
        ].map((section, index) => (
          <div
            key={index}
            className="thanksBlock"
            ref={(el) => {
              if (el) sectionsRef.current[index] = el as HTMLDivElement;
            }}
          >
            <h2>{section.title}</h2>
            {section.content.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ))}

        <div className="thanksButtonContainer">
          <Link href="/point-presse">
            <button className="pressButton">➡️ Voir le Point Presse</button>
          </Link>
        </div>
      </section>

      <style jsx>{`
        html,
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background: #8b5cf6;
          color: white;
          text-align: center;
        }
        .thanksHeader {
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
        .thanksSection {
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .thanksTitle {
          font-size: 4rem;
          background: linear-gradient(to right, #facc15, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 3rem;
        }
        .thanksBlock {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          margin: 2rem 0;
          border-radius: 20px;
          width: 90%;
          max-width: 800px;
          transition: transform 0.3s ease;
        }
        .thanksBlock h2 {
          font-size: 2rem;
          color: #facc15;
          margin-bottom: 1rem;
        }
        .thanksBlock p {
          font-size: 1.2rem;
          margin-bottom: 0.8rem;
          line-height: 1.6;
        }
        .thanksButtonContainer {
          margin-top: 3rem;
        }
        .pressButton {
          background: #2563eb;
          color: white;
          font-weight: bold;
          padding: 1rem 2rem;
          border: none;
          border-radius: 10px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: background 0.3s;
        }
        .pressButton:hover {
          background: #1d4ed8;
        }

        @media (max-width: 600px) {
          .thanksTitle {
            font-size: 2.8rem;
          }
          .thanksBlock h2 {
            font-size: 1.6rem;
          }
          .thanksBlock p {
            font-size: 1rem;
          }
          .pressButton {
            font-size: 1rem;
            padding: 0.8rem 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}
