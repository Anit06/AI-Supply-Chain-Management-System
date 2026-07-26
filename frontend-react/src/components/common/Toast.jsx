import { useEffect } from "react";

function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return undefined;

    const timer = window.setTimeout(() => {
      onClose();
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`inventory-toast ${type || "success"}`} role="status">
      {message}
    </div>
  );
}

export default Toast;
