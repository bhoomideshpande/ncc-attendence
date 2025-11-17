import React from "react";

export const FlagHeader = () => {
  return (
    <div className="w-full bg-primary py-7 shadow-md"> 
      <div className="container mx-auto px-6 flex items-center justify-between">

        {/* Left – NCC Logo */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_National_Cadet_Corps_%28India%29.png/960px-Emblem_of_National_Cadet_Corps_%28India%29.png"
          alt="NCC Logo"
          className="w-28 h-28 object-contain"  // bigger
        />

        {/* Center Title */}
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold tracking-wide">NCC Attendance Portal</h1>
          <p className="text-lg opacity-90">Unity and Discipline</p>
        </div>

        {/* Right – Indian Flag */}
        <img
          src="https://thumbs.dreamstime.com/b/india-paper-flag-patriotic-background-national-138241478.jpg"
          alt="Indian Flag"
          className="w-28 h-28 object-cover rounded-lg"  // bigger
        />

      </div>
    </div>
  );
};
