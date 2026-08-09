const LINKS = {
  telegramBot: "https://t.me/PandaMoneyTask_bot",
  youtube: "https://youtube.com/@taskpandamoney?si=X6-5p6274ygkbdd9",
  telegram: "https://t.me/zaidbinhassan",
  whatsapp: "https://whatsapp.com/channel/0029Vb95hf16RGJOiWKTHH2d",
  instagram: "https://www.instagram.com/pandamoneytask?igsh=aWpwaTg2a3FmYzM4",
  facebook: "https://www.facebook.com/share/1MkzZKk5Zk/"
};

const state = JSON.parse(localStorage.getItem("taskPandaState") || "null") || {
  balance: 0, totalEarned: 0, todayEarned: 0, completed: 0,
  streak: 0, lastDay: "", claimed: {}, mining: false, miningStarted: 0
};

function save(){ localStorage.setItem("taskPandaState", JSON.stringify(state)); render(); }
function today(){ return new Date().toISOString().slice(0,10); }
function addCoins(amount){
  state.balance += amount; state.totalEarned += amount; state.todayEarned += amount;
  state.completed += 1; save();
}
function render(){
  document.getElementById("balance").textContent = state.balance.toLocaleString();
  document.getElementById("totalEarned").textContent = state.totalEarned.toLocaleString();
  document.getElementById("todayEarned").textContent = state.todayEarned.toLocaleString();
  document.getElementById("completed").textContent = state.completed;
  document.getElementById("streak").textContent = state.streak;
  document.querySelectorAll(".claim").forEach(btn=>{
    const t=btn.dataset.task;
    if(state.claimed[t]===today()){
      btn.classList.add("done"); btn.textContent="CLAIMED";
    }
  });
}
function toast(msg){
  const el=document.getElementById("toast"); el.textContent=msg; el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"),2200);
}

function openTask(type){
  window.open(LINKS[type], "_blank", "noopener,noreferrer");
}

document.querySelectorAll(".claim").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const type=btn.dataset.task;

    if(type==="telegramBot" || type==="whatsapp" || type==="facebook" || type==="instagram"){
      openTask(type);
      toast("Open the page and complete the follow/join action.");
      return;
    }

    if(type==="telegram"){
      if(state.claimed.telegram===today()){ toast("Telegram reward already claimed today."); return; }
      openTask("telegram");
      setTimeout(()=>{
        state.claimed.telegram=today();
        addCoins(120);
        toast("+120 Panda Coins added!");
      },1200);
      return;
    }

    if(type==="youtubeSubscribe"){
      if(state.claimed.youtubeSubscribe){ toast("YouTube subscribe reward already claimed."); return; }
      openTask("youtube");
      setTimeout(()=>{
        state.claimed.youtubeSubscribe=true;
        addCoins(120);
        toast("+120 Panda Coins added!");
      },1200);
      return;
    }

    if(type==="youtubeDaily"){
      if(state.claimed.youtubeDaily===today()){ toast("Daily YouTube reward already claimed today."); return; }
      openTask("youtube");
      setTimeout(()=>{
        state.claimed.youtubeDaily=today();
        addCoins(12);
        toast("+12 Panda Coins added!");
      },1200);
      return;
    }

    if(type==="video"){
      if(state.claimed.video===today()){ toast("Daily video reward already claimed."); return; }
      // Replace this URL with your own daily video when you have one.
      const videoUrl = "https://www.youtube.com/";
      window.open(videoUrl, "_blank", "noopener,noreferrer");
      setTimeout(()=>{
        state.claimed.video=today();
        addCoins(11);
        toast("+11 Panda Coins added!");
      },1200);
    }
  });
});

const mineBtn=document.getElementById("mineBtn");
let miningInterval=null;
function updateMining(){
  if(!state.mining) return;
  const elapsed=Math.floor((Date.now()-state.miningStarted)/1000);
  const h=String(Math.floor(elapsed/3600)).padStart(2,"0");
  const m=String(Math.floor((elapsed%3600)/60)).padStart(2,"0");
  const s=String(elapsed%60).padStart(2,"0");
  document.getElementById("timer").textContent=`${h}:${m}:${s}`;
}
function startMining(){
  state.mining=true; state.miningStarted=Date.now();
  mineBtn.textContent="MINING… ⛏️";
  document.getElementById("mineStatus").textContent="Panda is mining";
  localStorage.setItem("taskPandaState",JSON.stringify(state));
  clearInterval(miningInterval); miningInterval=setInterval(updateMining,1000);
}
mineBtn.addEventListener("click",()=>{
  if(state.mining){ toast("Mining is already running."); return; }
  startMining(); toast("Mining started!");
});

function scrollToSection(id){
  const el=document.querySelector(".daily"); if(el) el.scrollIntoView({behavior:"smooth"});
}
function showProfile(){ toast("Profile section coming next."); }

render();
if(state.mining){ startMining(); }

