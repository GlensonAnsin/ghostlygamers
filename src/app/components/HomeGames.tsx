'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/app/css-modules/homegames.module.css";
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
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className={styles.swiper}
          >
            {carouselGames?.map((game: Game) => (
              <SwiperSlide key={game.id}>
                <Link href={`/games/${game.id}`}>
                  <Image
                    src={game.background_image || "/alternative_poster_1.png"}
                    alt={game.name}
                    fill
                    priority
                    className={styles.carouselImage}
                  />
                  <div className={styles.content}>
                    <h2>{game.name}</h2>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
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