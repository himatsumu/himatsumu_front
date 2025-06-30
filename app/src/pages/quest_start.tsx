export default function Quest_start() {
  return (
    <>
      <h1>クエスト設定</h1>
      <form action="">
        <div>
          <label>今日の予定</label>
          <select>
            <option value="">--予定を選択してください--</option>
          </select>
        </div>
        <div>
          <label>開始時間</label>
          <input type="time" />
        </div>
        <div>
          <label>終了時間</label>
          <input type="time" />
        </div>
      </form>
    </>
  );
}
