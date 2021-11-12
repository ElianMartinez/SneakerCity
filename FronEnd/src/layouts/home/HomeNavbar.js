import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { getCart,changeActive } from "../../redux/slices/product";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  Typography,
  Toolbar,
  AppBar,
  IconButton,
  Badge,
} from "@material-ui/core/";
import ShoppingCart from "../../components/shopping";
const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    dispatch(getCart(checkout.cart));
    dispatch(changeActive(true));
  };

  const handleClose = () => {
    dispatch(changeActive(false));
  };

  return (
    <>
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
          </div>
        </Toolbar>
      </AppBar>
      <ShoppingCart data={checkout} open={checkout.active} close={handleClose} />
    </>
  );
}

export default ButtonAppBar;
