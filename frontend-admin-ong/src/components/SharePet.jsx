import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";

export default function SharePet({ urlImagem, message }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShare = (network)=> {
    switch (network) {
      case "twitter":
        window.open('https://twitter.com/share?url='+urlImagem+'&via=TWITTER_HANDLE&text=Conheça o ----', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;
        break;
      case "facebook":
        window.open('https://www.facebook.com/sharer/sharer.php?u='+ urlImagem+ '&t=Conheça o ----', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
        return false;
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <IconButton aria-label="share" onClick={handleClick}>
        <ShareIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleShare('facebook')}>Facebook</MenuItem>
        <MenuItem onClick={() => handleShare('twitter')}>Twitter</MenuItem>
      </Menu>
    </div>
  );
}
