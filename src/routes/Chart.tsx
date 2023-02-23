import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
import {useRecoilValue} from "recoil";
import { isDarkAtom } from "../atom";

interface IData{
    coinId:string;
}

interface IHistorical{
    close: string;
    high: string;
    low: string;
    market_cap: number;
    open: string;
    time_close: number;
    time_open: number;
    volume: string;
}

function Chart(){
    const isDark=useRecoilValue(isDarkAtom);
    const {coinId}=useOutletContext<IData>();
    const {isLoading,data}=useQuery<IHistorical[]>(["ohlcv",coinId],()=>fetchCoinHistory(coinId),{
        refetchInterval:10000
    });
    return <div>
        {isLoading ? "Loading Chart..." : 
        <ReactApexChart 
        type="line"
        series={[
            {
                name:"Price",
                data:data?.map(price=>Number(price.close)) as number[]
            }
        ]}

        options={{
            theme:{
                mode:isDark ? "dark" : "light"
            },
            chart:{
                height:500,
                width:500,
                toolbar:{
                    show:false
                }
            },
            fill:{
                type:"gradient",
                gradient:{
                    gradientToColors:["blue"],
                    stops:[0,100]
                },
            },
            colors:["red"],
            tooltip:{
                y:{
                    formatter:(value)=>`$ ${value.toFixed(2)}`
                }
            },
            xaxis:{
                labels:{
                    show:false,
                    datetimeFormatter:{
                        month: "MMM 'yy"
                    }
                },
                type:"datetime",
                categories:data?.map(price => new Date(price.time_close * 1000).toISOString())
            }
        }}
        />}
    </div>
}

export default Chart;