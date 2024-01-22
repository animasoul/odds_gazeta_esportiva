"use client";
import useSWR from "swr";

interface Currency {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

interface Bpi {
  USD: Currency;
  GBP: Currency;
  EUR: Currency;
}

interface BitcoinData {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  chartName: string;
  bpi: Bpi;
}

async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Error while fetching data");
  }
  return res.json();
}
//const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GetBitcoinData() {
  const {
    data: bitcoinData,
    error,
    isLoading,
  } = useSWR<BitcoinData>("../api/bitcoin", fetcher);

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (isLoading || !bitcoinData) {
    return (
      <div>
        <p>Loading...</p>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <p>
        {bitcoinData.bpi.USD.rate} {bitcoinData.bpi.USD.code}
      </p>
      <p>{bitcoinData.time.updated}</p>
    </div>
  );
}
