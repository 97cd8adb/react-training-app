// src/pages/DashboardPage.jsx

import React from 'react';

const DashboardPage = () => {
  return (
    <div> {/* 全体のコンテナ */}
      <h1>ダッシュボード</h1>
      <p>今日のトレーニングを記録し、これまでの成果を確認しましょう！</p>

      {/* --- トレーニング記録フォーム --- */}
      <hr /> {/* 区切り線 */}
      <h2>今日のトレーニングを記録</h2>
      <form> {/* フォーム全体 */}
        {/* 日付と累計回数、部位 */}
        <div>
          <label htmlFor="recordDate">日付:</label>
          <input type="date" id="recordDate" name="recordDate" defaultValue={new Date().toISOString().split('T')[0]} />
        </div>
        <div>
          <div>
            <label htmlFor="cumulativeYear">年間累計回数:</label>
            <input type="number" id="cumulativeYear" name="cumulativeYear" placeholder="例: 120" />
          </div>
          <div>
            <label htmlFor="cumulativeMonth">月間累計回数:</label>
            <input type="number" id="cumulativeMonth" name="cumulativeMonth" placeholder="例: 16" />
          </div>
        </div>
        <div>
          <label htmlFor="trainedParts">行った部位:</label>
          <input type="text" id="trainedParts" name="trainedParts" placeholder="例: 肩・腕" />
        </div>

        {/* --- 個々のトレーニング種目入力エリア --- */}
        <div> {/* 各種目コンテナ */}
          <h3>トレーニング種目 #1</h3>
          <div>
            <label htmlFor="startTime1">開始時刻:</label>
            <input type="time" id="startTime1" name="startTime1" />
          </div>
          <div>
            <label htmlFor="trainingName1">トレーニング名:</label>
            <input type="text" id="trainingName1" name="trainingName1" placeholder="例: ダンベルショルダープレス" />
          </div>

          {/* セットの入力欄 */}
          <div> {/* セット入力用のグループ */}
            <div>
              <label htmlFor="weight1_1">重量 (kg):</label>
              <input type="number" id="weight1_1" name="weight1_1" placeholder="例: 34" />
            </div>
            <div>
              <label htmlFor="reps1_1">回数:</label>
              <input type="number" id="reps1_1" name="reps1_1" placeholder="例: 10" />
            </div>
            <div>
              <label htmlFor="sets1_1">セット:</label>
              <input type="number" id="sets1_1" name="sets1_1" placeholder="例: 3" />
            </div>
          </div>

          {/* 自由記述メモ欄 */}
          <div>
            <label htmlFor="workoutNote1">メモ (任意):</label>
            <textarea id="workoutNote1" name="workoutNote1" rows="2" placeholder="例: 自転車 30分 600kcal"></textarea>
          </div>
        </div>

        <button type="button">
          + 別のトレーニング種目を追加
        </button>

        <button type="submit">
          トレーニングを記録！
        </button>
      </form>

      {/* --- 過去のトレーニング記録リスト --- */}
      <hr /> {/* 区切り線 */}
      <h2>過去のトレーニング記録</h2>
      <div> {/* 過去の記録リストのコンテナ */}
        <p>まだ記録がありません。上のフォームから最初の記録を追加しましょう！</p>
      </div>
    </div>
  );
}

export default DashboardPage;