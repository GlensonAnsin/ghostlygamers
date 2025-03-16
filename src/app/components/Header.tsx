'use client';

import Image from "next/image";
import styles from "@/app/css-modules/header.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSun, faMoon, faBars, faXmark, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileGenreOpen, setIsMobileGenreOpen] = useState(false);
  const [isMobilePlatformOpen, setIsMobilePlatformOpen] = useState(false);
  const router = useRouter();

  const handleDropdown = (category: string) => {
    if (category === 'genres') {
      document.getElementsByClassName(styles.genreDropdownContent)[0].classList.toggle(styles.show);
      document.getElementsByClassName(styles.platformDropdownContent)[0].classList.remove(styles.show);
    } else {
      document.getElementsByClassName(styles.platformDropdownContent)[0].classList.toggle(styles.show);
      document.getElementsByClassName(styles.genreDropdownContent)[0].classList.remove(styles.show);
    }
  }

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
          <div className={styles.genreDropdown}>
            <button className={styles.dropbtn} onClick={() => handleDropdown('genres')}>
              Genres
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
            <div className={styles.genreDropdownContent}>
              <Link href='/games/sorting?genre=4'>Action</Link>
              <Link href='/games/sorting?genre=51'>Indie</Link>
              <Link href='/games/sorting?genre=3'>Adventure</Link>
              <Link href='/games/sorting?genre=5'>RPG</Link>
              <Link href='/games/sorting?genre=10'>Strategy</Link>
              <Link href='/games/sorting?genre=2'>Shooter</Link>
              <Link href='/games/sorting?genre=40'>Casual</Link>
              <Link href='/games/sorting?genre=14'>Simulation</Link>
              <Link href='/games/sorting?genre=7'>Puzzle</Link>
              <Link href='/games/sorting?genre=11'>Arcade</Link>
              <Link href='/games/sorting?genre=83'>Platformer</Link>
              <Link href='/games/sorting?genre=59'>Multiplayer</Link>
              <Link href='/games/sorting?genre=1'>Racing</Link>
              <Link href='/games/sorting?genre=15'>Sports</Link>
              <Link href='/games/sorting?genre=6'>Fighting</Link>
              <Link href='/games/sorting?genre=19'>Family</Link>
              <Link href='/games/sorting?genre=28'>Board Games</Link>
              <Link href='/games/sorting?genre=17'>Card</Link>
              <Link href='/games/sorting?genre=34'>Educational</Link>
            </div>
          </div>
          <div className={styles.platformDropdown}>
            <button className={styles.dropbtn} onClick={() => handleDropdown('platforms')}>
              Platforms
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
            <div className={styles.platformDropdownContent}>
              <Link href='/games/sorting?platform=4'>PC</Link>
              <Link href='/games/sorting?platform=187'>PS5</Link>
              <Link href='/games/sorting?platform=18'>PS4</Link>
              <Link href='/games/sorting?platform=16'>PS3</Link>
              <Link href='/games/sorting?platform=15'>PS2</Link>
              <Link href='/games/sorting?platform=27'>PS1</Link>
              <Link href='/games/sorting?platform=1'>Xbox One</Link>
              <Link href='/games/sorting?platform=186'>Xbox Series S/X</Link>
              <Link href='/games/sorting?platform=14'>Xbox 360</Link>
              <Link href='/games/sorting?platform=80'>Xbox</Link>
              <Link href='/games/sorting?platform=7'>Nintendo Switch</Link>
              <Link href='/games/sorting?platform=83'>Nintendo 64</Link>
              <Link href='/games/sorting?platform=8'>Nintendo 3DS</Link>
              <Link href='/games/sorting?platform=9'>Nintendo DS</Link>
              <Link href='/games/sorting?platform=13'>Nintendo DSi</Link>
              <Link href='/games/sorting?platform=3'>iOS</Link>
              <Link href='/games/sorting?platform=21'>Android</Link>
              <Link href='/games/sorting?platform=5'>macOS</Link>
              <Link href='/games/sorting?platform=6'>Linux</Link>
              <Link href='/games/sorting?platform=19'>PS Vita</Link>
              <Link href='/games/sorting?platform=17'>PSP</Link>
              <Link href='/games/sorting?platform=10'>Wii U</Link>
              <Link href='/games/sorting?platform=11'>Wii</Link>
              <Link href='/games/sorting?platform=105'>GameCube</Link>
              <Link href='/games/sorting?platform=24'>Game Boy Advance</Link>
              <Link href='/games/sorting?platform=43'>Game Boy Color</Link>
              <Link href='/games/sorting?platform=26'>Game Boy</Link>
              <Link href='/games/sorting?platform=79'>SNES</Link>
              <Link href='/games/sorting?platform=49'>NES</Link>
              <Link href='/games/sorting?platform=55'>Classic Macintosh</Link>
              <Link href='/games/sorting?platform=41'>Apple II</Link>
              <Link href='/games/sorting?platform=166'>Commodore / Amiga</Link>
              <Link href='/games/sorting?platform=28'>Atari 7800</Link>
              <Link href='/games/sorting?platform=31'>Atari 5200</Link>
              <Link href='/games/sorting?platform=23'>Atari 2600</Link>
              <Link href='/games/sorting?platform=22'>Atari Flashback</Link>
              <Link href='/games/sorting?platform=25'>Atari 8-bit</Link>
              <Link href='/games/sorting?platform=34'>Atari ST</Link>
              <Link href='/games/sorting?platform=46'>Atari Lynx</Link>
              <Link href='/games/sorting?platform=50'>Atari XEGS</Link>
              <Link href='/games/sorting?platform=167'>Genesis</Link>
              <Link href='/games/sorting?platform=107'>SEGA Saturn</Link>
              <Link href='/games/sorting?platform=119'>SEGA CD</Link>
              <Link href='/games/sorting?platform=117'>SEGA 32X</Link>
              <Link href='/games/sorting?platform=74'>SEGA Master System</Link>
              <Link href='/games/sorting?platform=106'>Dreamcast</Link>
              <Link href='/games/sorting?platform=111'>3DO</Link>
              <Link href='/games/sorting?platform=112'>Jaguar</Link>
              <Link href='/games/sorting?platform=77'>Game Gear</Link>
              <Link href='/games/sorting?platform=12'>Neo Geo</Link>
            </div>
          </div>
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
        <div className={styles.mobileDropdownContainer}>
          <button 
            className={styles.mobileDropbtn}
            onClick={() => setIsMobileGenreOpen(!isMobileGenreOpen)}
          >
            Genres <FontAwesomeIcon icon={faCaretDown} />
          </button>
          <div className={`${styles.mobileDropdownContent} ${isMobileGenreOpen ? styles.show : ''}`}>
            <Link href='/games/sorting?genre=4' onClick={() => handleNavigation('/games/sorting?genre=4')}>Action</Link>
            <Link href='/games/sorting?genre=51' onClick={() => handleNavigation('/games/sorting?genre=51')}>Indie</Link>
            <Link href='/games/sorting?genre=3' onClick={() => handleNavigation('/games/sorting?genre=3')}>Adventure</Link>
            <Link href='/games/sorting?genre=5' onClick={() => handleNavigation('/games/sorting?genre=5')}>RPG</Link>
            <Link href='/games/sorting?genre=10' onClick={() => handleNavigation('/games/sorting?genre=10')}>Strategy</Link>
            <Link href='/games/sorting?genre=2' onClick={() => handleNavigation('/games/sorting?genre=2')}>Shooter</Link>
            <Link href='/games/sorting?genre=40' onClick={() => handleNavigation('/games/sorting?genre=40')}>Casual</Link>
            <Link href='/games/sorting?genre=14' onClick={() => handleNavigation('/games/sorting?genre=14')}>Simulation</Link>
            <Link href='/games/sorting?genre=7' onClick={() => handleNavigation('/games/sorting?genre=7')}>Puzzle</Link>
            <Link href='/games/sorting?genre=11' onClick={() => handleNavigation('/games/sorting?genre=11')}>Arcade</Link>
            <Link href='/games/sorting?genre=83' onClick={() => handleNavigation('/games/sorting?genre=83')}>Platformer</Link>
            <Link href='/games/sorting?genre=59' onClick={() => handleNavigation('/games/sorting?genre=59')}>Multiplayer</Link>
            <Link href='/games/sorting?genre=1' onClick={() => handleNavigation('/games/sorting?genre=1')}>Racing</Link>
            <Link href='/games/sorting?genre=15' onClick={() => handleNavigation('/games/sorting?genre=15')}>Sports</Link>
            <Link href='/games/sorting?genre=6' onClick={() => handleNavigation('/games/sorting?genre=6')}>Fighting</Link>
            <Link href='/games/sorting?genre=19' onClick={() => handleNavigation('/games/sorting?genre=19')}>Family</Link>
            <Link href='/games/sorting?genre=28' onClick={() => handleNavigation('/games/sorting?genre=28')}>Board Games</Link>
            <Link href='/games/sorting?genre=17' onClick={() => handleNavigation('/games/sorting?genre=17')}>Card</Link>
            <Link href='/games/sorting?genre=34' onClick={() => handleNavigation('/games/sorting?genre=34')}>Educational</Link>
          </div>
        </div>

        <div className={styles.mobileDropdownContainer}>
          <button 
            className={styles.mobileDropbtn}
            onClick={() => setIsMobilePlatformOpen(!isMobilePlatformOpen)}
          >
            Platforms <FontAwesomeIcon icon={faCaretDown} />
          </button>
          <div className={`${styles.mobileDropdownContent} ${isMobilePlatformOpen ? styles.show : ''}`}>
            <Link href='/games/sorting?platform=4' onClick={() => handleNavigation('/games/sorting?platform=4')}>PC</Link>
            <Link href='/games/sorting?platform=187' onClick={() => handleNavigation('/games/sorting?platform=187')}>PS5</Link>
            <Link href='/games/sorting?platform=18' onClick={() => handleNavigation('/games/sorting?platform=18')}>PS4</Link>
            <Link href='/games/sorting?platform=16' onClick={() => handleNavigation('/games/sorting?platform=16')}>PS3</Link>
            <Link href='/games/sorting?platform=15' onClick={() => handleNavigation('/games/sorting?platform=15')}>PS2</Link>
            <Link href='/games/sorting?platform=27' onClick={() => handleNavigation('/games/sorting?platform=27')}>PS1</Link>
            <Link href='/games/sorting?platform=1' onClick={() => handleNavigation('/games/sorting?platform=1')}>Xbox One</Link>
            <Link href='/games/sorting?platform=186' onClick={() => handleNavigation('/games/sorting?platform=186')}>Xbox Series S/X</Link>
            <Link href='/games/sorting?platform=14' onClick={() => handleNavigation('/games/sorting?platform=14')}>Xbox 360</Link>
            <Link href='/games/sorting?platform=80' onClick={() => handleNavigation('/games/sorting?platform=80')}>Xbox</Link>
            <Link href='/games/sorting?platform=7' onClick={() => handleNavigation('/games/sorting?platform=7')}>Nintendo Switch</Link>
            <Link href='/games/sorting?platform=83' onClick={() => handleNavigation('/games/sorting?platform=83')}>Nintendo 64</Link>
            <Link href='/games/sorting?platform=8' onClick={() => handleNavigation('/games/sorting?platform=8')}>Nintendo 3DS</Link>
            <Link href='/games/sorting?platform=9' onClick={() => handleNavigation('/games/sorting?platform=9')}>Nintendo DS</Link>
            <Link href='/games/sorting?platform=13' onClick={() => handleNavigation('/games/sorting?platform=13')}>Nintendo DSi</Link>
            <Link href='/games/sorting?platform=3' onClick={() => handleNavigation('/games/sorting?platform=3')}>iOS</Link>
            <Link href='/games/sorting?platform=21' onClick={() => handleNavigation('/games/sorting?platform=21')}>Android</Link>
            <Link href='/games/sorting?platform=5' onClick={() => handleNavigation('/games/sorting?platform=5')}>macOS</Link>
            <Link href='/games/sorting?platform=6' onClick={() => handleNavigation('/games/sorting?platform=6')}>Linux</Link>
            <Link href='/games/sorting?platform=19' onClick={() => handleNavigation('/games/sorting?platform=19')}>PS Vita</Link>
            <Link href='/games/sorting?platform=17' onClick={() => handleNavigation('/games/sorting?platform=17')}>PSP</Link>
            <Link href='/games/sorting?platform=10' onClick={() => handleNavigation('/games/sorting?platform=10')}>Wii U</Link>
            <Link href='/games/sorting?platform=11' onClick={() => handleNavigation('/games/sorting?platform=11')}>Wii</Link>
            <Link href='/games/sorting?platform=105' onClick={() => handleNavigation('/games/sorting?platform=105')}>GameCube</Link>
            <Link href='/games/sorting?platform=24' onClick={() => handleNavigation('/games/sorting?platform=24')}>Game Boy Advance</Link>
            <Link href='/games/sorting?platform=43' onClick={() => handleNavigation('/games/sorting?platform=43')}>Game Boy Color</Link>
            <Link href='/games/sorting?platform=26' onClick={() => handleNavigation('/games/sorting?platform=26')}>Game Boy</Link>
            <Link href='/games/sorting?platform=79' onClick={() => handleNavigation('/games/sorting?platform=79')}>SNES</Link>
            <Link href='/games/sorting?platform=49' onClick={() => handleNavigation('/games/sorting?platform=49')}>NES</Link>
            <Link href='/games/sorting?platform=55' onClick={() => handleNavigation('/games/sorting?platform=55')}>Classic Macintosh</Link>
            <Link href='/games/sorting?platform=41' onClick={() => handleNavigation('/games/sorting?platform=41')}>Apple II</Link>
            <Link href='/games/sorting?platform=166' onClick={() => handleNavigation('/games/sorting?platform=166')}>Commodore / Amiga</Link>
            <Link href='/games/sorting?platform=28' onClick={() => handleNavigation('/games/sorting?platform=28')}>Atari 7800</Link>
            <Link href='/games/sorting?platform=31' onClick={() => handleNavigation('/games/sorting?platform=31')}>Atari 5200</Link>
            <Link href='/games/sorting?platform=23' onClick={() => handleNavigation('/games/sorting?platform=23')}>Atari 2600</Link>
            <Link href='/games/sorting?platform=22' onClick={() => handleNavigation('/games/sorting?platform=22')}>Atari Flashback</Link>
            <Link href='/games/sorting?platform=25' onClick={() => handleNavigation('/games/sorting?platform=25')}>Atari 8-bit</Link>
            <Link href='/games/sorting?platform=34' onClick={() => handleNavigation('/games/sorting?platform=34')}>Atari ST</Link>
            <Link href='/games/sorting?platform=46' onClick={() => handleNavigation('/games/sorting?platform=46')}>Atari Lynx</Link>
            <Link href='/games/sorting?platform=50' onClick={() => handleNavigation('/games/sorting?platform=50')}>Atari XEGS</Link>
            <Link href='/games/sorting?platform=167' onClick={() => handleNavigation('/games/sorting?platform=167')}>Genesis</Link>
            <Link href='/games/sorting?platform=107' onClick={() => handleNavigation('/games/sorting?platform=107')}>SEGA Saturn</Link>
            <Link href='/games/sorting?platform=119' onClick={() => handleNavigation('/games/sorting?platform=119')}>SEGA CD</Link>
            <Link href='/games/sorting?platform=117' onClick={() => handleNavigation('/games/sorting?platform=117')}>SEGA 32X</Link>
            <Link href='/games/sorting?platform=74' onClick={() => handleNavigation('/games/sorting?platform=74')}>SEGA Master System</Link>
            <Link href='/games/sorting?platform=106' onClick={() => handleNavigation('/games/sorting?platform=106')}>Dreamcast</Link>
            <Link href='/games/sorting?platform=111' onClick={() => handleNavigation('/games/sorting?platform=111')}>3DO</Link>
            <Link href='/games/sorting?platform=112' onClick={() => handleNavigation('/games/sorting?platform=112')}>Jaguar</Link>
            <Link href='/games/sorting?platform=77' onClick={() => handleNavigation('/games/sorting?platform=77')}>Game Gear</Link>
            <Link href='/games/sorting?platform=12' onClick={() => handleNavigation('/games/sorting?platform=12')}>Neo Geo</Link>
          </div>
        </div>
      </div>
    </>
  );
}