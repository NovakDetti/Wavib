"use client";
import { useState } from "react";

const steps = ["Csatorna", "Bekötés", "Webhook", "Teszt", "AI"];
export default function Wizard({ children }: { children: React.ReactNode }) {
  const [i, setI] = useState(0);
  return (
    <div className="max-w-3xl mx-auto">
      <ol className="flex gap-2 mb-6">{steps.map((s, idx) =>
        <li key={s} className={`px-3 py-1 rounded ${idx<=i?'bg-primary/10':'bg-muted'}`}>{idx+1}. {s}</li>
      )}</ol>
      <div>{Array.isArray(children) ? children[i] : children}</div>
      <div className="mt-6 flex justify-between">
        <button disabled={i===0} onClick={()=>setI(i-1)} className="btn">Vissza</button>
        <button disabled={i===steps.length-1} onClick={()=>setI(i+1)} className="btn btn-primary">Tovább</button>
      </div>
    </div>
  );
}
