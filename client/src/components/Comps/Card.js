import React from 'react'

const Card = ({image}) => {
    
    let tags = image.tags;
console.log(tags)
    return (
        <div className="max-w-sm  rounded shadow-lg overflow-hidden">

            <img src={image.url} alt="" className="w-full h-96"/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl text-purple-500 mb-2">
                    Photo by {image.author_name}
                </div>
                <ul>
                <li> <strong>Views:</strong> {image.views} </li>
                <li> <strong>Downloads:</strong> {image.downloads} </li>
                <li> <strong>Likes:</strong> {image.likes} </li>
                </ul>
            </div>
            <div className="px-6 py-4">
               {/*  {image.tags.map((tag , index) => (
                    <span key={index} className="inline-block bg-gray-200 rounded-full text-gray-700 px-3 py-1 font-semibold text-sm mr-2 mb-2">
                        #{tag}
                    </span>
                ))} */}
            
            </div>
        </div>
    )
}

export default Card;
