const fs = require('fs/promises');
const path = require('node:path');

const dbPath = (path.join(process.cwd(),'dataBase','users.json'))
module.exports = {
    reader: async () => {
     const buffer = await fs.readFile(dbPath);
     const data= buffer.toString();
     return data? JSON.parse(data): [];
    },
    writer: async (users) => {
     await fs.writeFile(dbPath,JSON.stringify(users));

    }
}