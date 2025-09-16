import { useState } from "react";
import { Link } from "react-router-dom";
import { searchCocktailsByName } from "../services/cocktailApi";
import type { FormEvent } from "react";
import type { ICocktail } from "../models/Cocktail";
import styles from "../styles/SearchPage.module.css";

const PAGE_SIZE = 10;

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ICocktail[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      setResults([]);
      setPage(1);
      setError("Enter a cocktail name to search");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await searchCocktailsByName(q); 
      setResults(data);
      setPage(1);
    } catch (err: unknown) {
      setResults([]);
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = results.slice(start, start + PAGE_SIZE);

  return (
    <div className="center-page">
      <div className="card">
        <h1 className={styles.title}>Search cocktails</h1>

        <form onSubmit={onSubmit} className={styles.form} role="search" aria-label="Cocktail search by name">
          <label htmlFor="q" className={styles.srOnly}>Name</label>
          <input
            id="q"
            name="q"
            type="text"
            placeholder="e.g. margarita"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
            autoComplete="off"
          />
          <button className={`${styles.btn} ${styles.primary}`} type="submit" disabled={loading}>
            {loading ? "Searching…" : "Search"}
          </button>
        </form>

        {!loading && error && <div className={styles.alert}>{error}</div>}

        {!loading && !error && results.length === 0 && (
          <p className={styles.helper}>Search for a cocktail by name.</p>
        )}

        {!loading && results.length > 0 && (
          <>
            <p className={styles.count} aria-live="polite">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>

            <ul className={styles.list}>
              {pageItems.map((c) => (
                <li key={c.id}>
                  <Link to={`/cocktail/${c.id}`} className={styles.itemLink}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>

            <nav className={styles.pagination} aria-label="Pagination">
              <button
                type="button"
                className={styles.btn}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                ‹ Prev
              </button>
              <span className={styles.pageInfo}>Page {page} / {totalPages}</span>
              <button
                type="button"
                className={styles.btn}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
              >
                Next ›
              </button>
            </nav>
          </>
        )}
      </div>
    </div>
  );
}
