const lighthouse = require('@lighthouse-web3/sdk');
const path = require('path');

async function main() {
  const apiKey = process.env.LIGHTHOUSE_API_KEY;

  // Get the absolute path of the current working directory
  const sourcePath = path.resolve('./');

  console.log(`Uploading directory: ${sourcePath}`);

  try {
    const response = await lighthouse.uploadDirectory(sourcePath, apiKey);

    console.log('Upload response:', response);

    if (response && response.data && response.data.Hash) {
      const cid = response.data.Hash;
      console.log(`Uploaded to IPFS: ${cid}`);
      console.log(`::set-output name=cid::${cid}`);
    } else {
      console.error('Unexpected response format:', response);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error during upload:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
