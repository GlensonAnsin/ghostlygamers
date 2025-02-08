'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/css-modules/gamedetail.module.css';
import formatDate from "@/app/lib/formatDate";
import ShowImg from '../lib/showImg';
import { StaticImageData } from 'next/image';

// Import store icons
import steamIcon from '../../../public/steam.svg';
import xBoxIcon from '../../../public/xbox.svg';
import playStationIcon from '../../../public/playstation.svg';
import appStoreIcon from '../../../public/app-store.svg';
import gogIcon from '../../../public/gog.svg';
import nintendoIcon from '../../../public/nintendo.svg';
import googlePlayIcon from '../../../public/google-play.svg';
import itchIcon from '../../../public/itch-io.svg';
import epicGamesIcon from '../../../public/epic-games.svg';

// Define types
interface Store {
  store_id: number;
  url: string;
}

interface Screenshot {
  id: number;
  image: string;
}

interface Trailer {
  id: number;
  preview: string;
  data: { '480': string; max: string };
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  percent: number;
  image: string;
}

interface DLC {
  id: number;
  name: string;
  background_image: string;
}

interface Game {
  id: number;
  name: string;
  background_image: string;
}

interface GameDetails {
  name: string;
  background_image?: string;
  released?: string;
  updated?: string;
  metacritic?: number;
  playtime?: number;
  genres?: { name: string }[];
  publishers?: { name: string }[];
  platforms?: { platform: { name: string } }[];
  description_raw?: string;
}

interface GameDetailProps {
  gameDetails: GameDetails;
  similarGames: Game[];
  trailers: Trailer[];
  screenshots: Screenshot[];
  achievements: Achievement[];
  dlc: DLC[];
  gameStores: Store[];
  recommendedGames: Game[];
}

const getStoreName = (storeID: number): { name: string; icon: StaticImageData } => {
  const storeMap: Record<number, { name: string; icon: StaticImageData }> = {
    1: { name: 'Steam', icon: steamIcon },
    2: { name: 'Xbox Store', icon: xBoxIcon },
    3: { name: 'PlayStation Store', icon: playStationIcon },
    4: { name: 'App Store', icon: appStoreIcon },
    5: { name: 'GOG', icon: gogIcon },
    6: { name: 'Nintendo Store', icon: nintendoIcon },
    7: { name: 'Xbox 360 Store', icon: xBoxIcon },
    8: { name: 'Google Play', icon: googlePlayIcon },
    9: { name: 'itch.io', icon: itchIcon },
  };
  return storeMap[storeID] || { name: 'Epic Games', icon: epicGamesIcon };
};

const GameDetail = ({
    gameDetails,
    similarGames,
    trailers,
    screenshots,
    achievements,
    dlc,
    gameStores,
    recommendedGames
  }: GameDetailProps) => {
    const [activeTab, setActiveTab] = useState<'description' | 'media' | 'achievements' | 'dlc'>('description');
    const router = useRouter();
    const [display, setDisplay] = useState(false);
    const [imgLink, setImgLink] = useState<string | null>(null);
  
    if (!gameDetails || !similarGames || !trailers || !screenshots || !achievements || !dlc || !gameStores) {
      return (
        <div className={styles.loading}>
          <video autoPlay loop playsInline muted>
            <source src='/loading.webm' type='video/webm' />
          </video>
        </div>
      );
    }

    return (
        <div className={styles.container}>
            <button 
                onClick={() => router.back()} 
                className={styles.backButton}
            >
                ← Back
            </button>
            <div className={styles.gameInfo1}>
                <div className={styles.imageContainer}>
                    <Image
                    src={gameDetails.background_image || "/alternative_poster_2.png"}
                    alt={gameDetails.name}
                    width={700}
                    height={450}
                    className={styles.mainImage}
                    />
                </div>
                <div className={styles.metadataContainer}>
                    <h1>{gameDetails.name}</h1>
                    <dl className={styles.metadata}>
                        <dt>Release Date:</dt>
                        <dd>{formatDate(gameDetails.released) || "-"}</dd>
                        
                        <dt>Metacritic:</dt>
                        <dd>{gameDetails.metacritic || "0"} / 100</dd>
                        
                        <dt>Recent Update:</dt>
                        <dd>{formatDate(gameDetails.updated) || "-"}</dd>
                        
                        <dt>Playtime:</dt>
                        <dd>{gameDetails.playtime || "-"} hr/s</dd>
                        
                        <dt>Genres:</dt>
                        <dd>{gameDetails.genres?.map((g) => g.name).join(', ') || "-"}</dd>
                        
                        <dt>Publisher:</dt>
                        <dd>{gameDetails.publishers?.map((p) => p.name).join(", ") || "-"}</dd>
                        
                        <dt>Platforms:</dt>
                        <dd>{gameDetails.platforms?.map((p) => p.platform.name).join(', ') || "-"}</dd>
                    </dl>
                    <div className={styles.stores}>
                        <h2>Available On:</h2>
                        <div className={styles.storeLinks}>
                            {gameStores.map((store: Store) => {
                                const storeInfo = getStoreName(store.store_id);
                                return (
                                    <Link href={store.url} target='_blank' key={store.store_id} className={styles.storeLink}>
                                        {storeInfo.name}
                                        <Image
                                            src={storeInfo.icon}
                                            alt={storeInfo.name}
                                            width={20}
                                            height={20}
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                        {gameStores.length === 0 && (
                            <p className={styles.noStores}>No stores available</p>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.gameInfo2}>
                <div className={styles.tabs}>
                    <button 
                        className={`${styles.tab} ${activeTab === 'description' ? styles.active : ''}`}
                        onClick={() => setActiveTab('description')}
                    >
                        Description
                    </button>
                    <button 
                        className={`${styles.tab} ${activeTab === 'media' ? styles.active : ''}`}
                        onClick={() => setActiveTab('media')}
                    >
                        Media
                    </button>
                    <button 
                        className={`${styles.tab} ${activeTab === 'achievements' ? styles.active : ''}`}
                        onClick={() => setActiveTab('achievements')}
                    >
                        Achievements
                    </button>
                    <button 
                        className={`${styles.tab} ${activeTab === 'dlc' ? styles.active : ''}`}
                        onClick={() => setActiveTab('dlc')}
                    >
                        DLC
                    </button>
                </div>

                <div className={styles.tabContent}>
                    {activeTab === 'description' && (
                        <p className={styles.description}>{gameDetails.description_raw}</p>
                    )}

                    {activeTab === 'media' && (
                        <div className={styles.mediaSection}>
                          <div className={styles.screenshots}>
                              <div className={styles.screenshotGrid}>
                                  {trailers?.map((trailer: Trailer) => (
                                      <video 
                                          key={trailer.id} 
                                          width={300} 
                                          height={169} 
                                          className={styles.trailer} 
                                          controls
                                          poster={trailer.preview}
                                      >
                                          <source src={trailer.data['480'] || trailer.data['max']} type="video/mp4" />
                                          Your browser does not support the video tag.
                                      </video>
                                  ))}
                                  {screenshots?.map((screenshot: Screenshot) => (
                                      <Image
                                          key={screenshot.id}
                                          src={screenshot.image}
                                          alt="Game Screenshot"
                                          width={300}
                                          height={169}
                                          className={styles.screenshot}
                                          onClick={() => {
                                            setImgLink(screenshot.image);
                                            setDisplay(true);
                                          }}
                                      />
                                  ))}
                              </div>
                          </div>
                      </div>
                    )}

                    {activeTab === 'achievements' && (
                        <div className={styles.achievementsGrid}>
                            {achievements?.map((achievement: Achievement) => (
                                <div key={achievement.id} className={styles.achievement}>
                                    <Image
                                        src={achievement.image}
                                        alt={achievement.name}
                                        width={64}
                                        height={64}
                                    />
                                    <div>
                                        <h4>{achievement.name}</h4>
                                        <p>{achievement.description}</p>
                                        <p>Achieved by {achievement.percent}% of players</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'dlc' && (
                        <div className={styles.dlcGrid}>
                            {dlc?.map((game: DLC) => (
                                <Link href={`/games/${game.id}`} key={game.id} className={styles.dlcCard}>
                                    <Image
                                        src={game.background_image || "/alternative_poster_3.png"}
                                        alt={game.name}
                                        width={200}
                                        height={113}
                                        className={styles.dlcImage}
                                    />
                                    <h4>{game.name}</h4>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            <div className={styles.similarGames}>
                <h2>Similar Games</h2>
                <div className={styles.similarGrid}>
                  {similarGames?.map((game: Game) => (
                    <Link href={`/games/${game.id}`} key={game.id} className={styles.similarCard}>
                      <Image
                        src={game.background_image || "/alternative_poster_3.png"}
                        alt={game.name}
                        width={200}
                        height={113}
                        className={styles.similarImage}
                      />
                      <h3>{game.name}</h3>
                    </Link>
                  ))}
                </div>
            </div>

            <div className={styles.recommendedGames}>
                <h2>Recommended Games</h2>
                <div className={styles.recommendedGrid}>
                    {recommendedGames?.map((game: Game) => (
                        <Link href={`/games/${game.id}`} key={game.id} className={styles.recommendedCard}>
                            <Image
                                src={game.background_image || "/alternative_poster_3.png"}
                                alt={game.name}
                                width={200}
                                height={113}
                                className={styles.recommendedImage}
                            />
                            <h3>{game.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
            <ShowImg 
                imgLink={imgLink}
                display={display}
                setDisplay={setDisplay}
            />
        </div>
    );
};

export default GameDetail;
