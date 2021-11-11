import PropTypes from "prop-types";
// material
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";
import { Box, AppBar, Hidden, Toolbar, IconButton } from "@material-ui/core";
//

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

HomeNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function HomeNavbar() {
  return (
    <RootStyle>
      <ToolbarStyle>
        <Hidden lgUp>
          <IconButton
            onClick={() => {}}
            sx={{ mr: 1, color: "text.primary" }}
          ></IconButton>
        </Hidden>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& > *:not(:first-of-type)": {
              ml: { xs: 0.5, sm: 2, lg: 3 },
            },
          }}
        ></Box>
      </ToolbarStyle>
    </RootStyle>
  );
}
