"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function PressPage() {
  const cardsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const cardCenter = rect.top + rect.height / 2;
        if (
          cardCenter > windowHeight / 4 &&
          cardCenter < (3 * windowHeight) / 4
        ) {
          card.style.transform = "scale(1.05)";
        } else {
          card.style.transform = "scale(1)";
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const articles = [
    {
      title: "Comment l'IA change le monde de l'art",
      description:
        "L'impact des intelligences artificielles dans les galeries d'art.",
      image: "/images/article1.jpg",
      url: "https://www.lemonde.fr/pixels/article/2022/10/05/intelligence-artificielle-et-creation-artistique-questions-d-ethique-et-de-droit_6144331_4408996.html",
    },
    {
      title: "Face à l'IA, les artistes ripostent sur tous les fronts",
      description:
        "Les artistes s'organisent pour faire face à l'essor de l'IA dans l'art.",
      image: "/images/article2.jpg",
      url: "https://www.lemonde.fr/pixels/article/2025/02/09/face-a-l-ia-les-artistes-ripostent-sur-tous-les-fronts_6538601_4408996.html",
    },
    {
      title: "La folle année 2023 de l'intelligence artificielle",
      description:
        "Retour sur une année marquée par des avancées majeures en IA.",
      image: "/images/article3.jpg",
      url: "https://www.france24.com/fr/%C3%A9co-tech/20231230-la-folle-ann%C3%A9e-2023-de-l-intelligence-artificielle",
    },
    {
      title: "PhantasIA #1 | Le magazine de la création IA",
      description:
        "Exploration du potentiel créatif de l'IA dans l'art contemporain.",
      image: "/images/article4.jpg",
      url: "https://www.youtube.com/watch?v=hTeYDUDH1uY",
    },
    {
      title: "Distinguer l'art humain de l'art IA",
      description: "Les critères visuels pour reconnaître une œuvre IA.",
      image: "/images/article5.jpg",
      url: "https://theconversation.com/comment-distinguer-une-oeuvre-creee-par-une-ia-de-celle-dun-humain-201523",
    },
    {
      title: "Quand l'IA devient artiste : Révolution ou menace",
      description: "Réflexion sur l'impact de l'IA sur la création artistique.",
      image: "/images/article6.jpg",
      url: "https://sn.notrecontinent.com/2024/11/26/quand-lia-devient-artiste-revolution-ou-menace-pour-lart-humain/",
    },
    {
      title: "Quand une IA peint une œuvre : la place de l'artiste",
      description: "Débat sur l'auteur et l'authenticité face à l'IA.",
      image: "/images/article7.jpg",
      url: "https://www.numerama.com/pop-culture/438991-quand-une-ia-peint-une-oeuvre-quelle-est-la-place-de-lartiste.html",
    },
    {
      title: "Propriété intellectuelle et œuvres générées",
      description: "Problèmes juridiques autour des créations IA.",
      image: "/images/article8.jpg",
      url: "https://www.lemonde.fr/idees/article/2024/11/05/propriete-intellectuelle-la-chaine-de-valeur-de-la-contrefacon-se-trouve-en-dehors-de-l-union-europeenne_6376688_3232.html",
    },
    {
      title: "Créer de l'art avec l'IA : un défi humain",
      description: "Coexistence entre artistes humains et IA.",
      image: "/images/article9.jpg",
      url: "https://www.cbc.ca/news/canada/first-person-ai-art-1.7432023",
    },
  ];

  return (
    <main className="press">
      <header className="pressHeader">
        <Link href="/">
          <button className="homeButton">🏠 Retour Accueil</button>
        </Link>
      </header>

      <section className="pressSection">
        <h1 className="pressTitle">Point Presse</h1>
        <div className="articlesGrid">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="articleCard"
              ref={(el) => {
                if (el) cardsRef.current[index] = el as HTMLAnchorElement;
              }}
            >
              <img
                src={article.image}
                alt={article.title}
                className="articleImage"
              />
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <span className="source">Source : Voir article</span>
            </a>
          ))}
        </div>
      </section>

      <style jsx>{`
        html,
        body {
          margin: 0;
          padding: 0;
          background-color: #8b5cf6;
          font-family: Arial, sans-serif;
          color: white;
          text-align: center;
        }
        .pressHeader {
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
        .pressSection {
          padding: 4rem 2rem;
        }
        .pressTitle {
          font-size: 4rem;
          background: linear-gradient(to right, #facc15, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 3rem;
        }
        .articlesGrid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          align-items: center;
        }
        .articleCard {
          background: rgba(255, 255, 255, 0.1);
          width: 80%;
          padding: 2rem;
          border-radius: 20px;
          text-decoration: none;
          color: white;
          transition: transform 0.3s;
        }
        .articleCard:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.2);
        }
        .articleImage {
          width: 100%;
          max-height: 250px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 1rem;
        }
        .articleCard h2 {
          font-size: 2rem;
          margin: 1rem 0;
        }
        .articleCard p {
          font-size: 1.2rem;
          margin-bottom: 0.8rem;
        }
        .source {
          font-size: 0.9rem;
          color: #d1d5db;
        }
        @media (max-width: 600px) {
          .pressTitle {
            font-size: 2.5rem;
          }
          .articleCard {
            width: 90%;
            padding: 1.5rem;
          }
          .articleCard h2 {
            font-size: 1.6rem;
          }
          .articleCard p {
            font-size: 1rem;
          }
        }
      `}</style>
    </main>
  );
}
