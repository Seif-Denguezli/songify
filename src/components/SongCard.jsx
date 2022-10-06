import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      className={`flex flex-col w-[250px] p-4 bg-white/5 opacity-80 backdrop-blur-sm rounded-lg cursor-pointer animate-slideup ${
        activeSong?.title === song.title ? "animate-playingSong" : ""
      } `}
    >
      <div className="relative h-56 w-full group">
        <div
          className={`absolute justify-center items-center bg-black opacity-50 inset-0 group-hover:flex
          ${
            activeSong?.title === song.title
              ? "flex bg-black opacity-70 animate-playingSong "
              : "hidden"
          }
          `}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-black opacity-70 p-2 hidden group-hover:flex justify-center items-center tranform duration-300 group-hover:animate-slideup">
          <p className="font-semibold text-md text-white leading-4 truncate">
            Artist : {song?.subtitle}
          </p>
        </div>
        <img src={song.images?.coverart} alt="song_image" />
      </div>
      <Link to={`/songs/${song?.key}`}>
        <p className="mt-4 text-sm truncate text-gray-300">{song?.title}</p>
      </Link>
    </div>
  );
};

export default SongCard;
