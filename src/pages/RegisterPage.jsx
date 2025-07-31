import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // リダイレクト用
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebaseユーザー登録関数
import { auth, db } from '../FirebaseConfig.js'; // ★Firebase authとdbインスタンスをインポート
import { doc, setDoc } from 'firebase/firestore'; // Firestoreにデータを保存する関数

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // フォーム送信時の処理
  const handleRegister = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      // Firebase Authentication で新規ユーザーを作成
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ★オプション: Firestoreにユーザーの初期情報を保存（例: 作成日時）
      // usersコレクションにユーザーUIDをドキュメントIDとして保存
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date(),
        // displayName: '', // 必要であれば、後で追加することも可能
      });

      // 登録成功したらダッシュボードへリダイレクト
      navigate('/dashboard');
    } catch (err) {
      console.error("登録エラー:", err.message);
      // ユーザーに分かりやすいエラーメッセージを表示
      if (err.code === 'auth/email-already-in-use') {
        setError('このメールアドレスは既に使用されています。');
      } else if (err.code === 'auth/weak-password') {
        setError('パスワードは6文字以上で入力してください。');
      } else {
        setError('ユーザー登録に失敗しました。もう一度お試しください。');
      }
    }
  };

  return (
    <div>
      <h2>ユーザー登録</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>メールアドレス:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>パスワード:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">登録</button>
      </form>
      <p>すでにアカウントをお持ちの方は <a href="/login">こちら</a> からログイン</p>
    </div>
  );
}

export default RegisterPage;