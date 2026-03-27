import Layout from "@/components/Layout";
import { getAllPostIds, getPostData } from '../../lib/post';
import utilStyle from "@/styles/utils.module.css"; // スタイル用
import Head from "next/head"; // タイトル用

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    // 修正1: await を追加
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

// 修正2: 引数で postData を受け取り、中身を表示する
export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyle.headingXl}>{postData.title}</h1>
                <div className={utilStyle.lightText}>
                    {postData.date}
                </div>
                <br />
                {/* HTMLとして本文を流し込む */}
                <div dangerouslySetInnerHTML={{ __html: postData.blogContentHtml }} />
            </article>
        </Layout>
    );
}