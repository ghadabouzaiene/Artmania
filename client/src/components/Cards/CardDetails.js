import React from "react";


function CardDetails({ doc}) {
  
  return (
    <div className="card-details-conatiner">
      <img src={doc.url} alt={doc.story} />
      <div className="card-details-info">
                
        <p>Story : {doc.story}</p>
        <p>Tags : {"#"+doc.tags+" "}</p>
        <p>Author : {doc.author_name}</p>
        <span>Created At : {doc.createdAt}</span>
      </div>
    </div>
  );
}

export default CardDetails;
