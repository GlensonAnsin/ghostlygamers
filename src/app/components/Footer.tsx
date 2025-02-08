'use client';

import styles from '@/app/css-modules/footer.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faGithub, faFacebook } from "@fortawesome/free-brands-svg-icons";
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <Link href="/" className={styles.logoSection}>
                        <Image
                            src="/logo.png"
                            alt="Ghostly Gamers Logo"
                            width={100}
                            height={100}
                            className={styles.footerLogo}
                        />
                        <span className={styles.logoText}>
                            Ghostly Gamers
                        </span>
                    </Link>
                </div>

                <div className={styles.footerSection}>
                    <div className={styles.socialLinks}>
                        <Link href="https://github.com/GlensonAnsin" target="_blank">
                            <FontAwesomeIcon icon={faGithub} />
                        </Link>
                        <Link href="https://www.facebook.com/glenson.ansin" target="_blank">
                            <FontAwesomeIcon icon={faFacebook} />
                        </Link>
                        <Link href="https://www.instagram.com/glenson_ansin/" target='_blank'>
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                    </div>
                </div>

                <div className={styles.footerSection}>
                    <nav className={styles.footerNav}>
                        <Link href="/contact">Contact</Link>
                        <Link href="/feedback">Feedback</Link>
                    </nav>
                </div>
            </div>
            
            <div className={styles.bottomBar}>
                <p>&copy; 2025 Ghostly Gamers. All rights reserved.</p>
                <p className={styles.ghostP}>Developed by <span className={styles.ghostSpan}>
                    GHOST
                    <FontAwesomeIcon icon={faGhost} className={styles.ghostIcon} />
                </span></p>
            </div>
        </footer>
    );
}
