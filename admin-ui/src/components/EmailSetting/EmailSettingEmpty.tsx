import React from "react";


const EmailSettingEmpty = () => {
   return (
       <div className="frt-flex frt-items-center frt-flex-col frt-justify-center frt-text-center frt-h-[40vh]">
           <div className="frt-mx-auto frt-my-auto frt-flex frt-flex-col frt-gap-5 frt-p-5">
               <div><i className="farp farp-list-empty frt-text-6xl"></i></div>
               <div><span className="frt-text-lg frt-font-bold">No Entries Were Added</span></div>
               <div>
                   <p className="frt-text-sm">Oops, it appears that no Entries were Added</p>
               </div>
           </div>
       </div>
   )
}

export default  EmailSettingEmpty;