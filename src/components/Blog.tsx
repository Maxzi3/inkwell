
const Blog = () => {
  return (
    <div>     
      <div
        className="relative flex size-full min-h-screen flex-col bg-[#101a23] dark "
      >
        <div>
          <div className="px-4 py-3">
            <label className="flex flex-col min-w-40 h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div
                  className="text-[#90aecb] flex border-none bg-[#223649] items-center justify-center pl-4 rounded-l-xl border-r-0"
                  data-icon="MagnifyingGlass"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </div>
                <input
                  placeholder="Search"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-full placeholder:text-[#90aecb] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  value=""
                />
              </div>
            </label>
          </div>
          <div className="flex gap-3 p-3 overflow-x-hidden">
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#223649] pl-4 pr-4">
              <p className="text-white text-sm font-medium leading-normal">All</p>
            </div>
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#223649] pl-4 pr-4">
              <p className="text-white text-sm font-medium leading-normal">Technology</p>
            </div>
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#223649] pl-4 pr-4">
              <p className="text-white text-sm font-medium leading-normal">Travel</p>
            </div>
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#223649] pl-4 pr-4">
              <p className="text-white text-sm font-medium leading-normal">Food</p>
            </div>
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#223649] pl-4 pr-4">
              <p className="text-white text-sm font-medium leading-normal">Lifestyle</p>
            </div>
          </div>
         
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Latest</h2>
          <div className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-xl">
              <div className="flex flex-col gap-1 flex-[2_2_0px]">
                <p className="text-white text-base font-bold leading-tight">Mastering the Art of Photography</p>
                <p className="text-[#90aecb] text-sm font-normal leading-normal">Learn essential photography techniques to capture stunning images.</p>
              </div>
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
              ></div>
            </div>
          </div>
        
          </div>
       
          
        </div>
        <div>
          <div className="flex justify-stretch">
            <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#223649] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Login</span>
              </button>
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#0b80ee] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Sign Up</span>
              </button>
            </div>
          </div>
          <div className="h-5 bg-[#101a23]"></div>
        </div>
   
  </div>
  )
}

export default Blog