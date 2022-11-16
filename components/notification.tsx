import React, { useEffect, useRef, useState } from "react";
import styles from "styles/components/notification.module.css";

type Notification = {
  element: React.ReactNode;
  type?: "info" | "success" | "error";
  timeout?: number;
} | null;
type PushNotification = (notification: Notification) => void;
type args = {
  notification: Notification;
  pushNotification: PushNotification;
};

export default function Notification({ notification, pushNotification }: args) {
  const notificationRef = useRef<HTMLDivElement>(null);
  const [prevNotification, setPrevNotification] = useState<Notification>();

  const notificationTypeToStyleMap = {
    success: styles.success,
    info: styles.info,
    error: styles.error,
  };

  useEffect(() => {
    if (notification) {
      notificationRef.current!.style.bottom = `calc(100% - ${
        notificationRef.current!.getBoundingClientRect().height + 10
      }px)`;
      notificationRef.current!.style.transition =
        "bottom 400ms cubic-bezier(0.27, 3, 0.82, -1.5)";
      setPrevNotification(notification);
    } else {
      notificationRef.current!.style.bottom = "calc(100% + 15px)";
      notificationRef.current!.style.transition = "bottom 300ms ease-in";
    }
  }, [notification]);

  return (
    <div ref={notificationRef} className={styles.notification_container}>
      <div className={styles.notification_box}>
        {notification?.element || prevNotification?.element}
        <div className={styles.button_container}>
          <button
            className={
              notificationTypeToStyleMap[
                notification?.type || prevNotification?.type || "info"
              ]
            }
            onClick={() => pushNotification(null)}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}

let tt: NodeJS.Timeout;

export function useNotification(): [Notification, PushNotification] {
  const [notification, setNotification] = useState<Notification>(null);

  function pushNotification(notification: Notification) {
    clearTimeout(tt);
    setNotification(null);
    if (notification) {
      tt = setTimeout(() => setNotification(notification), 500);
    }
  }

  useEffect(() => {
    if (notification) {
      tt = setTimeout(
        () => pushNotification(null),
        notification.timeout || 5000
      );
    }
  }, [notification]);

  return [notification, pushNotification];
}
