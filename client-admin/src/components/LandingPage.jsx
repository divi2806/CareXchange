"@mui/material/Typography";
import Button from "@mui/material/Button";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import { Main } from "./AppBar";
import { useRecoilValue } from "recoil";
import { adminState, openState } from "../store/atoms/admin";

export default function LandingPage() {
    const navigate = useNavigate();
    const admin = useRecoilValue(adminState);
    const open = useRecoilValue(openState);
    return (
        <Main open={open}>
            <div className="landing-container">
                <div className="header">
                    <h1 className="dashboard-title">NGO Dashboard to list medical items</h1>
                    <p>Welcome to CareXchange, Where we provide a platform for all the NGO's to list their medicines to give away to needy ones in a given particular area</p>
                    <p>‎ ‎ ‎ ‎ ‎ ‎ </p>
                    <Button
                        onClick={
                            admin.isLoggedIn
                                ? () => navigate("/medicalItems")
                                : () => navigate("/login")
                        }
                        variant="contained"
                    >
                        {admin.isLoggedIn ? "Modify Medical Items" : "Login Here"}
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
