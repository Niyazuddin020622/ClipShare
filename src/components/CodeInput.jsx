import { useRef } from "react";

function CodeInput({ length = 6, value, setValue }) {
  const inputRefs = useRef([]);

  const digits = Array.from(
    { length },
    (_, index) => value[index] || ""
  );

  const handleChange = (index, inputValue) => {
    const digit = inputValue
      .replace(/\D/g, "")
      .slice(-1);

    const newValue = [...digits];
    newValue[index] = digit;

    setValue(newValue.join(""));

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (
      event.key === "Backspace" &&
      !digits[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    setValue(pasted);

    const nextIndex = Math.min(
      pasted.length,
      length - 1
    );

    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          value={digit}
          maxLength={1}
          inputMode="numeric"
          autoComplete="one-time-code"
          onChange={(event) =>
            handleChange(index, event.target.value)
          }
          onKeyDown={(event) =>
            handleKeyDown(index, event)
          }
          onPaste={handlePaste}
          className="h-12 w-11 rounded-xl border border-gray-300 bg-white text-center text-xl font-semibold text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200 sm:h-14 sm:w-14"
        />
      ))}
    </div>
  );
}

export default CodeInput;