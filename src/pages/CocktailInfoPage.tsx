import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCocktailById } from "../services/cocktailApi";
import type { ICocktail } from "../models/Cocktail";
import styles from "../styles/CocktailInfoPage.module.css";

export default function CocktailInfoPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ICocktail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) { setError("Missing cocktail id"); return; }
    (async () => {
      setLoading(true); setError(null);
      try { setData(await fetchCocktailById(id)); }
      catch (e:any) { setError(e?.message ?? "Could not load cocktail"); }
      finally { setLoading(false); }
    })();
  }, [id]);

  if (loading) return <p className="status">Loading…</p>;
  if (error) {
    return (
      <div className="center-page">
        <div className="card">
          <div className="alert">{error}</div>
          <Link className="btn" to="/search">← Back to search</Link>
        </div>
      </div>
    );
  }
  if (!data) return null;

  return (
    <div className="center-page">
      {/* global card + lokal wide-override */}
      <div className={`card ${styles.wide}`}>
        <Link className="btn btn--ghost" to="/search">← Back</Link>

        {data.thumbnail && (
          <img
            className={`card__img ${styles.image}`}  // global + lokal override
            src={data.thumbnail.replace(/^http:/, "https:")}
            alt={data.name}
            width={400}
            height={400}
            loading="lazy"
            onError={(e) => {
              const el = e.currentTarget;
              if (!el.src.endsWith("/preview")) el.src = `${data.thumbnail}/preview`;
              else el.style.display = "none";
            }}
          />
        )}

        <h1 className="card__title">{data.name}</h1>
        <p className={styles.subtitle}>{data.category || "-"} • {data.glass || "-"}</p>

        <div className={styles.meta}>
          <div><dt>Alcoholic</dt><dd>{data.alcoholic ? "Alcoholic" : "Non alcoholic"}</dd></div>
          {data.tags?.length ? <div><dt>Tags</dt><dd>{data.tags.join(", ")}</dd></div> : null}
        </div>

        {data.instructions && (
          <>
            <h2 className={styles.subheading}>Instructions</h2>
            <p className={styles.instructions}>{data.instructions}</p>
          </>
        )}

        <h2 className={styles.subheading}>Ingredients</h2>
        <ul className={styles.ingredients}>
          {data.ingredients.map((ing, i) => (
            <li key={`${ing.ingredient}-${ing.measure ?? ""}-${i}`}>
              {ing.ingredient}{ing.measure ? ` — ${ing.measure}` : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
