import{q as a}from"./entry-2facc41d.mjs";var n=a(async e=>{{const t=JSON.parse(localStorage.getItem("walletconnect")||"[]"),o=localStorage.getItem("metamask");if(!(t.connected||o!==null))return console.log("Heading to",e.path,"but you haven't logged in"),"/"}});export{n as default};
