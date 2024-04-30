"use client";
import React from "react";
import dynamic from "next/dynamic";
// import { OpenStreetMap } from "./map/openStreetMap";

export default function Home() {
  const faciltyTypes = [
    "ロッジ・ログハウス・コテージ",
    "バンガロー",
    "キャビン （ケビン）",
    "区画サイト",
    "フリーサイト",
    "トレーラーハウス",
    "ティピー",
    "パオ",
    "ツリーハウス・その他",
    "グランピング",
  ];
  
  const locationTypes = [
    "海",
    "川",
    "湖",
    "高原",
    "林間",
    "高台",
    "草原",
    "公園",
  ];

  const BACKGROUND_COLOR = "orange"
  const createMenues = (types: string[], backgroundColor: string) => 
    faciltyTypes.map((x, index) =>
      <>
        <div key={index} style={{ display: 'flex', backgroundColor: backgroundColor }}>
          <input type="checkbox" />
          <div>{x}</div>
        </div>
      </>
    )

  const Map = React.useMemo(
    () =>
      dynamic(() => import("./map/openStreetMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <>
      {/*{ createMenues(faciltyTypes, BACKGROUND_COLOR) }*/}
      <Map />
    </>
  );
}
