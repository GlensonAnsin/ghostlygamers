'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import styles from "@/app/css-modules/gamearr.module.css";
import Image from "next/image";
import { fetchSortedGamesByGenre, fetchSortedGamesByPlatform } from "@/app/lib/gameApi";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatDate from "@/app/lib/formatDate"
import Link from 'next/link';

interface Game {
    id: number;
    name: string;
    background_image: string;
    released: string;
    metacritic: number;
    genres: Array<{ name: string }>;
}

function SortedGamesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [sortedGames, setSortedGames] = useState<Game[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [headerText, setHeaderText] = useState('Games');

    const getSortingHeaderText = (genre?: string, platform?: string) => {
        const genreMap: { [key: string]: string } = {
            '4': 'Action Games',
            '51': 'Indie Games',
            '3': 'Adventure Games',
            '5': 'RPG Games',
            '10': 'Strategy Games',
            '2': 'Shooter Games',
            '40': 'Casual Games',
            '14': 'Simulation Games',
            '7': 'Puzzle Games',
            '11': 'Arcade Games',
            '83': 'Platformer Games',
            '59': 'Multiplayer Games',
            '1': 'Racing Games',
            '15': 'Sports Games',
            '6': 'Fighting Games',
            '19': 'Family Games',
            '28': 'Board Games',
            '17': 'Card Games',
            '34': 'Educational Games'
        };

        const platformMap: { [key: string]: string } = {
            '4': 'PC Games',
            '187': 'PS5 Games',
            '18': 'PS4 Games',
            '16': 'PS3 Games',
            '15': 'PS2 Games',
            '27': 'PS1 Games',
            '1': 'Xbox One Games',
            '186': 'Xbox Series S/X Games',
            '14': 'Xbox 360 Games',
            '80': 'Xbox Games',
            '7': 'Nintendo Switch Games',
            '83': 'Nintendo 64 Games',
            '8': 'Nintendo 3DS Games',
            '9': 'Nintendo DS Games',
            '13': 'Nintendo DSi Games',
            '3': 'iOS Games',
            '21': 'Android Games',
            '5': 'macOS Games',
            '6': 'Linux Games',
            '19': 'PS Vita Games',
            '17': 'PSP Games',
            '10': 'Wii U Games',
            '11': 'Wii Games',
            '105': 'GameCube Games',
            '24': 'Game Boy Advance Games',
            '43': 'Game Boy Color Games',
            '26': 'Game Boy Games',
            '79': 'SNES Games',
            '49': 'NES Games',
            '55': 'Classic Macintosh Games',
            '41': 'Apple II Games',
            '166': 'Commodore / Amiga Games',
            '28': 'Atari 7800 Games',
            '31': 'Atari 5200 Games',
            '23': 'Atari 2600 Games',
            '22': 'Atari Flashback Games',
            '25': 'Atari 8-bit Games',
            '34': 'Atari ST Games',
            '46': 'Atari Lynx Games',
            '50': 'Atari XEGS Games',
            '167': 'Genesis Games',
            '107': 'SEGA Saturn Games',
            '119': 'SEGA CD Games',
            '117': 'SEGA 32X Games',
            '74': 'SEGA Master System Games',
            '106': 'Dreamcast Games',
            '111': '3DO Games',
            '112': 'Jaguar Games',
            '77': 'Game Gear Games',
            '12': 'Neo Geo Games',
        };

        if (genre && genreMap[genre]) {
            return genreMap[genre];
        }
        if (platform && platformMap[platform]) {
            return platformMap[platform];
        }
        return 'Games';
    };

    useEffect(() => {
        setLoading(true);
        const genreParam = searchParams.get("genre");
        const platformParam = searchParams.get("platform");
        setHeaderText(getSortingHeaderText(genreParam || undefined, platformParam || undefined));
    }, [searchParams]);

    useEffect(() => {
        const pageParam = searchParams.get("page");
        setCurrentPage(pageParam ? parseInt(pageParam) : 1);
    }, [searchParams]);

    useEffect(() => {
        const loadSortedGames = async () => {
            try {
                const genreParam = searchParams.get("genre");
                const platformParam = searchParams.get("platform");
                let data;
                
                if (genreParam) {
                    data = await fetchSortedGamesByGenre(parseInt(genreParam), currentPage);
                } else if (platformParam) {
                    data = await fetchSortedGamesByPlatform(parseInt(platformParam), currentPage);
                }

                if (data) {
                    setSortedGames(data.results);
                    setTotalPages(data.totalPages);
                }
            } catch (error) {
                console.error('Error loading games:', error);
            } finally {
                setLoading(false);
            }
        }
        loadSortedGames();
    }, [currentPage, searchParams]);

    const updatePageUrl = (page: number) => {
        const genreParam = searchParams.get("genre");
        const platformParam = searchParams.get("platform");
        if (genreParam) {
            router.push(`/games/sorting?genre=${genreParam}&page=${page}`);
        } else if (platformParam) {
            router.push(`/games/sorting?platform=${platformParam}&page=${page}`);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setLoading(true);
            setCurrentPage(prev => prev + 1);
            updatePageUrl(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setLoading(true);
            setCurrentPage(prev => prev - 1);
            updatePageUrl(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleFirstPage = () => {
        if (currentPage !== 1) {
            setLoading(true);
            setCurrentPage(1);
            updatePageUrl(1);
            window.scrollTo(0, 0);
        }
    };

    const handleLastPage = () => {
        if (currentPage !== totalPages) {
            setLoading(true);
            setCurrentPage(totalPages);
            updatePageUrl(totalPages);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className={styles.page}>
            <Header />
            <main className={loading? styles.mainLoading : styles.main}>
                {loading && (
                    <div className={styles.loading}>
                        <video autoPlay loop playsInline muted>
                            <source src='/loading.webm' type='video/webm' />
                        </video>
                    </div>
                )}
                {!loading && (
                    <>
                        <h2 className={styles.h2Header}>{headerText}</h2>
                        <div className={styles.gamesGrid}>
                            {sortedGames.map((game: Game) => (
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
                                    <p>{game.metacritic || "0"} / 100</p>
                                    <p>{game.genres.map(genre => genre.name).join(', ') || "-"}</p>
                                </Link>
                            ))}
                        </div>
                        <div className={styles.pagination}>
                            <button 
                                onClick={handleFirstPage}
                                disabled={currentPage === 1}
                                className={styles.paginationButton}
                            >
                                <FontAwesomeIcon icon={faAnglesLeft} />
                            </button>
                            <button 
                                onClick={handlePrevPage} 
                                disabled={currentPage === 1}
                                className={styles.paginationButton}
                            >
                                Previous
                            </button>
                            <span className={styles.pageNumber}>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button 
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className={styles.paginationButton}
                            >
                                Next
                            </button>
                            <button 
                                onClick={handleLastPage}
                                disabled={currentPage === totalPages}
                                className={styles.paginationButton}
                            >
                                <FontAwesomeIcon icon={faAnglesRight} />
                            </button>
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default function SortedGames() {
    return (
        <Suspense fallback={
            <div className={styles.page}>
                <Header />
                <main className={styles.main}>
                    <div className={styles.loading}>
                        <video autoPlay loop playsInline muted>
                            <source src='/loading.webm' type='video/webm' />
                        </video>
                    </div>
                </main>
                <Footer />
            </div>
        }>
            <SortedGamesContent />
        </Suspense>
    );
}