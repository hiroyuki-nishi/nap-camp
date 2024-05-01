"use client";
import React from "react";
import dynamic from "next/dynamic";
import {Box, Divider, Grid} from "@mui/material";
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
  const SideMenu = (props: any) =>
    <div style={{ display: 'flex' }}>
      <input type="checkbox" />
      <div>{props.label}</div>
    </div>

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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item={true} xs={12}>
            <div className="bg-emerald-500 p-2">
              <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="キーワード" />
            </div>
          </Grid>
          <Grid item={true} xs={3}>
            施設タイプ
            {  faciltyTypes.map((x, index) => <SideMenu key={index} label={x}/>) }
            <Divider />
            ロケーション
            {  locationTypes.map((x, index) => <SideMenu key={index} label={x}/>) }
          </Grid>
          <Grid item={true} xs={9}>
            <Map />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
