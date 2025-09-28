export function Warning({setWarning}) {
  
  return(<div>
   {/*Glass effect adapted from tutorial: [https://www.youtube.com/watch?v=3HRvb2tLqF4] */}
          <style>{`
              .toolbar{
                  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.6));
                  backdrop-filter: blur(10px);
                  -webkit-backdrop-filter: blur(10px);
                  border-radius:45px;
                  border:1px solid rgba(255,255,255,0.18);
                  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
          
              }
              
          `}
          </style>
          <div className="fixed z-20 flex flex-col bg-green-400 toolbar justify-center items-center text-center px-4 py-4" style={{width:"300px", height:"400px", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontSize:"23px"}}>
              <p className="mx-6 mt-2">This website works best on desktop / laptops. Some interaction may not be display correctly on mobile devices.</p>
              <div className="mt-12 bg-red-100 rounded-xl px-2 py-2 border-black border-2 cursor-pointer" onClick={()=>setWarning(false)}>I understand and wish to proceed</div>
          </div>
  </div>)
 
}