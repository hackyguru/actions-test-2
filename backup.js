const lighthouse = require('@lighthouse-web3/sdk');
const path = require('path');

async function main() {
  // Get the current working directory (root of the repository)
  const repoRoot = process.cwd();

  const uploadResponse = await lighthouse.upload(
    repoRoot, 
    '2fc357f7.f952020a20bd4e97afa7aca88221116d'
  );

  console.log(uploadResponse);
  const cid = uploadResponse.data.Hash;
  console.log(`Uploaded to IPFS : ${cid}`);
  process.stdout.write(`::set-output name=cid::${cid}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
