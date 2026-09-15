function ProgressBar({ progress }) {
  return (
    <div>
      <div>{progress}%</div>

      <div>
        <div style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default ProgressBar;