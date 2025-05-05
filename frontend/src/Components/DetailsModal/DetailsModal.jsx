import React, { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

import "./DetailsModal.css";

export default function DetailsModal({ onHide, children }) {
  // close detail modal with Esc(on key press)
  useEffect(() => {
    const checkKeyPress = (event) => {
      console.log(event);
      if (event.keyCode === 27) {
        onHide();
      }
    };
    window.addEventListener("keydown", checkKeyPress);

    return () => window.removeEventListener("keydown", checkKeyPress);
  });

  return (
    <div className="modal-parent active">
      {/* detail box */}
      <div className="details-modal">{children}</div>
      {/* close btn */}
      <div className="close-btn">
        <button onClick={() => onHide()}>
          <MdOutlineClose />
        </button>
      </div>
    </div>
  );
}
