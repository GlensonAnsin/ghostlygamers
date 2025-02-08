import { fetchCarouselGames, fetchHomeTrendingGames, fetchHomeLatestGames, fetchHomeTopGames, fetchHomeUpdatedGames } from '@/app/lib/gameApi';
import styles from '@/app/page.module.css';
import HomeGames from '@/app/components/HomeGames';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default async function Home() {
  const carouselGames = await fetchCarouselGames();
  const homeTrendingGames = await fetchHomeTrendingGames();
  const homeLatestGames = await fetchHomeLatestGames();
  const homeTopGames = await fetchHomeTopGames();
  const homeUpdatedGames = await fetchHomeUpdatedGames();

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <HomeGames
          carouselGames={carouselGames}
          homeTrendingGames={homeTrendingGames}
          homeLatestGames={homeLatestGames}
          homeTopGames={homeTopGames}
          homeUpdatedGames={homeUpdatedGames}
        />
      </main>
      <Footer />
    </div>
  );
}