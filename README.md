### Bul 
With Social Network building on web3 in full swing, I decided to build an API that can recommend who to follow.
Bul is a following recommendations api built on top of the KNN3 api

Bul has multiple ways to recommend:
* /FromFollow/:address
* /SimilarNFTs/:address
* More coming
* /DAOToken/:address
* /DAOActivity/:address
* /POAP/:address
* /Overall/:address


/FromFollow is based on a classic recommendation tactic where it checks who you follow,who follows you and filters out followers who you have not followed back yet
![Alt text](https://bafybeifkpuf4ppf2vvgy7oqw4qbeon2al4rnwk7uxmhaeyj63qvn6aemua.ipfs.nftstorage.link/ "FromFollow")

/SimilarNFTs looks at NFT's owned by the address and recommends people to follow who own NFT's in the same collection
![Alt text](https://bafybeibecc4ydlnlurki3y2vk3nrbmxcm2kaw7sg5ynqngqcjbhl3ucibe.ipfs.dweb.link/Screenshot%202022-06-01%20at%2018.38.31.png "Similar NFTs")
/DAOToken looks at the Governance tokens owned by the address and recommends people who also own the governance token
/DAOActivity uses the Snapshot API and recommends people who are active in the voting/proposal process
/POAP recommends people who went to the same events as you
/Overall is a more-drilled down approach, combines some of the above




#### Built with
Javascript, Express, Node

### Run Project
npm install
npm start