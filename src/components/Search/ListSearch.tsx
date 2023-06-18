const ListSearch = () => {
  return (
    <div id="searchContainer">
      <input id="search" type="text" placeholder="검색어를 입력해주세요" />
      <style jsx>{`
        #searchContainer {
          width: 100%;
          height: 1.5rem;
          margin-bottom: 0.3rem;
        }
        #search {
          width: inherit;
          font-size: 1rem;
          border: 1px solid gray;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default ListSearch;
