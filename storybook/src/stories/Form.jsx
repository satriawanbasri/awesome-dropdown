import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { AwesomeDropdown } from 'awesome-dropdown'
import './form.css'

const renderOptionComponent = (option, highlightText) => (
    <div className="render-option">
        <i className={option?.icon} style={{ marginRight: '8px' }}></i>
        <span>{highlightText(option?.text)}</span>
    </div>
)

export const Form = ({
    data = [],
    filterEnabled = true,
    multipleSelect = true,
    outlined = true,
    shorterList = true,
    highlightedText = true,
    renderOption = false,
    portal = false,
    zIndex = false,
}) => {
    const [selectedOptions, setSelectedOptions] = useState([])
    const portalTargetRef = useRef(null)

    useEffect(() => {
        console.log('result:', selectedOptions)
    }, [selectedOptions])

    useEffect(() => {
        portalTargetRef.current = document.getElementById('dropdown-portal')
    }, [])

    return (
        <>
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
                        data={data}
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
        </>
    )
}

Form.propTypes = {
    data: PropTypes.array,
    filterEnabled: PropTypes.bool,
    multipleSelect: PropTypes.bool,
    outlined: PropTypes.bool,
    shorterList: PropTypes.bool,
    highlightedText: PropTypes.bool,
    renderOption: PropTypes.bool,
    portal: PropTypes.bool,
    zIndex: PropTypes.bool,
}

Form.defaultProps = {
    data: [],
    filterEnabled: true,
    multipleSelect: true,
    outlined: true,
    shorterList: true,
    highlightedText: true,
    renderOption: false,
    portal: false,
    zIndex: false,
}
