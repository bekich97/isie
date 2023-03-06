import React, { useState } from 'react';
import '../../assets/css/main.scss';

export default function RightHeader() {
  const [searchPop, setSearchPop] = useState(false);
  return (
    <div className='header'>
        <div className='header_right_part'>
          <form>
            <input type="text" className='search_form_input' onFocus={() => setSearchPop(true)} onBlur={() => setSearchPop(false)} placeholder='Search MyApp' />
            <span className="material-icons-outlined search_icon">search</span>
            <div className={"popover_search " + (searchPop ? "open" : "")}>
              Try searching for people, topics, or keywords
            </div>
          </form>
        </div>
    </div>
  )
}
