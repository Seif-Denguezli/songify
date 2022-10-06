import { Error, Loader, SongCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { genres } from "../assets/constants";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";

const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  if (isFetching) return <Loader title="Loading Songs ..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row w-full items-center justify-between mt-4 mb-10 space-y-3">
        <h2 className="text-white font-bold text-3xl text-left">
          Discover {genreListId}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "pop"}
          className="bg-black rounded-xl text-gray-300 p-3 text-sm"
        >
          {genres.map((genre) => (
            <option key={genre.key} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      {/* Songs Contailer */}
      <div className="flex flex-wrap justify-center md:justify-start gap-8">
        {data.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
