import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'

const LoginPage = () => 
  <div>
    <h2>ログイン</h2>
    <p>ログインフォームをここに作ります。</p>
  </div>;

const DashboardPage = () =>
  <div>
    <h2>ダッシュボード</h2>
    <p>日々のトレーニングを記録・確認できる画面です。</p>
  </div>;
const SettingsPage = () =>
  <div>
    <h2>設定</h2>
    <p>各種設定を行う画面です。</p>
  </div>;

const RegisterPage = () =>
  <div>
    <h2>ユーザー登録</h2>
    <p>新規ユーザー登録フォームをここに作ります。</p>
  </div>;

const LogoutPage = () =>
  <div>
    <h2>ログアウト</h2>
    <p>ログアウトします</p>
  </div>;

  const App = () => {
    return (
      <Router>
        <nav style={
          { padding: '10px', backgroundColor: '#f0f0f0' }
          }>
          <ul style={
            { listStyle: 'none', padding: 0, display: 'flex', gap: '15px' }
            }>
            <li><Link to="/register">登録</Link></li>
            <li><Link to="/login">ログイン</Link></li>
            <li><Link to="/dashboard">ダッシュボード</Link></li>
            <li><Link to="/settings">設定</Link></li>
            <li><Link to="/logout">ログアウト</Link></li>
          </ul>
        </nav>
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/logout" element={<LogoutPage/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    );
  }
export default App;