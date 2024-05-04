"use client";
import React, {useState} from "react";
import dynamic from "next/dynamic";
import {Box, Divider, Grid} from "@mui/material";
import {FACILITY_TYPES, LOCATION_TYPES} from "@/app/constants";
import {Camp} from "@/app/model/camp";

export default function Home() {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleKeyDown: (e: any) => Promise<void> = async (e: any) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    await search(e.target?.value)
  };

  const search: (query: string) => Promise<void> = async (query: string) => {
    if (!query) return; // クエリが空の場合は何もしない
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/camp?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json() as Camp[];
      setCamps(data);
      console.log(data);
      console.log(camps);
    } catch (error) {
      console.error('Failed to fetch camps', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item={true} xs={12}>
            <div className="bg-emerald-500 p-2">
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="キーワード"
                onKeyDown={handleKeyDown}
                type="text"
              />
            </div>
          </Grid>
          <Grid item={true} xs={3}>
            施設タイプ
            {  FACILITY_TYPES.map((x, index) => <SideMenu key={index} label={x}/>) }
            <Divider />
            ロケーション
            {  LOCATION_TYPES.map((x, index) => <SideMenu key={index} label={x}/>) }
          </Grid>
          <Grid item={true} xs={9}>
            <Map />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
