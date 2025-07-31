// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; // Firebaseの認証状態監視関数をインポート
import { auth } from '../FirebaseConfig.js'; // ★作成したfirebaseConfigからauthをインポート

// 認証情報を提供するコンテキストを作成
export const AuthContext = createContext(null);

// 認証状態を管理し、子コンポーネントに提供するプロバイダーコンポーネント
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // 現在ログインしているユーザー情報
  const [loading, setLoading] = useState(true);         // 認証状態の読み込み中かどうかのフラグ

  // コンポーネントがマウントされたときと、認証状態が変わったときに実行
  useEffect(() => {
    // Firebaseの認証状態の変化を監視するリスナーを設定
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // ユーザー情報を更新
      setLoading(false);    // ロード完了
    });

    // コンポーネントがアンマウントされるときに、リスナーを解除してメモリリークを防ぐ
    return unsubscribe;
  }, []); // 空の依存配列なので、コンポーネントがマウントされたときに一度だけ実行

  // 認証状態のロード中は「ロード中...」と表示
  if (loading) {
    return <div>アプリの認証情報を読み込み中...</div>;
  }

  // ロード完了後、子コンポーネントにcurrentUser情報を提供
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// どこからでも認証状態を利用できるようにするカスタムフック
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // AuthProviderの外でuseAuthが使われた場合の警告
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};