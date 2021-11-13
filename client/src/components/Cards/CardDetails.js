import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import moment from "moment";
import firebase from 'firebase'
import "./CardDetails.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router";


function CardDetails({ doc}) {
  
  return (
    <div className="card-details-conatiner">
      <img src={doc.url} alt={doc.story} />
      <div className="card-details-info">
                
        <p>Story : {doc.story}</p>
        <p>Tags : {doc.tags}</p>
        <p>Author : {doc.author_name}</p>
        <span>Created At : {doc.createdAt}</span>
      </div>
    </div>
  );
}

export default CardDetails;
