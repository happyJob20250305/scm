import { FC } from "react";
import { SelectBox } from "./styled";

interface SelectBoxProps {
    options: { label: string; value: string | number }[];
    value?: string | number;
    onChange: React.Dispatch<React.SetStateAction<string | number>>;
    variant?: "default" | "primary" | "danger";
    fullwidth?: boolean;
}

export const StyledSelectBox: FC<SelectBoxProps> = ({
    options,
    value,
    onChange,
    variant = "default",
    fullwidth = false,
}) => {
    return (
        <SelectBox
            onChange={(e) => onChange(e.target.value)}
            variant={variant}
            fullwidth={fullwidth || undefined}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </SelectBox>
    );
};
