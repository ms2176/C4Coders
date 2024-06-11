// Simple in-memory database
const users = {
    "user1": { tasks: 0, nfts: [] }
  };
  
  // NFT "database"
  const nfts = [
    { id: 1, name: "Bronze Star", image: "🌟" },
    { id: 2, name: "Silver Moon", image: "🌙" },
    { id: 3, name: "Golden Sun", image: "☀️" }
  ];
  
  // Simulating blockchain functions
  function mintNFT(userId, nftId) {
    const user = users[userId];
    const nft = nfts.find(n => n.id === nftId);
    
    if (user && nft) {
      user.nfts.push(nft);
      console.log(`Minted ${nft.name} for ${userId}`);
      updateNFTList();
    }
  }
  
  function completeTask() {
    const userId = "user1";  // In a real app, you'd get this from login
    users[userId].tasks += 1;
    
    // Reward logic: every 5 tasks, get a better NFT
    if (users[userId].tasks % 5 === 0) {
      const nftId = Math.min(3, Math.ceil(users[userId].tasks / 5));
      mintNFT(userId, nftId);
    }
  }
  
  function updateNFTList() {
    const nftList = document.getElementById("nft-list");
    nftList.innerHTML = "";
    users.user1.nfts.forEach(nft => {
      const li = document.createElement("li");
      li.textContent = `${nft.image} ${nft.name}`;
      nftList.appendChild(li);
    });
  }
  
  // Initialize
  updateNFTList();