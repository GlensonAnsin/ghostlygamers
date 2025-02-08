'use client';

import Image from "next/image";
import styles from "@/app/css-modules/header.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSun, faMoon, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/games/search_game?q=${encodeURIComponent(query.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    router.push(path);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <Link href='/' className={styles.homeLink} onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src='/logo.png'
              alt='Ghostly Gamers Logo'
              priority
              className={styles.logo}
              width={100}
              height={100}
            />
            <span className={styles.title}>Ghostly Gamers</span>
          </Link>
        </div>

        <button 
          className={styles.menuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
        </button>

        <div className={styles.navLinks}>
          <Link href='/games/all_games'>All Games</Link>
          <Link href='/games/trending'>Trending</Link>
          <Link href='/games/latest'>Latest</Link>
          <Link href='/games/top'>Top</Link>
          <Link href='/games/updated'>Updates</Link>
        </div>

        <button className={styles.themeToggle} onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
        </button>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          <input
            type='search'
            placeholder='Search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.search}
          />
        </form>
      </nav>

      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
        <Link href='/games/all_games' onClick={() => handleNavigation('/games/all_games')}>All Games</Link>
        <Link href='/games/trending' onClick={() => handleNavigation('/games/trending')}>Trending</Link>
        <Link href='/games/latest' onClick={() => handleNavigation('/games/latest')}>Latest</Link>
        <Link href='/games/top' onClick={() => handleNavigation('/games/top')}>Top</Link>
        <Link href='/games/updated' onClick={() => handleNavigation('/games/updated')}>Updates</Link>
      </div>
    </>
  );
}