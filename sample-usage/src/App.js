import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import { AwesomeDropdown } from 'awesome-dropdown'

const dummyData = [
    { id: 1, text: 'Option 1', icon: 'fas fa-heart' },
    { id: 2, text: 'Option with icon', icon: 'fas fa-music' },
    { id: 3, text: 'Long Long Option 3', icon: 'fas fa-film' },
    { id: 4, text: 'Long Long Long Option 4', icon: 'fas fa-star' },
    { id: 5, text: 'Long Long Long Long Option 5', icon: 'fas fa-road' },
    { id: 6, text: 'Long Long Long Long Long Option 6', icon: 'fas fa-flag' },
]

const renderOptionComponent = (option, highlightText) => (
    <div className="render-option">
        <i className={option?.icon} style={{ marginRight: '8px' }}></i>
        <span>{highlightText(option?.text)}</span>
    </div>
)

const App = () => {
    const [filterEnabled, setFilterEnabled] = useState(true)
    const [multipleSelect, setMultipleSelect] = useState(true)
    const [outlined, setOutlined] = useState(true)
    const [shorterList, setShorterList] = useState(true)
    const [highlightedText, setHighlightedText] = useState(true)
    const [selectedOptions, setSelectedOptions] = useState([])
    const [renderOption, setRenderOption] = useState(false)
    const [portal, setPortal] = useState(false)
    const [zIndex, setZIndex] = useState(false)
    const portalTargetRef = useRef(null)

    useEffect(() => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
        document.head.appendChild(link)
    }, [])

    useEffect(() => {
        console.log('result:', selectedOptions)
    }, [selectedOptions])

    useEffect(() => {
        portalTargetRef.current = document.getElementById('dropdown-portal')
    }, [])

    const toggleFilter = () => {
        setFilterEnabled(!filterEnabled)
    }

    const toggleMultipleSelect = () => {
        setMultipleSelect(!multipleSelect)
    }

    const toggleOutlined = () => {
        setOutlined(!outlined)
    }

    const toggleShorterList = () => {
        setShorterList(!shorterList)
    }

    const toggleHighlightedText = () => {
        setHighlightedText(!highlightedText)
    }

    const toggleRenderOption = () => {
        setRenderOption(!renderOption)
    }

    const togglePortal = () => {
        setPortal(!portal)
    }

    const toggleZIndex = () => {
        setZIndex(!zIndex)
    }

    return (
        <div className="App">
            <div className="top-section">
                <div className="container">
                    <label
                        className="label"
                        style={{
                            display: !portal ? 'inherit' : 'none',
                        }}>
                        Label
                    </label>
                    <div className="combobox-container">
                        <AwesomeDropdown
                            data={dummyData}
                            setSelectedOptionsResult={setSelectedOptions}
                            filterEnabled={filterEnabled}
                            multipleSelect={multipleSelect}
                            outlined={outlined}
                            shorterList={shorterList}
                            highlightedText={highlightedText}
                            renderOption={renderOption}
                            renderOptionComponent={renderOptionComponent}
                            portal={portal}
                            portalTarget={portalTargetRef.current}
                        />
                        <h3
                            className="portal"
                            style={{
                                display: portal ? 'inherit' : 'none',
                            }}>
                            Portal
                        </h3>
                        <div
                            id="dropdown-portal"
                            style={{
                                display: portal ? 'inherit' : 'none',
                            }}>
                            <label className="label" style={{ color: '#eee' }}>
                                Label
                            </label>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
                <div
                    className="higher-z-index"
                    style={{
                        display: zIndex ? 'inherit' : 'none',
                    }}>
                    This container has a higher than 1000 z-index (1100).
                </div>
            </div>
            <div className="separator"></div>
            <div className="bottom-section">
                <table className="options-table">
                    <tbody>
                        <tr>
                            <td className="label-cell">With Search</td>
                            <td className="switch-cell">
                                <label className="switch">
                                    <input type="checkbox" checked={filterEnabled} onChange={toggleFilter} />
                                    <span className="slider"></span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td className="label-cell">Multiple</td>
                            <td className="switch-cell">
                                <label className="switch">
                                    <input type="checkbox" checked={multipleSelect} onChange={toggleMultipleSelect} />
                                    <span className="slider"></span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td className="label-cell">Outlined</td>
                            <td className="switch-cell">
                                <label className="switch">
                                    <input type="checkbox" checked={outlined} onChange={toggleOutlined} />
                                    <span className="slider"></span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td className="label-cell">Shorter List</td>
                            <td className="switch-cell">
                                <label className="switch">
                                    <input type="checkbox" checked={shorterList} onChange={toggleShorterList} />
                                    <span className="slider"></span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td className="label-cell">Highlighted Text</td>
                            <td className="switch-cell">
                                <label className="switch">
                                    <input type="checkbox" checked={highlightedText} onChange={toggleHighlightedText} />
                                    <span className="slider"></span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td className="label-cell">Render Option</td>
                            <td className="switch-cell">
                                <label className="switch">
                                    <input type="checkbox" checked={renderOption} onChange={toggleRenderOption} />
                                    <span className="slider"></span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td className="label-cell">Portal</td>
                            <td className="switch-cell">
                                <label className="switch">
                                    <input type="checkbox" checked={portal} onChange={togglePortal} />
                                    <span className="slider"></span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td className="label-cell">z-index</td>
                            <td className="switch-cell">
                                <label className="switch">
                                    <input type="checkbox" checked={zIndex} onChange={toggleZIndex} />
                                    <span className="slider"></span>
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default App
