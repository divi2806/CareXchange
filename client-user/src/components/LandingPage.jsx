"@mui/material/Typography";
import Button from "@mui/material/Button";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import { Main } from "./AppBar";
import { useRecoilValue } from "recoil";
import { openState, userState } from "../store/atoms/user";

export default function LandingPage() {
    const navigate = useNavigate();
    const admin = useRecoilValue(userState);
    const open = useRecoilValue(openState);
    return (
        <Main open={open}>
            <div className="landing-container">
                <div className="header">
                    <h1 className="dashboard-title">See list of available free medicines</h1>
                    <p>Welcome to CareXchange, Please login to see if any NGO near you have made a listing of your desired medicine, Please login to claim. Note that it is first come first serve basis and stocks are limited. Thanks</p>
                    <p>‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ </p>
                    <Button
                        onClick={
                            admin.isLoggedIn
                                ? () => navigate("/medicalItems")
                                : () => navigate("/login")
                        }
                        variant="contained"
                    >
                        {admin.isLoggedIn ? "View Medical Items" : "Login Here"}
                    </Button>
                </div>
                <img
                    className="dashboard-image"
                    src="https://i.ibb.co/YDzTRQp/Health-Care-Medicine-Health-insurance-Vector-image.png"
                    alt="dashboard-image"
                />
            </div>
        </Main>
    );
}
