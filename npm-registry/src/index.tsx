import React, { useState, useEffect, useRef, ChangeEvent, MouseEvent, FC } from 'react'
import { createPortal } from 'react-dom'
import './styles.css'

type Option = {
    id: string
    text: string
    icon?: string
}

interface AwesomeDropdownProps {
    data: string[]
    setSelectedOptionsResult: (options: Option[]) => void
    filterEnabled?: boolean
    multipleSelect?: boolean
    outlined?: boolean
    shorterList?: boolean
    highlightedText?: boolean
    renderOption?: boolean
    renderOptionComponent?: (option: Option, highlightText: void) => React.ReactNode
    portal?: boolean
    portalTarget?: HTMLElement | null
}

const AwesomeDropdown: FC<AwesomeDropdownProps> = ({
    data = [],
    setSelectedOptionsResult,
    filterEnabled = true,
    multipleSelect = true,
    outlined = true,
    shorterList = true,
    highlightedText = true,
    renderOption = false,
    renderOptionComponent = null,
    portal = false,
    portalTarget = null,
}) => {
    const [search, setSearch] = useState<string>('')
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
    const [zIndex, setZIndex] = useState<number>(1)
    const searchContainerRef = useRef<HTMLDivElement>(null)

    //Using font-awesome CDN to ensure libraries that are small in size and have minimal dependencies
    useEffect(() => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
        document.head.appendChild(link)
    }, [])

    // Get maximum z-index inside html body,
    // then add it by 1 to ensure floating menu works with elements that have a z-index greater than 1000,
    // even any z-index value, it will always appear on top, by taking the mazimum value
    useEffect(() => {
        const getMaxZIndex = () => {
            return Array.from(document.querySelectorAll('body *'))
                .map(el => parseFloat(window.getComputedStyle(el).zIndex))
                .filter(zIndex => !isNaN(zIndex))
                .reduce((max, zIndex) => Math.max(max, zIndex), 0)
        }
        var newMaxZIndex = getMaxZIndex() + 1
        setZIndex(newMaxZIndex)
    }, [])

    useEffect(() => {
        setSelectedOptionsResult(selectedOptions)
    }, [selectedOptions, setSelectedOptionsResult])

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleClearSearch = () => {
        setSearch('')
    }

    const handleInputClick = () => {
        setDropdownVisible(true)
    }

    const handleOptionClick = (option: Option) => {
        if (multipleSelect) {
            if (selectedOptions.some(o => o.id == option.id)) {
                setSelectedOptions(selectedOptions.filter(o => o.id !== option.id))
            } else {
                setSelectedOptions([...selectedOptions, option])
            }
        } else {
            setSelectedOptions([option])
        }
        setDropdownVisible(false)
        setSearch('')
    }

    const handleRemoveOption = (option: Option) => {
        setSelectedOptions(selectedOptions.filter(o => o.id !== option.id))
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
            setDropdownVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside as unknown as EventListener)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener)
        }
    }, [])

    const highlightText = (text: string) => {
        if (!search || !filterEnabled || !highlightedText) return text
        const regex = new RegExp(`(${search})`, 'gi')
        const parts = text.split(regex)
        return parts.map((part, index) =>
            regex.test(part) ? (
                <span key={index} className="highlight">
                    {part}
                </span>
            ) : (
                part
            )
        )
    }

    const dropdownContent = (
        <div className={'search-container'} ref={searchContainerRef}>
            <div className="dropdown">
                <div className="dropdown-trigger" style={{ backgroundColor: outlined ? '#fff' : '#d1d3d5' }} onClick={handleInputClick}>
                    <div className="selected-options-container">
                        {selectedOptions.map((option, index) => (
                            <div key={index} className="selected-option">
                                {option.text}
                                <i
                                    className="fa-regular fa-circle-xmark remove-icon"
                                    onClick={(e: MouseEvent) => {
                                        e.stopPropagation()
                                        handleRemoveOption(option)
                                    }}></i>
                            </div>
                        ))}
                    </div>
                    <i className="fas fa-chevron-down dropdown-icon"></i>
                </div>
                {dropdownVisible && (
                    <div className="dropdown-list" style={{ zIndex }}>
                        {filterEnabled && (
                            <div className="search-input-container">
                                <input type="text" id="search-input" className="search-input" value={search} onChange={handleSearchChange} />
                                <i className="fas fa-search search-icon"></i>
                                {search && <i className="fas fa-circle-xmark clear-icon" onClick={handleClearSearch}></i>}
                            </div>
                        )}
                        {data
                            .filter((option: Option) => !shorterList || option.text.toLowerCase().includes(search.toLowerCase()))
                            .map((option, index) => (
                                <div
                                    key={index}
                                    className={`dropdown-item ${selectedOptions.some(o => o.id == option.id) ? 'selected' : ''}`}
                                    onClick={() => handleOptionClick(option)}>
                                    {renderOption && renderOptionComponent
                                        ? renderOptionComponent(option, highlightText)
                                        : highlightText(option.text)}
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    )

    return portal && portalTarget ? createPortal(dropdownContent, portalTarget) : dropdownContent
}

export { AwesomeDropdown }
