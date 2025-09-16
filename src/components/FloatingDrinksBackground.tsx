import { useMemo } from "react";
import "../styles/FloatingDrinksBackground.css";

const EMOJIS = ["🍸","🍹","🍷","🍒","🍋","🍍","🧊","🍊"];

type Bubble = {
  x: number;      // 0..100 (%)
  size: number;   // px
  delay: number;  // s (negativ för att desynka start)
  dur: number;    // s
  emoji: string;
  opacity: number;// 0..1
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function FloatingDrinksBackground({ count = 25 }: { count?: number }) {
  const bubbles = useMemo<Bubble[]>(() => {
    return Array.from({ length: count }, () => ({
      x: rand(2, 98),
      size: rand(24, 62),
      delay: -rand(0, 20),
      dur: rand(16, 28),
      emoji: EMOJIS[Math.floor(rand(0, EMOJIS.length))],
      opacity: rand(0.18, 0.32),
    }));
  }, [count]);

  return (
    <div className="bg-floating" aria-hidden>
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="drink"
          style={
            {
              // CSS-variabler som används i index.css
              "--x": `${b.x}%`,
              "--size": `${b.size}px`,
              "--delay": `${b.delay}s`,
              "--dur": `${b.dur}s`,
              "--o": b.opacity,
            } as React.CSSProperties
          }
        >
          <span className="drink__i" data-emoji={b.emoji} />
        </span>
      ))}
    </div>
  );
}
