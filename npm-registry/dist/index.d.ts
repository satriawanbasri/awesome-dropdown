import React, { FC } from 'react';
import './styles.css';
type Option = {
    id: string;
    text: string;
    icon?: string;
};
interface AwesomeDropdownProps {
    data: string[];
    setSelectedOptionsResult: (options: Option[]) => void;
    filterEnabled?: boolean;
    multipleSelect?: boolean;
    outlined?: boolean;
    shorterList?: boolean;
    highlightedText?: boolean;
    renderOption?: boolean;
    renderOptionComponent?: (option: Option, highlightText: void) => React.ReactNode;
    portal?: boolean;
    portalTarget?: HTMLElement | null;
}
declare const AwesomeDropdown: FC<AwesomeDropdownProps>;
export { AwesomeDropdown };
