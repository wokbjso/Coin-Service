import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link, Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { isDarkAtom } from "../atom";

const Container=styled.div`
    max-width:600px;
    min-width: 500px;
    margin:0 auto;
    padding:0px 20px;
`;

const Header=styled.div`
    height:10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HeaderItem=styled.div`
    width:33%;
    display: flex;
    justify-content: center;
`;

const Title=styled.h1`
    font-size:48px;
    color:${props=>props.theme.accentColor};
`;

const Button=styled.button`
    background-color: ${props=>props.theme.accentColor};
    border:none;
    border-radius: 20px;
    padding:4px 12px;
    &:hover{
        border:1px solid ${props=>props.theme.textColor};
        cursor:pointer;
    }
`;

const Loading=styled.div`
    text-align:center;
    font-size:30px;
`

const Overview=styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props=>props.theme.bgColor};
    border: 1px solid gray;
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewItem=styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    font-size:20px;
    width: 33.3%;
    span:first-child{
        font-size:12px;
        font-weight:400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description=styled.div`
    margin:20px 0px;
    font-size:25px;
`;

const Tabs=styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    margin:25px 0px;
    gap:10px;
`;

const Tab=styled.span<{isActive:boolean}>`
    text-align:center;
    text-transform:uppercase;
    font-size:15px;
    font-weight:400;
    background-color: rgba(0,0,0,0.5);
    padding:10px 0px;
    margin-bottom: 10px;
    border-radius: 10px;
    color:${props=>props.isActive ? props.theme.accentColor : props.theme.textColor};
    &:hover{
        color:${props=>props.theme.accentColor};
        transition:color 0.3s ease-in;
    }
`;

interface InfoData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

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


function Coin(){
    const {coinId}=useParams();
    const location=useLocation();
    const state=location.state;
    const priceMatch=useMatch("/:coinId/price");
    const chartMatch=useMatch("/:coinId/chart");
    const {isLoading:infoLoading,data:infoData}=useQuery<InfoData>("info",()=>fetchCoinInfo(coinId));
    const {isLoading:tickersLoading,data:tickersData}=useQuery<PriceData>("tickers",()=>fetchCoinTickers(coinId));
    const setDarkAtom=useSetRecoilState(isDarkAtom);
    const toggleDarkAtom=()=>setDarkAtom(current=>!current);
    const loading=infoLoading||tickersLoading;
    return <Container>
        <HelmetProvider>
            <Helmet>
                <title>{state?.name ? state.name : loading ? "loading" : infoData?.name}</title>
            </Helmet>
        </HelmetProvider>
    <Header>
        <HeaderItem></HeaderItem>
        <HeaderItem>
            <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name} </Title>
        </HeaderItem>
        <HeaderItem>
            <Button onClick={toggleDarkAtom}>Toggle Mode</Button>
        </HeaderItem>
    </Header>
    {loading ? <Loading>Loading...</Loading> : 
    <>
    <Overview>
        <OverviewItem>
            <span>Rank:</span>
            <span>{infoData?.rank}</span>
        </OverviewItem>
        <OverviewItem>
            <span>Symbol:</span>
            <span>${infoData?.symbol}</span>
        </OverviewItem>
        <OverviewItem>
            <span>Price:</span>
            <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
        </OverviewItem>
    </Overview>
    <Description>{infoData?.description}</Description>
    <Overview>
        <OverviewItem>
            <span>Total Supply:</span>
            <span>{tickersData?.total_supply}</span>
        </OverviewItem>
        <OverviewItem>
            <span>Max Supply:</span>
            <span>{tickersData?.max_supply}</span>
        </OverviewItem>
    </Overview>
    <Tabs>
        <Tab isActive={priceMatch!==null}>
            <Link to="price">Price</Link>
        </Tab>
        <Tab isActive={chartMatch!==null}>
            <Link to="chart">Chart</Link>
        </Tab>
    </Tabs>
    <Outlet context={{coinId}}/>
    </>
    }
    </Container>
}

export default Coin;