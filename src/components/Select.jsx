import { getNewId } from '../services/idService';

const DEFAULT_OPTIONS = [
  { id: 'op1', description: 'Opção 1' },
  { id: 'op2', description: 'Opção 2' },
];

export default function Select({
  id = getNewId(),
  labelDescription = 'Title for <select>',
  selectedValue = DEFAULT_OPTIONS[0],
  onChangeValue = null,
  children: options = DEFAULT_OPTIONS,
}) {
  function handleSelectChange(event) {
    const newValue = event.currentTarget.value;
    if (onChangeValue) {
      onChangeValue(newValue);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <label htmlFor={id}>
        {labelDescription}
        <select
          id={id}
          className="bg-gray-100 py-1 px-3 rounded-md shadow-md"
          value={selectedValue.id}
          onChange={handleSelectChange}
        >
          {options.map(({ id, description }) => {
            return (
              <option key={id} value={id}>
                {description}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}
