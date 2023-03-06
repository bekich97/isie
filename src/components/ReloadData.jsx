import React from 'react';

export default function ReloadData({onClickFunc}) {
  return (
    <div className=''>
        <span>Something went wrong. Retry again.</span>
        <button className='reload-data' onClick={onClickFunc}>
            <span className="material-icons-outlined icon">
                refresh
            </span>
            Retry
        </button>
    </div>
  )
}
