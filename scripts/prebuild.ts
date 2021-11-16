import { promises as fs } from 'fs';

const main = async () => {
  generateUnavailableAccountIdsJson();
};

/**

- 使用不可プロフィールIDリストの生成。
- 生成されたJSONはクライアント・サーバーサイドでのバリデーションに使用します。
*/
const generateUnavailableAccountIdsJson = async () => {
  const fileNames = await fs.readdir('./src/pages');
  const unavailableAccountIds = fileNames.map((fileName) =>
    fileName.replace(/.tsx|.jsx/, '')
  );
  await fs.writeFile(
    './public/unavailableAccountIds.json',
    JSON.stringify(unavailableAccountIds, null, 2)
  );
};

main();

export {};
