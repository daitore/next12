import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout,{sitetitle} from '@/components/Layout'
import Link from 'next/link';
import utilStyle from '@/styles/utils.module.css'
import {getPostsData} from "@/lib/post";



// ssgの場合
export async function getStaticProps() {
    const allPostsData = getPostsData();
    // console.log(allPostsData);

    return {
        props: {
            allPostsData,
        },
    };
}


export default function Home({ allPostsData }) {
  return (
    <Layout home>
        <Head>
            <title>{sitetitle}</title>
        </Head>
        <section className={utilStyle.headingMd}>
            <p>
                ついにDPSワークフロー成功
            </p>
        </section>

        <section className={utilStyle.headingMd}>
            <h2>非エンジニアのブログ</h2>
            <div className={styles.grid}>
                {allPostsData.map(({id,title,date ,thumbnail})=> (
                    <article key={id}>
                     <Link href={`/posts/${id}`}>
                        <img src={thumbnail} className={styles.thumbnailImage} />
                     </Link>
                    {/* ここをクリックすると posts/ssg-ssr.js に飛びます */}
                     <Link href={`/posts/${id}`}className={utilStyle.boldText}>
                         {title}
                     </Link>
                     <br />
                     <small className={utilStyle.lightText}>{date}</small>
                    </article>
                 ))}
            </div>
        </section>
    </Layout>
  );
}