import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const AlertSnackbar = ( { open, type, message, page } ) => {

    //const {open, type, message} = props;

    console.log('passou', page);

    const [state] = React.useState({
        vertical: "top",
        horizontal: "right",
      });
    const { vertical, horizontal} = state;
  // return (
  //   <Snackbar
  //     open={open}
  //     autoHideDuration={6000}
  //     anchorOrigin={{ vertical, horizontal }}
  //   >
  //     <Alert severity={type} sx={{ width: "100%" }}>
  //       {message}
  //     </Alert>
  //   </Snackbar>
  // );
};

export default AlertSnackbar;
