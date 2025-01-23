import { Input } from "@/components/ui/input";

interface FormRadioProps {
  label: string;
  name: string;
  options: { id: string; label: string; value: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormRadio({
  label,
  name,
  options,
  value,
  onChange,
}: FormRadioProps) {
  return (
    <li className="flex flex-col gap-1">
      <p>{label}</p>
      <ul className="flex gap-3 flex-wrap">
        {options.map((option) => (
          <li key={option.id} className="flex gap-2 items-center">
            <Input
              type="radio"
              id={option.id}
              name={name}
              className="h-fit"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
            />
            <label htmlFor={option.id}>{option.label}</label>
          </li>
        ))}
      </ul>
    </li>
  );
}