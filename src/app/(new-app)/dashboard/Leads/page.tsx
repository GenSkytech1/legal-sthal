"use client";
import React, { useState, useEffect } from "react";
import Online from "@/components/Leads/online";
import SystemGenerated from "@/components/Leads/SystemGenerated";
import FollowUp from "@/components/Leads/followUp";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Page() {
  const [tab, setTab] = useState<"online" | "system" | "follow">("online");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const t = searchParams?.get("tab");
    if (t === "online" || t === "system" || t === "follow") {
      setTab(t);
    }
  }, [searchParams]);

  const selectTab = (t: "online" | "system" | "follow") => {
    setTab(t);
    if (pathname) router.push(`${pathname}?tab=${t}`);
  };

  return (
    <div>
      <div className="mb-3 d-flex gap-2">
        <button
          className={"btn " + (tab === "online" ? "btn-primary" : "btn-outline-primary")}
          onClick={() => selectTab("online")}
        >
          Online
        </button>
        <button
          className={"btn " + (tab === "system" ? "btn-primary" : "btn-outline-primary")}
          onClick={() => selectTab("system")}
        >
          System Generated
        </button>
        <button
          className={"btn " + (tab === "follow" ? "btn-primary" : "btn-outline-primary")}
          onClick={() => selectTab("follow")}
        >
          Follow Up
        </button>
      </div>

      <div>
        {tab === "online" && <Online />}
        {tab === "system" && <SystemGenerated />}
        {tab === "follow" && <FollowUp />}
      </div>
    </div>
  );
}