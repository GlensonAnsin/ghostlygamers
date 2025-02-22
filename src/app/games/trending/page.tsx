'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import styles from "@/app/css-modules/gamearr.module.css";
import Image from "next/image";
import { fetchAllTrendingGames } from "@/app/lib/gameApi";
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

function TrendingGamesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [trendingGames, setTrendingGames] = useState<Game[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const pageParam = searchParams.get("page");
        setCurrentPage(pageParam ? parseInt(pageParam) : 1);
    }, [searchParams]);

    useEffect(() => {
        const loadTrendingGames = async () => {
            try {
                const data = await fetchAllTrendingGames(currentPage);
                setTrendingGames(data.results);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error loading games:', error);
            } finally {
                setLoading(false);
            }
        }
        loadTrendingGames();
    }, [currentPage]);

    const updatePageUrl = (page: number) => {
        router.push(`/games/trending?page=${page}`);
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
                        <h2 className={styles.h2Header}>Trending Games</h2>
                        <div className={styles.gamesGrid}>
                            {trendingGames.map((game: Game) => (
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
    )
}

export default function TrendingGames() {
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
            <TrendingGamesContent />
        </Suspense>
    );
}