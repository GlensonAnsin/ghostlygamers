'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import styles from "@/app/css-modules/gamearr.module.css";
import Image from "next/image";
import { fetchSearchedGames } from "@/app/lib/gameApi";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatDate from "@/app/lib/formatDate";
import Link from 'next/link';

interface Game {
    id: number;
    name: string;
    background_image: string;
    released: string;
    metacritic: number;
    genres: Array<{ name: string }>;
}

function SearchGamesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [searchResults, setSearchResults] = useState<Game[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const pageParam = searchParams.get("page");
        setCurrentPage(pageParam ? parseInt(pageParam) : 1);
    }, [searchParams]);

    useEffect(() => {
        const loadSearchResults = async () => {
            if (!query) {
                setSearchResults([]);
                setLoading(false);
                return;
            }

            try {
                const data = await fetchSearchedGames(query, currentPage);
                setSearchResults(data.results);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error loading search results:', error);
            } finally {
                setLoading(false);
            }
        };
        loadSearchResults();
    }, [query, currentPage]);

    const updatePageUrl = (page: number) => {
        router.push(`/games/search_game?q=${query}&page=${page}`);
    };

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
                        <h2 className={styles.h2Header}>Search Results for &quot;{query}&quot;</h2>
                        {searchResults.length === 0 ? (
                            <div className={styles.noResults}>No games found matching your search.</div>
                        ) : (
                            <>
                                <div className={styles.gamesGrid}>
                                    {searchResults.map((game: Game) => (
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
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default function SearchGames() {
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
            <SearchGamesContent />
        </Suspense>
    );
}