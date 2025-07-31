import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // リダイレクト用
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebaseログイン関数
import { auth } from '../firebaseConfig'; // ★Firebase authインスタンスをインポート

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // エラーメッセージ表示用
  const navigate = useNavigate(); // ログイン成功後にリダイレクトするために使用

  // フォーム送信時の処理
  const handleLogin = async (e) => {
    e.preventDefault(); // ページの再読み込みを防ぐ

    setError(null); // エラーメッセージをリセット

    try {
      // Firebase Authentication でログイン処理を実行
      await signInWithEmailAndPassword(auth, email, password);
      // ログイン成功したらダッシュボードへリダイレクト
      navigate('/dashboard');
    } catch (err) {
      console.error("ログインエラー:", err.message);
      // ユーザーに分かりやすいエラーメッセージを表示
      if (err.code === 'auth/invalid-email') {
        setError('無効なメールアドレスです。');
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('メールアドレスまたはパスワードが間違っています。');
      } else {
        setError('ログインに失敗しました。もう一度お試しください。');
      }
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* エラーメッセージ表示 */}
      <form onSubmit={handleLogin}>
        <div>
          <label>メールアドレス:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // 必須入力
          />
        </div>
        <div>
          <label>パスワード:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // 必須入力
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
      <p>アカウントをお持ちでない方は <a href="/register">こちら</a> から登録</p>
    </div>
  );
}

export default LoginPage;