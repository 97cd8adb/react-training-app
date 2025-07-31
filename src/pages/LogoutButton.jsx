import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../FirebaseConfig.js';

function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("ログアウトしました！");
    } catch (error) {
      console.error("ログアウトエラー:", error);
      alert("ログアウトに失敗しました。");
    }
  };

  return (
    <button onClick={handleLogout} style={{ marginLeft: '10px' }}>ログアウト</button>
  );
}

export default LogoutButton;