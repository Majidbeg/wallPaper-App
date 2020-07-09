import React, { useEffect, useState } from 'react';
// import './favorite.css'
import Navbar from "../navbar/navbar"
import jwt from 'jsonwebtoken';
import ImageApi from '../../utills/API/allImagesApi'



export function Home(props) {

    const [favImages, setFavImg] = useState({})

    useEffect(() => {
        const userToken = localStorage.getItem("userToken")
        const decodeUserToken = jwt.decode(userToken);
        const uniqueUsername = decodeUserToken.uniqueUsername
        const getFavImg = ImageApi.getFavoriteImage(uniqueUsername)
        getFavImg
            .then((res) => {
                const result = [];
                const flags = [];

                for (let i = 0; i < res.length; i++) {
                    if (flags[res[i].downloadUrl]) continue;
                    result.push(res[i]);
                    flags[res[i].downloadUrl] = true;
                }

                setFavImg(result)
            })
    }, [])

    return (
        <div className="home-container">
            <Navbar />
            {
                favImages.length ? favImages.map((item, key) => (
                    <div key={key} className="image-wrapper">
                        <img className="image" src={item.downloadUrl} alt="text" />
                    </div>
                )) :
                    (
                        <div className="fav-text">
                            No Image added yet to favorite
                        </div>
                    )
            }
        </div>
    );
}


export default Home;