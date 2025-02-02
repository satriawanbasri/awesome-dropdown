var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './styles.css';
var AwesomeDropdown = function (_a) {
    var _b = _a.data, data = _b === void 0 ? [] : _b, setSelectedOptionsResult = _a.setSelectedOptionsResult, _c = _a.filterEnabled, filterEnabled = _c === void 0 ? true : _c, _d = _a.multipleSelect, multipleSelect = _d === void 0 ? true : _d, _e = _a.outlined, outlined = _e === void 0 ? true : _e, _f = _a.shorterList, shorterList = _f === void 0 ? true : _f, _g = _a.highlightedText, highlightedText = _g === void 0 ? true : _g, _h = _a.renderOption, renderOption = _h === void 0 ? false : _h, _j = _a.renderOptionComponent, renderOptionComponent = _j === void 0 ? null : _j, _k = _a.portal, portal = _k === void 0 ? false : _k, _l = _a.portalTarget, portalTarget = _l === void 0 ? null : _l;
    var _m = useState(''), search = _m[0], setSearch = _m[1];
    var _o = useState(false), dropdownVisible = _o[0], setDropdownVisible = _o[1];
    var _p = useState([]), selectedOptions = _p[0], setSelectedOptions = _p[1];
    var _q = useState(1), zIndex = _q[0], setZIndex = _q[1];
    var searchContainerRef = useRef(null);
    //Using font-awesome CDN to ensure libraries that are small in size and have minimal dependencies
    useEffect(function () {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
        document.head.appendChild(link);
    }, []);
    // Get maximum z-index inside html body,
    // then add it by 1 to ensure floating menu works with elements that have a z-index greater than 1000,
    // even any z-index value, it will always appear on top, by taking the mazimum value
    useEffect(function () {
        var getMaxZIndex = function () {
            return Array.from(document.querySelectorAll('body *'))
                .map(function (el) { return parseFloat(window.getComputedStyle(el).zIndex); })
                .filter(function (zIndex) { return !isNaN(zIndex); })
                .reduce(function (max, zIndex) { return Math.max(max, zIndex); }, 0);
        };
        var newMaxZIndex = getMaxZIndex() + 1;
        setZIndex(newMaxZIndex);
    }, []);
    useEffect(function () {
        setSelectedOptionsResult(selectedOptions);
    }, [selectedOptions, setSelectedOptionsResult]);
    var handleSearchChange = function (e) {
        setSearch(e.target.value);
    };
    var handleClearSearch = function () {
        setSearch('');
    };
    var handleInputClick = function () {
        setDropdownVisible(true);
    };
    var handleOptionClick = function (option) {
        if (multipleSelect) {
            if (selectedOptions.some(function (o) { return o.id == option.id; })) {
                setSelectedOptions(selectedOptions.filter(function (o) { return o.id !== option.id; }));
            }
            else {
                setSelectedOptions(__spreadArray(__spreadArray([], selectedOptions, true), [option], false));
            }
        }
        else {
            setSelectedOptions([option]);
        }
        setDropdownVisible(false);
        setSearch('');
    };
    var handleRemoveOption = function (option) {
        setSelectedOptions(selectedOptions.filter(function (o) { return o.id !== option.id; }));
    };
    var handleClickOutside = function (event) {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };
    useEffect(function () {
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    var highlightText = function (text) {
        if (!search || !filterEnabled || !highlightedText)
            return text;
        var regex = new RegExp("(".concat(search, ")"), 'gi');
        var parts = text.split(regex);
        return parts.map(function (part, index) {
            return regex.test(part) ? (React.createElement("span", { key: index, className: "highlight" }, part)) : (part);
        });
    };
    var dropdownContent = (React.createElement("div", { className: 'search-container', ref: searchContainerRef },
        React.createElement("div", { className: "dropdown" },
            React.createElement("div", { className: "dropdown-trigger", style: { backgroundColor: outlined ? '#fff' : '#d1d3d5' }, onClick: handleInputClick },
                React.createElement("div", { className: "selected-options-container" }, selectedOptions.map(function (option, index) { return (React.createElement("div", { key: index, className: "selected-option" },
                    option.text,
                    React.createElement("i", { className: "fa-regular fa-circle-xmark remove-icon", onClick: function (e) {
                            e.stopPropagation();
                            handleRemoveOption(option);
                        } }))); })),
                React.createElement("i", { className: "fas fa-chevron-down dropdown-icon" })),
            dropdownVisible && (React.createElement("div", { className: "dropdown-list", style: { zIndex: zIndex } },
                filterEnabled && (React.createElement("div", { className: "search-input-container" },
                    React.createElement("input", { type: "text", id: "search-input", className: "search-input", value: search, onChange: handleSearchChange }),
                    React.createElement("i", { className: "fas fa-search search-icon" }),
                    search && React.createElement("i", { className: "fas fa-circle-xmark clear-icon", onClick: handleClearSearch }))),
                data
                    .filter(function (option) { return !shorterList || option.text.toLowerCase().includes(search.toLowerCase()); })
                    .map(function (option, index) { return (React.createElement("div", { key: index, className: "dropdown-item ".concat(selectedOptions.some(function (o) { return o.id == option.id; }) ? 'selected' : ''), onClick: function () { return handleOptionClick(option); } }, renderOption && renderOptionComponent
                    ? renderOptionComponent(option, highlightText)
                    : highlightText(option.text))); }))))));
    return portal && portalTarget ? createPortal(dropdownContent, portalTarget) : dropdownContent;
};
export { AwesomeDropdown };
