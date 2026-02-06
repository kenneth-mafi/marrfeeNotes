import { useNavigate } from "react-router-dom";
import { SubHeader } from "../components/subheader/Subheader";
import PageTitle from "../components/PageTitle/PageTitle";
import ProfileActions from "../components/profileActions/ProfileActions";
import "./profilePage.css";
import MainPageFrame from "../components/Frames/PageFrames/mainPageFrame/MainPageFrame";

const ProfilePage = () => {
  const navigate = useNavigate();

  const actions = [
    { id: "settings", label: "Settings" },
    {
      id: "logout",
      label: "Log out",
      tone: "danger",
      onClick: () => navigate("/homeScreen", { replace: true }),
    },
  ];

  const pageContent = [
    { Component: SubHeader, props: { back: true } },
    {
      Component: PageTitle,
      props: { title: "Profile", subtitle: "Manage your notes workspace." },
    },
    { Component: ProfileActions, props: { actions } },
  ];

  return (
    <MainPageFrame
      components={pageContent}
      className="page profile-page"
      effect="slideInRight"
    />
  );
};

export default ProfilePage;
