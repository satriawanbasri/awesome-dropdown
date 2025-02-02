import { Form } from './Form'

export default {
    title: 'Form',
    component: Form,
}

export const SelectDropdownField = {
    args: {
        data: [
            { id: 1, text: 'Option 1', icon: 'fas fa-heart' },
            { id: 2, text: 'Option with icon', icon: 'fas fa-music' },
            { id: 3, text: 'Long Long Option 3', icon: 'fas fa-film' },
            { id: 4, text: 'Long Long Long Option 4', icon: 'fas fa-star' },
            { id: 5, text: 'Long Long Long Long Option 5', icon: 'fas fa-road' },
            { id: 6, text: 'Long Long Long Long Long Option 6', icon: 'fas fa-flag' },
        ],
        filterEnabled: true,
        multipleSelect: true,
        outlined: true,
        shorterList: true,
        highlightedText: true,
        renderOption: false,
        portal: false,
        zIndex: false,
    },
}
