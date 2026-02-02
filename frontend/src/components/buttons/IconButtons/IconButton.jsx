import './iconButtons.css';
import heartIcon from '../../../assets/heart.png'
import heartFilledIcon from '../../../assets/heart-filled.png'
import { useState } from 'react';

export const IconButton = ({ icon, onClick, className }) => {
  return (
    <button type="button" onClick={onClick} className={`icon-button`}>
      <img src={icon} alt="button" className="icon-button-icon" />
    </button>
  )
}

export const TextButton = ({ text, onClick }) => {
  return (
    <button type="button" onClick={onClick} className="icon-button icon-button-text">
      {text}
    </button>
  )
}

export const LikeButton = ({ onClick }) => {
  const [liked, setLiked] = useState(false)

  const toggleLiked = () => {
    setLiked(prev => !prev)
  }

  const handleClick = () => {
    toggleLiked()
    if (onClick) onClick()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`icon-button like-button ${liked ? "liked" : ""}`}
    >
      <img
        src={liked ? heartFilledIcon : heartIcon}
        alt="like button"
        className="icon-button-icon"
      />
    </button>
  )
}


