import "./App.scss";
import { useEffect } from "react";
import { useReducer } from "react";
import Board from "../components/board";
import gameReducer, { INITIAL_STATE } from "../reducers/game.reducer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ShowPieceTypes from "../components/showPieceTypes";
import SideBar from "../components/sideBar";

const MySwal = withReactContent(Swal);

function App() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const showSwal = async (title: string, selected?: number) => {
    const { value } = await MySwal.fire({
      title,
      footer: (
        <ShowPieceTypes
          selected={selected}
          close={(index) =>
            MySwal.close({
              isConfirmed: true,
              isDenied: false,
              isDismissed: false,
              value: index,
            })
          }
        />
      ),
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    return value;
  };

  useEffect(() => {
    const start = async () => {
      const planet1 = await showSwal("Player one piece");
      dispatch({
        type: "startupPlayer",
        payload: { player: "p1", piece: planet1 },
      });
      const planet2 = await showSwal("Player Two piece", planet1);
      dispatch({
        type: "startupPlayer",
        payload: { player: "p2", piece: planet2 },
      });
    };
    start();
  }, []);

  return (
    <div className="container">
      <SideBar pieces={state.p1Pieces} />
      <Board board={state.board} dispatch={dispatch} />
      <SideBar pieces={state.p2Pieces} />
    </div>
  );
}

export default App;
