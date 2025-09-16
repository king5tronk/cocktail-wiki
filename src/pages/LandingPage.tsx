import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRandomCocktail } from "../services/cocktailApi";
import type { ICocktail } from "../models/Cocktail";
import styles from "../styles/LandingPage.module.css";

export default function LandingPage() {
  const [data, setData] = useState<ICocktail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadRandom() {
    setError(null);
    setLoading(true);
    try {
      const cocktail = await fetchRandomCocktail();
      setData(cocktail);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load random cocktail");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadRandom();
  }, []);

  return (
    <div className={styles.center}>
      <div className={styles.card}>
        {/* Status & Error */}
        {loading && !data && <p className={styles.status}>Loading…</p>}
        {error && !data && <div className={styles.alert}>{error}</div>}

        {/* Bild */}
        {data?.thumbnail && (
          <img
            className={styles.image}
            src={data.thumbnail.replace(/^http:/, "https:")}
            alt={data.name}
            width={360}
            height={360}
            loading="lazy"
            onError={(e) => {
              const el = e.currentTarget;
              if (!el.src.endsWith("/preview")) el.src = `${data.thumbnail}/preview`;
              else el.style.display = "none";
            }}
          />
        )}

        {/* Titel & meta */}
        <h1 className={styles.title}>{data ? data.name : "Random Cocktail"}</h1>
        {data && (
          <p className={styles.subtitle}>
            {data.category || "-"} • {data.glass || "-"}
          </p>
        )}

        {/* Knappar */}
        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.primary}`} onClick={loadRandom} disabled={loading}>
            {loading ? "Loading…" : "Get another"}
          </button>
          {data && (
            <Link className={styles.btn} to={`/cocktail/${data.id}`}>
              See more →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
