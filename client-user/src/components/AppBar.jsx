import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { openState } from "../store/atoms/user";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function ButtonAppBar() {
    const theme = useTheme();
    const [user, setUser] = useRecoilState(userState);
    const [open, setOpen] = useRecoilState(openState);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerOnNoLogin = () => {
        alert("Please Login");
        navigate("/login");
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const token = localStorage.getItem("token");

        if (!token) return;
        try {
            const decodedToken = jwt_decode(token);
            const currentTimestamp = Date.now() / 1000;

            if (decodedToken.exp && currentTimestamp > decodedToken.exp) {
                handleTokenExpiry();
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleTokenExpiry() {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("email");
        setUser({
            email: "",
            password: "",
            IsLoggedIn: false,
        });
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("email");
        setUser({
            email: "",
            password: "",
            IsLoggedIn: false,
        });
        navigate("/");
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={
                            user.isLoggedIn
                                ? handleDrawerOpen
                                : handleDrawerOnNoLogin
                        }
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center", // Center vertically
                            width: "100%",
                        }}
                    >
                        {/* Add your logo image here */}
                        <img
                            src="https://i.ibb.co/8stM9Jt/Whats-App-Image-2023-10-06-at-10-58-02-AM-removebg-preview.png"
                            alt="Your Logo"
                            style={{
                                height: 150,
                                cursor: "pointer",
                            }}
                            onClick={() => navigate("/")} // Replace "/" with the desired URL
                        />

                        {user.isLoggedIn ? (
                            <div>
                                <Button onClick={handleLogout} color="inherit">
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Button
                                    onClick={() => navigate("/register")}
                                    color="inherit"
                                >
                                    Register
                                </Button>
                                <Button
                                    onClick={() => navigate("/login")}
                                    color="inherit"
                                >
                                    Login
                                </Button>
                            </div>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    {user.isLoggedIn && (
                        <List>
                            <ListItem key="name" disablePadding>
                                <ListItemButton>
                                    <ListItemIcon sx={{ minWidth: 35 }}>
                                        <AccountBoxIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={user?.username}
                                        secondary={user?.email}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    )}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                handleDrawerClose();
                                navigate("/medicalItems");
                            }}
                        >
                            <ListItemIcon>
                                <LibraryBooksIcon />
                            </ListItemIcon>
                            <ListItemText primary={"All Medical Items"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                handleDrawerClose();
                                navigate("/claimedMedicalItems");
                            }}
                        >
                            <ListItemIcon>
                                <ShoppingBasketIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Claimed Medical Items"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
}

export { Main };
