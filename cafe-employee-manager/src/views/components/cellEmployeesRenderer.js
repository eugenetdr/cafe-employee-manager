import { Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATH_EMPLOYEES } from "../../constants";
import { updateSelectedCafeId } from "../../features/cafe/cafeSlice";

export default props => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const value = props.value ? props.value : 0;

  function handleClick() {
    dispatch(updateSelectedCafeId(props.data.id))
    navigate(PATH_EMPLOYEES)
  }

  return (
    <span onClick={handleClick}>
      <Link style={{ fontWeight: 'bold', color: '#7c3f00' }} underline='always'>{value}</Link>
    </span>
  );
};
