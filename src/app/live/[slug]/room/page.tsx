"use client";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LiveRoomClient from "@/components/live/LiveRoomClient";

export default function LiveRoomPage(){
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    if(!slug) return;
    fetch(`/api/live/${slug}`).then(r=>r.json()).then(j=> setEvent(j.event ?? j)).finally(()=> setLoading(false));
  },[slug]);
  if(loading) return <div className="p-10 text-center font-mono text-sm text-gray-500">Loading…</div>;
  if(!event) return <div className="p-10 text-center text-gray-500">Room not found. <Link to="/live" className="text-white underline">Back</Link></div>;
  return <LiveRoomClient event={event} />;
}
