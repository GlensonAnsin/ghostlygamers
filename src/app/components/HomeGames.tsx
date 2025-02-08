'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/app/css-modules/homegames.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import formatDate from "@/app/lib/formatDate";

interface Game {
  id: number;
  name: string;
  background_image: string;
  released: string;
  metacritic: number;
  genres: Array<{ name: string }>;
}

interface HomeGamesProps {
  carouselGames: Game[];
  homeTrendingGames: Game[];
  homeLatestGames: Game[];
  homeTopGames: Game[];
  homeUpdatedGames: Game[];
}

const HomeGames = ({ 
  carouselGames, 
  homeTrendingGames, 
  homeLatestGames, 
  homeTopGames, 
  homeUpdatedGames 
}: HomeGamesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (carouselGames?.length > 0 && 
        homeTrendingGames?.length > 0 && 
        homeLatestGames?.length > 0 && 
        homeTopGames?.length > 0 && 
        homeUpdatedGames?.length > 0) {
      setIsLoading(false);
    }
  }, [carouselGames, homeTrendingGames, homeLatestGames, homeTopGames, homeUpdatedGames]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (carouselGames?.slice(0, 5).length || 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselGames]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselGames.slice(0, 5).length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselGames.slice(0, 5).length) % carouselGames.slice(0, 5).length);
  };

  const renderGameCard = (game: Game) => (
    <Link href={`/games/${game.id}`} key={game.id} className={styles.gameCard}>
      <Image
        src={game.background_image || "/alternative_poster_1.png"}
        alt={game.name}
        width={355}
        height={200}
        className={styles.gameImage}
      />
      <h2>{game.name || "-"}</h2>
      <p>{formatDate(game.released) || "-"}</p>
      <p>{game.metacritic  || "0"} / 100</p>
      <p>{game.genres.map(genre => genre.name).join(', ') || "-"}</p>
    </Link>
  );

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <video autoPlay loop playsInline muted>
          <source src='/loading.webm' type='video/webm' />
        </video>
      </div>
    );
  }

  return (
    <>
        <div className={styles.carousel}>
            <button className={`${styles.arrow} ${styles.leftArrow}`} onClick={prevSlide}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className={styles.slide}>
                <Image
                src={carouselGames[currentIndex]?.background_image || "/alternative_poster_1.png"}
                alt={carouselGames[currentIndex]?.name || "Game"}
                fill
                priority
                className={styles.carouselImage}
                />
                <div className={styles.content}>
                <h2>{carouselGames[currentIndex]?.name}</h2>
                </div>
            </div>
            <button className={`${styles.arrow} ${styles.rightArrow}`} onClick={nextSlide}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
        <h2 className={styles.trending}>Trending Games</h2>
        <div className={styles.gamesGrid}>
            {homeTrendingGames.map((game) => renderGameCard(game))}
        </div>
        <div className={styles.viewMoreContainer}>
            <Link href='/games/trending' className={styles.viewMore}>View More</Link>
        </div>
        <h2 className={styles.latest}>Latest Games</h2>
        <div className={styles.gamesGrid}>
            {homeLatestGames.map((game) => renderGameCard(game))}
        </div>
        <div className={styles.viewMoreContainer}>
            <Link href='/games/latest' className={styles.viewMore}>View More</Link>
        </div>
        <h2 className={styles.top}>Top-Rated Games (Metacritic-based)</h2>
        <div className={styles.gamesGrid}>
            {homeTopGames.map((game) => renderGameCard(game))}
        </div>
        <div className={styles.viewMoreContainer}>
            <Link href='/games/top' className={styles.viewMore}>View More</Link>
        </div>
        <h2 className={styles.updated}>Recently Updated Games</h2>
        <div className={styles.gamesGrid}>
            {homeUpdatedGames.map((game) => renderGameCard(game))}
        </div>
        <div className={styles.viewMoreContainer}>
            <Link href='/games/updated' className={styles.viewMore}>View More</Link>
        </div>
    </>
  );
}

export default HomeGames;