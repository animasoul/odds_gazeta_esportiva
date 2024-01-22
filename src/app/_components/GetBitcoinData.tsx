"use client";
import React, { useState, useEffect } from "react";

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

export default function GetBitcoinData() {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null);

  useEffect(() => {
    fetch("../api/bitcoin")
      .then((res) => res.json())
      .then((data: BitcoinData) => setBitcoinData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  if (bitcoinData === null) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <p>
          {bitcoinData.bpi.USD.rate} {bitcoinData.bpi.USD.code}
        </p>
        <p>{bitcoinData.time.updated}</p>
      </div>
    );
  }
}
