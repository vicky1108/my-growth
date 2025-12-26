import styles from "./Forms.module.scss";

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export const FormInput = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
}: FormInputProps) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
        placeholder={placeholder}
      />
    </div>
  );
};


