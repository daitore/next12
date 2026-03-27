import Head from "next/head";
import Link from 'next/link';
import styles from '@/components/layout.module.css'
import utilStyle from '@/styles/utils.module.css'

const name = "shin Code";
export  const  sitetitle = "Next.js Blog";
// 1. 「export default」を付けて、他のファイルから読み込めるようにする
// 2. 引数に「{ children }」を追加して、ページの中身を受け取れるようにする
export default function Layout({ children,home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
    {home ? (
        <>
            <img
                src="/images/profile.png"
                className={`${utilStyle.borderCircle} ${styles.headerHomeImage}`}
                alt={name}
            />
            <h1 className={utilStyle.heading2Xl}>{name}</h1>
        </>
    ) : (
        <>
            {/* 修正ポイント：波カッコをスッキリさせました */}
            <Link href="/">
                <img
                    src="/images/profile.png"
                    className={utilStyle.borderCircle}
                    alt={name}
                />
            </Link>
            <h1 className={utilStyle.heading2Xl}>{name}</h1>
        </>
    )}
            </header>

            {/* 3. ここに各ページ（index.jsなど）の中身が表示されるようにする */}
            <main>{children}</main>
            {!home && (     // 4. homeがfalseのときだけ、トップページへのリンクを表示する
                <div>
                    <Link href="/">←ホームへ戻る</Link>
                </div>
            )}
        </div>
    );
}