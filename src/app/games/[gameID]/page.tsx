import { notFound } from 'next/navigation';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GameDetail from "@/app/components/GameDetail";
import { 
    fetchGameDetails, 
    fetchSimilarGames,
    fetchGameTrailers,
    fetchGameScreenshots,
    fetchGameAchievements,
    fetchGameDLC,
    fetchGameStores,
    fetchRecommendedGames
} from "@/app/lib/gameApi";
import styles from "@/app/css-modules/game.module.css";

interface PageProps {
    params: Promise<{ gameID: string }>
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 3600;

export default async function GameDetailPage({ params }: PageProps) {
    const gameID = (await params).gameID;
    try {
        const [
            gameDetails,
            similarGames,
            trailers,
            screenshots,
            achievements,
            dlc,
            gameStores,
            recommendedGames
        ] = await Promise.all([
            fetchGameDetails(gameID),
            fetchSimilarGames(gameID),
            fetchGameTrailers(gameID),
            fetchGameScreenshots(gameID),
            fetchGameAchievements(gameID),
            fetchGameDLC(gameID),
            fetchGameStores(gameID),
            fetchRecommendedGames(gameID)
        ]);

        if (!gameDetails) return notFound();

        return (
            <div className={styles.page}>
                <Header />
                <main className={styles.main}>
                    <GameDetail 
                        gameDetails={gameDetails}
                        similarGames={similarGames}
                        trailers={trailers}
                        screenshots={screenshots}
                        achievements={achievements}
                        dlc={dlc}
                        gameStores={gameStores}
                        recommendedGames={recommendedGames}
                    />
                </main>
                <Footer />
            </div>
        );
    } catch (error) {
        console.error('Error loading game details:', error);
        return notFound();
    }
}