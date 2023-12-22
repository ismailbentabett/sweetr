const Input = (props: {
  name: any;
  label: any;
  type: any;
  value: any;
  error: any;
  onInput: any;
}) => {
  const { name, label, type, value, error, onInput } = props;

  return (
    <div class="flex-it py-2">
      <label class="block text-sm font-medium text-white">{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        class="mt-1 block w-full rounded-md border-gray-500 text-white bg-gray-800 shadow-sm focus:border-froly-500 focus:ring-froly-500 sm:text-sm"
        value={value}
        onInput={onInput}
      />
      {error && (
        <div class="flex-it grow text-xs bg-red-400 text-white p-3 pl-3 mt-1 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
