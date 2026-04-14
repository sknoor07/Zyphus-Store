"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createSessionClient } from "@/lib/appwrite/appwrite";

export default function Home() {
  // useEffect(() => {
  //   createSessionClient().then((client) => client.account.get().then((res) => console.log(res)).catch((error) => console.error("Appwrite ping failed:", error)));
  // }, []);

  return (
    <div className="flex-center h-screen" >
      <h1> Your Home to Storage solutions</h1>
    </div>
  );
}
