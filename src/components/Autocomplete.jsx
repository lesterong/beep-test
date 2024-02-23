import {useState} from "react";
import {usePopper} from 'react-popper';
import {clsx} from 'clsx';

const Autocomplete = () => {
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
    setQuery(e.target.value)
  }

  const data = ["Apple", "Orange", "Pear"]
  const dataToShow = data.filter(d => d.toLowerCase().includes(query.toLowerCase()))

  const handleKeyDown = (e) => {
    let nextIndex = selectedIndex;

    if (e.key === 'ArrowDown') {
      nextIndex = (selectedIndex + 1) % dataToShow.length;
    }

    if (e.key === 'ArrowUp') {
      nextIndex = selectedIndex - 1;

      if (nextIndex < 0) {
        nextIndex = dataToShow.length - 1;
      }
    }

    setSelectedIndex(nextIndex);
  };


  return (
    <>
      <input
        className="border border-gray-200/50 w-72 px-3 py-3.5 outline-4 outline-blue-600 outline-offset-2 rounded-xl"
        type="text" value={query} placeholder="Search..."
        onChange={handleSearchInput}
        onFocus={() => setIsShown(true)}
        onBlur={() => setIsShown(false)}
        ref={setReferenceElement}
        onKeyDown={handleKeyDown}
      />
      {isShown && (
        <div className="shadow-sm w-72 bg-white py-2 rounded-xl" ref={setPopperElement}
             style={styles.popper} {...attributes.popper}>
          {dataToShow.map(d => {
            return (
              <button
                className={clsx("px-3 py-1 block w-full text-left transition-colors duration-100 hover:bg-blue-100 focus-visible:bg-blue-100 focus-visible:outline-none", {'bg-blue-100': dataToShow[selectedIndex] === d})}
                key={d}
                tabIndex={-1}
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
