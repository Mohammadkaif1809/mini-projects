async function getCoins() {
    try{
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=1")
        const data = await response.json();

        const coinlist = document.querySelector('#market');
        coinlist.innerHTML = "";
        data.forEach((coin)=>{
            coinlist.innerHTML += 
            `<div class="coin">
                    <img src= "${coin.image}" alt = ${coin.name}>
                    <div>
                        <h3>₹${coin.current_price.toLocaleString()}</h3>
                        <p>${coin.name}</p>
                    </div>
            </div>`
        })
    

    }catch(err){
        console.error('fetch error : ',err);

        const coinlist = document.querySelector('#market');

        coinlist.innerHTML =  `
            <p style="text-align:center; color:#ff6b6b;">
                Failed to load market data. Please refresh after a moment.
            </p>`;
    }
    
}

getCoins();