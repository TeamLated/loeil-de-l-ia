"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const cardCenter = rect.top + rect.height / 2;
        if (cardCenter > windowHeight / 3 && cardCenter < (2 * windowHeight) / 3) {
          card.style.transform = "scale(1.08)";
        } else {
          card.style.transform = "scale(1)";
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".menu") && !(e.target as HTMLElement).closest(".menuOverlay")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <main className="home">
      {/* MENU */}
      <header className="header">
        <div className="menu">
          <button onClick={() => setMenuOpen(!menuOpen)} className="menuButton">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
          {menuOpen && (
            <nav className="menuOverlay">
              <ul>
                <li><Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link></li>
                <li><Link href="/remerciements" onClick={() => setMenuOpen(false)}>Remerciements</Link></li>
                <li><Link href="/point-presse" onClick={() => setMenuOpen(false)}>Point Presse</Link></li>
              </ul>
            </nav>
          )}
        </div>
      </header>

      {/* SECTION HERO */}
      <section className="hero">
        <img src="/images/logo.png" alt="Logo Team Lated" className="logo" />
        <h1>L'Œil de l'IA</h1>
        <p>Testez votre capacité à reconnaître une œuvre humaine face à une création d'intelligence artificielle.</p>
        <Link href="/quiz">
          <button className="startButton">Commencer le Quiz</button>
        </Link>
        <div className="scrollDown">⬇️</div>
      </section>

      {/* SECTION EXPLICATION */}
      <section id="explanationSection" className="explanation">
        <h2 className="bigTitle">Pourquoi ce projet ?</h2>
        <div className="cards">
          {/* Card 1 */}
          <div ref={(el) => el && (cardsRef.current[0] = el)} className="card purple">
            <h3>Notre équipe</h3>
            <p>
              Nous sommes une équipe d'étudiants passionnés par l'art, la création visuelle et les technologies émergentes.
              Si nos parcours personnels sont différents, nous partageons tous une même sensibilité pour l'expression artistique
              et un intérêt profond pour l'impact de l'intelligence artificielle sur notre société.
              Face aux innovations impressionnantes permises par les outils génératifs, nous avons ressenti le besoin de questionner
              la place de l'humain dans la création artistique. Ensemble, nous avons construit ce projet pour sensibiliser le public
              à la richesse unique de la création humaine, et pour inviter chacun à s'interroger sur ce qui différencie une œuvre née
              d'une main humaine de celle produite par un algorithme.
            </p>
          </div>

          {/* Card 2 */}
          <div ref={(el) => el && (cardsRef.current[1] = el)} className="card green">
            <h3>Le défi</h3>
            <p>
              L'intelligence artificielle est désormais capable de générer des œuvres d'art saisissantes en quelques secondes.
              Tableaux, dessins, illustrations numériques : tout semble à portée d'algorithme.
              Ce jeu d'observation n'est pas qu'un simple divertissement : il invite chacun à s'interroger sur les critères
              qui rendent une œuvre profondément humaine.
            </p>
          </div>

          {/* Card 3 */}
          <div ref={(el) => el && (cardsRef.current[2] = el)} className="card blue">
            <h3>Quelques chiffres</h3>
            <p>
              60 % des internautes avouent avoir du mal à distinguer une œuvre d'IA d'une œuvre humaine.
              2 minutes suffisent en moyenne à une IA pour générer un tableau complexe.
              +300 œuvres analysées pour construire notre expérience.
              5 styles artistiques explorés : impressionnisme, art abstrait, réalisme, surréalisme, art contemporain.
            </p>
          </div>

          {/* Card 4 */}
          <div ref={(el) => el && (cardsRef.current[3] = el)} className="card red">
            <h3>Notre mission</h3>
            <p>
              Notre mission est double : sensibiliser et valoriser.
              Nous voulons avant tout sensibiliser aux bouleversements que l'IA provoque dans le monde artistique.
              Nous souhaitons aussi valoriser la démarche des artistes humains, leur capacité unique à transmettre
              des émotions, à porter des messages et à ouvrir des débats par leur travail.
            </p>
          </div>

          {/* Card 5 */}
          <div ref={(el) => el && (cardsRef.current[4] = el)} className="card yellow">
            <h3>Vous</h3>
            <p>
              Vous êtes au centre de notre projet. Que vous soyez amateur d'art, curieux, étudiant, artiste ou passionné
              de nouvelles technologies, votre regard et vos choix alimentent la réflexion collective sur le rôle de l'humain
              face aux créations IA. En participant, vous devenez acteur d'un questionnement essentiel pour l'avenir de l'art.
            </p>
          </div>
        </div>
      </section>

      {/* CSS STYLE */}
      <style jsx>{`
        html, body {
          margin: 0;
          padding: 0;
          background: #6b21a8;
          color: white;
          font-family: Arial, sans-serif;
          scroll-behavior: smooth;
        }
        .header {
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 1000;
        }
        .menuButton {
          background: none;
          border: none;
          cursor: pointer;
        }
        .bar {
          width: 30px;
          height: 4px;
          background: white;
          margin: 5px 0;
        }
        .menuOverlay {
          background: linear-gradient(135deg, #9333ea, #22c55e, #2563eb, #ef4444, #facc15);
          padding: 1rem;
          border-radius: 12px;
          position: absolute;
          top: 4rem;
          left: 0;
          width: 220px;
          text-align: center;
        }
        .menuOverlay ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .menuOverlay li {
          margin: 1rem 0;
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
        }
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding-top: 5rem;
        }
        .logo {
          width: 150px;
          margin-bottom: 1rem;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.2rem;
          max-width: 700px;
          margin: 0 auto 2rem;
        }
        .startButton {
          background: #facc15;
          color: #1e1b4b;
          font-weight: bold;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1.2rem;
          border: none;
          cursor: pointer;
        }
        .scrollDown {
          margin-top: 3rem;
          font-size: 2rem;
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .explanation {
          padding: 5rem 2rem;
          text-align: center;
        }
        .bigTitle {
          font-size: 3rem;
          color: #facc15;
          margin-bottom: 3rem;
          text-transform: uppercase;
        }
        .cards {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          align-items: center;
        }
        .card {
          width: 90%;
          padding: 3rem;
          border-radius: 20px;
          background: #333;
          transition: transform 0.5s;
          text-align: center;
          font-size: 1.2rem;
        }
        .card h3 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .purple { background-color: #9333ea; }
        .green { background-color: #22c55e; }
        .blue { background-color: #2563eb; }
        .red { background-color: #ef4444; }
        .yellow { background-color: #facc15; color: #1e1b4b; }

        @media screen and (max-width: 768px) {
          .card {
            width: 95%;
            padding: 2rem;
            font-size: 1rem;
          }
          h1 {
            font-size: 2.2rem;
          }
          .startButton {
            padding: 0.8rem 1.6rem;
            font-size: 1rem;
          }
          .bigTitle {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </main>
  );
}



