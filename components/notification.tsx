import React, { useEffect, useRef, useState } from "react";
import styles from "styles/components/notification.module.css";

type Notification = {
  element: React.ReactNode;
  type?: "info" | "success" | "error";
  timeout?: number;
} | null;
export type PushNotification = (notification: Notification) => void;
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
      notificationRef.current!.style.bottom = "100%";
      notificationRef.current!.style.transition = "bottom 300ms ease-in";
    }
  }, [notification]);

  return (
    <div ref={notificationRef} className={styles.notification_container}>
      <div
        className={`${styles.notification_box}  ${
          notificationTypeToStyleMap[
            notification?.type || prevNotification?.type || "info"
          ]
        }`}
      >
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

let tt: any;

export function useNotification(): [Notification, PushNotification] {
  const [notification, setNotification] = useState<Notification>(null);
  const [nextNotifications, setNextNotifications] = useState<Notification[]>(
    []
  );

  function pushNotification(notification: Notification) {
    if (notification === null) {
      clearTimeout(tt);
      setNotification(null);
    } else
      setNextNotifications((prev) => {
        return [...prev, notification];
      });
  }

  function moveToNextNotification() {
    if (nextNotifications.length) {
      setNotification(nextNotifications[0]);
      setNextNotifications((prev) => prev.slice(1));
    }
  }

  useEffect(() => {
    if (nextNotifications.length && notification === null)
      moveToNextNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextNotifications]);

  useEffect(() => {
    if (notification) {
      //@ts-ignore
      tt = setTimeout(
        () => pushNotification(null),
        notification.timeout || 5000
      );
    } else setTimeout(() => moveToNextNotification(), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  return [notification, pushNotification];
}
