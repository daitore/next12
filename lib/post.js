import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// cwd=カレントディレクトリ
const POSTS_DIR = path.join(process.cwd(), 'posts');
// md ファイルを読み込むための関数
export function getPostsData() {
    const fileNames = fs.readdirSync(POSTS_DIR);
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');  //ファイル名
        // Markdown ファイルを文字列として読み込む
        const fullPath = path.join(POSTS_DIR, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
            // ここが重要！日付データを文字列に変換します
            date: matterResult.data.date.toString()
        }
    });
    return allPostsData;
}

// getStaticPathでreturnで使うpathを取得
export function getAllPostIds() { // 引数の (id) は不要なので消してOK
    const fileNames = fs.readdirSync(POSTS_DIR);
    return fileNames.map(fileName => {
        // ↓ return と { の間に改行を入れないのがコツです
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

// idに基づいてブログ投稿データを返す関数
export async function getPostData(id) {
    const fullPath = path.join(POSTS_DIR, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const blogcontent = await remark()
        .use(html)
        .process(matterResult.content);

    const blogContentHtml = blogcontent.toString();

    return {
        id,
        blogContentHtml,
        ...matterResult.data,
         // ここが重要！日付データを文字列に変換します
        date: matterResult.data.date.toString()
    };
}