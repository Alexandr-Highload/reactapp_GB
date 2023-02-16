//import Button from '@mui/material/Button';
import PropTypes from "prop-types";

function Button(props) {
  return (
    <>
      <button {...props} style={{color: 'black'}} onClick={props.click}>{props.children}</button>
    </>
  )
}

Button.propTypes = {
  type: PropTypes.string
}

export default Button;
