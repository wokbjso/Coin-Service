import { useQuery } from "react-query";
import { useOutlet, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { faArrowTrendUp,faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Overview=styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props=>props.theme.bgColor};
    border: 1px solid gray;
    padding: 10px 20px;
    border-radius: 10px;
    margin-bottom:30px;
`;

const OverviewItem=styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    font-size:20px;
    width: 50%;
    span:first-child{
        font-size:12px;
        font-weight:400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const PriceHistoryWrapper=styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap:20px;
`;

const PriceHistory=styled.div`
    border: 1px solid gray;
    padding: 10px 20px;
    border-radius: 10px;
    div:first-child{
        margin-bottom:15px;
    }
    div:last-child{
        font-size:30px;
        display: flex;
        justify-content: space-between;
    }
`;

const UporDown=styled.span<{isDecreasing:boolean}>`
    color:${props=>props.isDecreasing ? "blue" : "red"};
`

interface PriceData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD:{
            ath_date: string;
            ath_price: number;
            market_cap: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
       }
    };
}


function Price(){
    const {coinId}=useOutletContext<{coinId:string}>();
    const {isLoading,data}=useQuery<PriceData>("Pricehistory",()=>fetchCoinTickers(coinId));
    return <div>
        {isLoading ? "Loading Price..." : <><Overview>
    <OverviewItem>
        <span>Max Price at</span>
        <span>{data?.quotes.USD.ath_date.substring(0,10)} / {data?.quotes.USD.ath_date.substring(11,19)}</span>
    </OverviewItem>
    <OverviewItem>
    <span>Max Price</span>
        <span>${data?.quotes.USD.ath_price.toFixed(3)}</span>
    </OverviewItem>
    </Overview>
    <PriceHistoryWrapper>
        <PriceHistory>
            <div>Before 1h</div>
            <div>
                <UporDown isDecreasing={String(data?.quotes.USD.percent_change_1h)[0]==='-'}>{data?.quotes.USD.percent_change_1h}%</UporDown>
                <UporDown isDecreasing={String(data?.quotes.USD.percent_change_1h)[0]==='-'}>{String(data?.quotes.USD.percent_change_1h)[0]==='-' ? <FontAwesomeIcon icon={faArrowTrendDown} /> : <FontAwesomeIcon icon={faArrowTrendUp} />}</UporDown>
            </div>
        </PriceHistory>
        <PriceHistory>
            <div>Before 6h</div>
            <div>
                <UporDown isDecreasing={String(data?.quotes.USD.percent_change_6h)[0]==='-'}>{data?.quotes.USD.percent_change_6h}%</UporDown>
                <UporDown isDecreasing={String(data?.quotes.USD.percent_change_6h)[0]==='-'}>{String(data?.quotes.USD.percent_change_6h)[0]==='-' ? <FontAwesomeIcon icon={faArrowTrendDown} /> : <FontAwesomeIcon icon={faArrowTrendUp} />}</UporDown>
            </div>
        </PriceHistory>
        <PriceHistory>
            <div>Before 12h</div>
            <div>
                <UporDown isDecreasing={String(data?.quotes.USD.percent_change_12h)[0]==='-'}>{data?.quotes.USD.percent_change_12h}%</UporDown>
                <UporDown isDecreasing={String(data?.quotes.USD.percent_change_12h)[0]==='-'}>{String(data?.quotes.USD.percent_change_12h)[0]==='-' ? <FontAwesomeIcon icon={faArrowTrendDown} /> : <FontAwesomeIcon icon={faArrowTrendUp} />}</UporDown>
            </div>
        </PriceHistory>
        <PriceHistory>
            <div>Before 24h</div>
            <div>
                <UporDown isDecreasing={String(data?.quotes.USD.percent_change_24h)[0]==='-'}>{data?.quotes.USD.percent_change_24h}%</UporDown>
                <UporDown isDecreasing={String(data?.quotes.USD.percent_change_24h)[0]==='-'}>{String(data?.quotes.USD.percent_change_24h)[0]==='-' ? <FontAwesomeIcon icon={faArrowTrendDown} /> : <FontAwesomeIcon icon={faArrowTrendUp} />}</UporDown>
            </div>
        </PriceHistory>
        <PriceHistory>
            <div>Before 7d</div>
            <div>
                <UporDown isDecreasing={String(data?.quotes.USD.percent_change_7d)[0]==='-'}>{data?.quotes.USD.percent_change_7d}%</UporDown>
                <UporDown isDecreasing={String(data?.quotes.USD.percent_change_7d)[0]==='-'}>{String(data?.quotes.USD.percent_change_7d)[0]==='-' ? <FontAwesomeIcon icon={faArrowTrendDown} /> : <FontAwesomeIcon icon={faArrowTrendUp} />}</UporDown>
            </div>
        </PriceHistory>
        <PriceHistory>
            <div>Before 30d</div>
            <div>
                <UporDown isDecreasing={String(data?.quotes.USD.percent_change_30d)[0]==='-'}>{data?.quotes.USD.percent_change_30d}%</UporDown>
                <UporDown isDecreasing={String(data?.quotes.USD.percent_change_30d)[0]==='-'}>{String(data?.quotes.USD.percent_change_30d)[0]==='-' ? <FontAwesomeIcon icon={faArrowTrendDown} /> : <FontAwesomeIcon icon={faArrowTrendUp} />}</UporDown>
            </div>
        </PriceHistory>
    </PriceHistoryWrapper>
    </>}</div>
}

export default Price;