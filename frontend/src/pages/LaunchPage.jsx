import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LaunchHero from "../components/LaunchHero/LaunchHero";
import './styles.css'
import heroImg from '../assets/notepad.png'
import MainPageFrame from "../components/Frames/PageFrames/mainPageFrame/MainPageFrame";


export default function LaunchPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/folders");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);
  const pageContent = [
    { Component: LaunchHero, 
      props: { 
        src: heroImg, 
        text: "Paper who? Noted's got you covered!", 
        footnote: "Write it down. Thank yourself later." }
    }
  ]

  return (
      <MainPageFrame components={pageContent} className="launch-page" />
  );
}
