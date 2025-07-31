import React from 'react';
import { signOut } from 'firebase/auth'; // Firebaseログアウト関数
import { auth } from '../firebaseConfig'; // ★Firebase authインスタンスをインポート

function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebaseからログアウト
      // ログアウト後のリダイレクトはAuthContextが自動で処理します。
      alert("ログアウトしました！"); // ログアウトの確認メッセージ
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