import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atom";

const Container=styled.div`
    max-width: 600px;
    min-width: 400px;
    margin:0 auto;
`;

const Header=styled.div`
    height:10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeaderItem=styled.div`
    width:33.3%;
    display: flex;
    justify-content: center;
`;

const Title=styled.h1`
    font-size: 48px;
    color:${props=>props.theme.accentColor};
`;

const Button=styled.button`
    background-color: ${props=>props.theme.accentColor};
    border:none;
    border-radius: 20px;
    padding:4px 12px;
    &:hover{
        border:1px solid ${props=>props.theme.textColor};
    }
    cursor: pointer;
`;

const Loading=styled.div`
    font-size:30px;
    text-align:center;
`;

const CoinsList=styled.ul`
    
`;

const Coin=styled.li`
    background-color: ${props=>props.theme.bgColor};
    color:${props => props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    border:1px solid ${props=>props.theme.textColor};
    a{
        display: flex;
        align-items: center;
        transition:color 0.2s ease-in;
        padding:15px;
    }
    &:hover{
        color:${props=>props.theme.accentColor}
    }
`;

const Img=styled.img`
    height:35px;
    width:35px;
    margin-right:10px;
`;

interface CoinInterface{
    id: string;
    name: string;
    symbol: string;
    rank: string;
    is_new: string;
    is_active: string;
    type: string;
}

function Coins(){
    const setDarkAtom=useSetRecoilState(isDarkAtom);
    const toggleDarkAtom=()=>setDarkAtom(current=>!current);
    const {isLoading,data}=useQuery<CoinInterface[]>("allcoins",fetchCoins);
    return <Container>
        <HelmetProvider>
            <Helmet>
                <title>Coins</title>
            </Helmet>
        </HelmetProvider>
        <Header>
            <HeaderItem></HeaderItem>
            <HeaderItem>
                <Title>Coins</Title>
            </HeaderItem>
            <HeaderItem>
                <Button onClick={toggleDarkAtom}>Toggle Mode</Button>
            </HeaderItem>
        </Header>
        {isLoading ? <Loading>Loading...</Loading> : <CoinsList>
            {data?.slice(0,100).map(coin=><Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{name:coin.name}}>
                    <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                    {coin.name} &rarr;
                </Link>
            </Coin>)}
        </CoinsList>}
    </Container>
}

export default Coins;