import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css'; // グローバルCSS（必要に応じて）

// ★認証コンテキストのカスタムフックをインポート
import { useAuth } from './contexts/AuthContext.jsx';

// ★各ページコンポーネントをインポート
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import LogoutButton from './pages/LogoutButton.jsx'; // ログアウトボタンをインポート

function App() {
  // useAuth() フックを使って、現在のユーザー情報と認証状態のロード状況を取得
  const { currentUser, loading } = useAuth();

  // 認証情報を読み込み中の場合、ローディングメッセージを表示
  if (loading) {
    return <div>アプリを読み込み中...</div>;
  }

  return (
    <Router>
      <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '15px' }}>
          {/* ユーザーがログインしている場合にのみ表示されるリンク */}
          {currentUser && <li><Link to="/dashboard">ダッシュボード</Link></li>}
          {currentUser && <li><Link to="/settings">設定</Link></li>}
        </ul>
        <div style={{ marginRight: '15px' }}>
          {/* ユーザーがログインしているかどうかに応じて、右側の表示を切り替え */}
          {currentUser ? (
            // ログイン済みの場合
            <>
              <span style={{ marginRight: '10px' }}>{currentUser.email} でログイン中</span>
              <LogoutButton /> {/* ログアウトボタンを表示 */}
            </>
          ) : (
            // 未ログインの場合
            <>
              <Link to="/login" style={{ marginRight: '10px' }}>ログイン</Link>
              <Link to="/register">登録</Link>
            </>
          )}
        </div>
      </nav>

      <div style={{ padding: '20px' }}>
        <Routes>
          {/* 認証が必要ないページ（ログイン、ユーザー登録） */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ユーザーがログインしている場合に表示されるページ */}
          {currentUser ? (
            // ログイン済みの場合
            <>
              {/* アプリのトップページ（'/'）はダッシュボードにリダイレクト */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              {/* それ以外の未定義のパスもダッシュボードへリダイレクト */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          ) : (
            // 未ログインの場合、ログイン、登録以外のパスは全てログインページへリダイレクト
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;