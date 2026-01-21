import React from "react";
import { Globe } from "../Globle";

export default function BentoBox2() {
  return (
    <div className="h-full w-full rounded-2xl bg-gradient-to-tr from-[#00A9EE] to-white relative overflow-hidden">
      {/* Box 2 Content - White with light blue gradient from bottom-left */}
      <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden px-40 pt-8 pb-40 md:pb-60">
      <Globe className="top-28" />
    </div>

    </div>
  );
}
