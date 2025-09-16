import type { ReactNode } from "react";
import styles from "../styles/Card.module.css";

type Props = { children: ReactNode; className?: string };
export default function Card({ children, className }: Props) {
  const cls = className ? `${styles.card} ${className}` : styles.card;
  return <div className={cls}>{children}</div>;
}
