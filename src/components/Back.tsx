import {useNavigate} from "react-router-dom";

export default function Back() {

  const navigate = useNavigate();
  function click() {
    navigate(-1);
  }

  return (
    <button onClick={click}>
      go back
    </button>
  )
}