// Retain the reference's smooth scroll, then keep headings clear of its fixed
// mobile header after the menu closes and responsive content settles.
let anchorAdjustment;
const cancelAnchorAdjustment=()=>clearTimeout(anchorAdjustment);
for(const eventName of ['wheel','touchstart','keydown']){
  window.addEventListener(eventName,cancelAnchorAdjustment,{passive:true});
}
document.addEventListener('click',event=>{
  cancelAnchorAdjustment();
  const link=event.target.closest('a[href^="#"]');
  if(!link||!window.matchMedia('(max-width:780px)').matches)return;
  const id=link.getAttribute('href').slice(1);
  const target=document.getElementById(id);
  if(!target)return;
  anchorAdjustment=setTimeout(()=>{
    const fixedControls=document.querySelector('.cm-h__reservation');
    const inset=fixedControls.getBoundingClientRect().bottom+16;
    const delta=target.getBoundingClientRect().top-inset;
    if(Math.abs(delta)>2)window.scrollBy({top:delta,left:0,behavior:'instant'});
  },1900);
});
