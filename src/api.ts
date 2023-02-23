import axios from "axios";

const BASE_URL="https://api.coinpaprika.com/v1";

export function fetchCoins(){
    return axios.get(`${BASE_URL}/coins`)
    .then(res=>res.data);
}

export function fetchCoinInfo(coinId:string|undefined){
    return axios.get(`${BASE_URL}/coins/${coinId}`)
    .then(res=>res.data);
}

export function fetchCoinTickers(coinId:string|undefined){
    return axios.get(`${BASE_URL}/tickers/${coinId}`)
    .then(res=>res.data);
}

export function fetchCoinHistory(coinId:string){
    return axios.get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
    .then(res=>res.data);
}

