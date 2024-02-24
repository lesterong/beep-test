/**
 * Autocomplete Component
 *
 * @param {Array<String>} dataSource The options to display.
 * @param {string} label A label to display for the component.
 * @param {string} description A description to display below the label.
 * @param {function} transformDisplay Change how the value is displayed.
 * @param {boolean} async To specify if the field searches synchronously or asynchronously.
 * @param {boolean} disabled To specify if the field is enabled.
 */

import {useState} from "react";
import {usePopper} from 'react-popper';
import {clsx} from 'clsx';

// eslint-disable-next-line react/prop-types
const Autocomplete = ({dataSource = [], label, description, transformDisplay = (str) => str, async = false, disabled = false}) => {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const {styles, attributes} = usePopper(referenceElement, popperElement, {
    modifiers: [{
      name: "offset",
      options: {
        allowedAutoPlacements: ['top', 'bottom'],
        offset: [0, 8],
      }
    }],
    placement: "bottom"
  });

  const handleSearchInput = (e) => {
    setIsShown(true)
    setQuery(e.target.value)
  }

  const handleSelect = (d) => {
    setQuery(transformDisplay(d));
    setIsShown(false);
  }

  const dataToShow = dataSource.filter(d => d.toLowerCase().includes(query.toLowerCase()))

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (selectedIndex > dataToShow.length) {
        return;
      }
      handleSelect(dataToShow[selectedIndex])
      return;
    }

    if (e.key === 'Escape') {
      setIsShown(false);
      referenceElement.blur();
      return;
    }

    if (e.key === 'ArrowDown' && !isShown) {
      e.preventDefault();
      setIsShown(true);
      return;
    }

    let nextIndex = selectedIndex;

    if (e.key === 'ArrowDown' && isShown) {
      e.preventDefault();
      nextIndex = (selectedIndex + 1) % dataToShow.length;
    }

    if (e.key === 'ArrowUp' && isShown) {
      e.preventDefault();
      nextIndex = selectedIndex - 1;

      if (nextIndex < 0) {
        nextIndex = dataToShow.length - 1;
      }
    }

    if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && dataToShow.length === 0) {
      setSelectedIndex(-1);
      return;
    }

    setSelectedIndex(nextIndex);
  };


  return (
    <>
      {isShown && <div className="absolute top-0 left-0 w-dvw h-dvh bg-transparent z-10"
                       onClick={() => setIsShown(false)}></div>}
      <div className="flex flex-col gap-1">
        <label className="font-medium" htmlFor={label}>{label}</label>
        {description && (<span className="text-gray-500 text-sm w-72">{description}</span>)}
        <div className="relative w-72">
          <input
            className="border border-gray-200/50 w-72 px-3 py-3.5 outline-4 outline-blue-600 outline-offset-2 rounded-xl"
            type="text" value={query} placeholder="Search..."
            onChange={handleSearchInput}
            onFocus={() => setIsShown(true)}
            ref={setReferenceElement}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            id={label}
          />
          {async && <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 animate-spin" fill="currentColor"
                 viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
              <path
                d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
            </svg>
          </span>}
        </div>
      </div>
      {isShown && (
        <div className="shadow-sm w-72 bg-white py-2 rounded-xl z-20" ref={setPopperElement}
             style={styles.popper} {...attributes.popper}>
          {dataToShow.length === 0 && (
            <div className="px-3 py-1 text-gray-600">Nothing found.</div>
          )}
          {dataToShow.map((d, i) => {
            return (
              <button
                className={clsx("px-3 py-1 block w-full text-left transition-colors duration-100 focus-visible:outline-none", {'bg-blue-100': dataToShow[selectedIndex] === d})}
                key={d}
                onMouseOver={() => setSelectedIndex(i)}
                onClick={() => {
                  referenceElement.focus();
                  handleSelect(d)
                }}
              >
                {transformDisplay(d)}
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Autocomplete;
