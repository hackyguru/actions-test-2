const lighthouse = require('@lighthouse-web3/sdk');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function main() {
  const apiKey = process.env.LIGHTHOUSE_API_KEY;

  const formData = new FormData();

  function addFilesToForm(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        addFilesToForm(filePath);
      } else {
        formData.append('file', fs.createReadStream(filePath), { filepath: filePath });
      }
    }
  }

  addFilesToForm('./');

  const uploadResponse = await lighthouse.upload(formData, apiKey);

  const cid = uploadResponse.data.Hash;
  console.log(`Uploaded to IPFS : ${cid}`);
  console.log(`::set-output name=cid::${cid}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
