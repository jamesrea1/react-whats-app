function SearchBox() {
  return (
    <div className="relative flex-none h-[50px] bg-[#f6f6f6]">
      <div className="absolute top-[7px] left-3 right-[14px] h-[35px] rounded-full bg-white">
        <div className="w-full h-full flex items-center pl-[66px] pr-8">
          <input
            className="h-5 w-full outline-none text-sm leading-none"
            placeholder="Search or start new chat "
          />
        </div>
      </div>
      <div className="absolute top-3 left-6 w-6 h-6">
        <IconSearch />
      </div>
      <div className="absolute top-3 right-6 w-6 h-6 hidden">
        <IconLoading />
      </div>
    </div>
  );
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path
        fill="currentColor"
        d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"
      ></path>
    </svg>
  );
}

function IconLoading() {
  return (
    <div className="loading w-5 h-5 text-black">
      <svg
        className="animate-spin"
        width="20"
        height="20"
        viewBox="0 0 45 45"
        role="status"
      >
        <circle
          className="loading__circle"
          cx="22.5"
          cy="22.5"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  );
}

export default SearchBox;
