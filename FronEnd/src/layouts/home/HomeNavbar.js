import React from "react";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { getCart } from "../../redux/slices/product";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SkeletonElement from "../../components/Skeleton/Skeleton";
import {
  Menu,
  MenuItem,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
  Badge,
} from "@material-ui/core/";
const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h3" className={classes.title}>
          Sneaker City
        </Typography>

        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Badge badgeContent={checkout.cart.length} color="error">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem sx={{ width: "400px", height: "200px" }}>
              Element close
            </MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
