import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // グローバルCSS

import App from './App.jsx'; // メインのAppコンポーネント

// ★AuthProviderをインポート
import { AuthProvider } from './contexts/AuthContext.jsx';

// ここはFirebaseの初期化コードがあった場所ですが、
// ステップ1でfirebaseConfig.js に分離しました。
// そのため、main.jsx ではfirebaseConfig.jsをインポートする必要はありません。
// auth, db などの変数もfirebaseConfig.jsでexportされており、
// 必要に応じて各コンポーネントやAuthContextから直接importして使います。

// HTMLのid="root"を持つ要素にReactアプリケーションをマウント
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ★AppコンポーネントをAuthProviderでラップします。 */}
    {/* これにより、App以下の全てのコンポーネントで認証情報が使えるようになります。 */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);