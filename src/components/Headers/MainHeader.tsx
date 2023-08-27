import Image from "next/image";

interface SeeMine {
  seeMine: boolean;
  toggleSeeMine: () => void;
}

const MainHeader = ({ seeMine, toggleSeeMine }: SeeMine) => {
  return (
    <div id="navContainer">
      <button
        className="navButton Left"
        onClick={() => {
          if (seeMine) return;
          toggleSeeMine();
        }}
      >
        내 것만 보기
      </button>
      <button
        className="navButton Right"
        onClick={() => {
          if (!seeMine) return;
          toggleSeeMine();
        }}
      >
        전체보기
      </button>
      <button
        className="refreshButton"
        onClick={() => {
          location.reload();
        }}
      >
        <Image src="/reload.jpeg" alt="reload" width={30} height={30} />
      </button>
      <style jsx>{`
        #navContainer {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 5vh;
        }
        .navButton {
          flex-grow: 1;
          background-color: white;
          border: 1px solid white;
        }
        .refreshButton {
          background-color: white;
          border: 1px solid white;
        }
        .Left {
          border-right: 0.5px solid black;
        }
        .Right {
          border-left: 0.5px solid black;
        }
      `}</style>
    </div>
  );
};

export default MainHeader;
