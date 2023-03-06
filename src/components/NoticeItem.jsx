import React from 'react';

const NoticeItem = () => {
    return (
        <div className='notice-item d-flex'>
            <div className='left-part'>
                <div
                    className="profile-image"
                ></div>
            </div>
            <div className='right-part w-100'>
                <div className='top d-flex justify-content-between'>
                    <div className='left'>
                        <span className='fullname'>
                            Medet Kadyrow 
                            <span className='material-icons-outlined verified'>verified</span>
                        </span>
                        <span className='nickname date'>@bekich97 &nbsp;&#183;&nbsp; Jan 12, 2022</span>
                    </div>
                    <div className='right three-dots'>
                        <span className="material-icons-outlined fs-3">more_horiz</span>
                    </div>
                </div>
                <div className='body'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere voluptatem, tempora alias dolorem earum quibusdam fugit? Accusantium ullam sint et suscipit minus explicabo vero recusandae eveniet earum dignissimos. Quisquam, tenetur.
                </div>
            </div>
        </div>
    );
}

export default NoticeItem;
