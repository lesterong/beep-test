import {useRef, useState} from "react";
import {usePopper} from 'react-popper';
import {clsx} from 'clsx';

// eslint-disable-next-line react/prop-types
const Autocomplete = ({dataSource = [], label, description, disabled = false}) => {
  const [query, setQuery] = useState('')
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
    setQuery(d);
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
      {isShown && <div className="absolute top-0 left-0 w-dvw h-dvh bg-transparent"
                       onClick={() => setIsShown(false)}></div>}
      <div className="flex flex-col gap-1">
        <label className="font-medium" htmlFor={label}>{label}</label>
        {description && (<span className="text-gray-500 text-sm w-72">{description}</span>)}
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
      </div>
      {isShown && (
        <div className="shadow-sm w-72 bg-white py-2 rounded-xl" ref={setPopperElement}
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
                {d}
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Autocomplete;
