export default function Button({
  children: buttonDescription = 'Button Description',
  onButtonClick = null,
  colorClass = 'bg-gray-200',
  type = 'button',
}) {
  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }
  return (
    <button
      type={type}
      className={`border rounded-md p-2 w-24 cursor-pointer ${colorClass}`}
      onClick={handleButtonClick}
    >
      {buttonDescription}
    </button>
  );
}
