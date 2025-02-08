import styles from '@/app/css-modules/showimage.module.css'
import Image from 'next/image'

interface ShowImgProps {
    imgLink: string | null;
    display: boolean;
    setDisplay: (display: boolean) => void;
}

const ShowImg = ({ imgLink, display, setDisplay }: ShowImgProps) => {
    return (
        <div className={!display ? styles.hideImage : styles.viewImage}>
            <div className={styles.xShowCont}>
                <div className={styles.xBtnCont}>
                    <Image
                        onClick={() => setDisplay(!display)}
                        src={'/x-button.png'}
                        alt='icon'
                        width={20}
                        height={20}
                        className={styles.xImage}
                    />
                </div>
                <div className={styles.showImgCont}>
                    <Image
                        src={imgLink || '/alternative_poster_1'}
                        alt="picture"
                        width={1000}
                        height={500}
                        className={styles.screenshot}
                    />
                </div>
            </div>
        </div>
    )
}

export default ShowImg