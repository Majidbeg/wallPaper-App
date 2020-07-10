import React, { useState, useEffect } from 'react';
import ImageApi from '../../utills/API/allImagesApi'
import './home.css'
import Navbar from "../navbar/navbar"
import RedHeart from '../assets/redHeart.png'
import Download from '../assets/download.png'
import jwt from 'jsonwebtoken';
import { useAlert } from "react-alert";
import { Link } from 'react-router-dom'


export function Home(props) {

    const [image, setIamge] = useState([]);
    const [page, setPage] = useState(20);
    const alert = useAlert();

    useEffect(() => {
        const ImageData = ImageApi.allImages(page);
        ImageData
            .then((imageRes) => {
                setIamge(imageRes)
            })
    }, [])

    if (window.addEventListener) {
        window.addEventListener('scroll', scroll)
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scroll);
    }

    function scroll(ev) {
        var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        if (!st) {
            console.log('top');
        } else if ((st + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
            if (page <= 100) {
                setPage(page + 10)
                const ImageData = ImageApi.allImages(page);
                ImageData
                    .then((imageRes) => {
                        setIamge(imageRes)
                    })
            }
        }
    }


    const handleFavImg = (item) => {
        const userToken = localStorage.getItem("userToken")
        const decodeUserToken = jwt.decode(userToken);
        const uniqueUsername = decodeUserToken.uniqueUsername
        var favImg = item.download_url;
        const favorite = ImageApi.favImage(favImg, uniqueUsername)
        favorite
            .then((res) => {
                if (res === "Added to favorite") {
                    alert.success("Added to favorite")
                }
            })
    }

    const handleDownload = (item) => {
        let a = document.createElement('a');
        a.href = item.url + "/download?force=true";
        a.download = 'image.png';
        a.click();
    }

    return (
        <div onScroll={scroll} className="homeContainer">
            <Navbar />
            {
                image.length ? image.map((item, key) => (
                    <div key={key} className="image-wrapper">
                        <img className="image" src={item.download_url} alt="text" />

                        <div className="redHeart">
                            <img className="add-fav" onClick={() => { handleFavImg(item) }} src={RedHeart} alt="homeimg" height="15px" width="15px" />
                        </div>
                        <Link className='download-link' download>
                            <img src={Download} onClick={() => { handleDownload(item) }} alt="fff" height="15px" width="15px" />
                        </Link>

                    </div>
                )) : null}

        </div>
    );
}


export default Home;