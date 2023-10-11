import { useEffect, useState } from "react";
import Header from "../Header";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBTypography } from "mdb-react-ui-kit";

function FavouriteQuotes() {

    const [fav, setFav] = useState([]);
    var id = window.sessionStorage.getItem("user_id");


    useEffect(() => {
        favouriteQuotes();
    }, [])

    const favouriteQuotes = () => {
        var server = new XMLHttpRequest();
        server.onreadystatechange = () => {
            if (server.readyState === 4 && server.status === 200) {
                var responseText = JSON.parse(server.responseText);
                setFav(responseText);
            }
        }
        server.open("GET", "http://127.0.0.1:9999/favourite/" + id);
        server.send();
    }

    const removeFromFav = (quote_id) => {
        var server = new XMLHttpRequest();
        server.onreadystatechange = () => {
            if (server.readyState === 4 && server.status === 200) {
                var responseText = JSON.parse(server.responseText);
                if (responseText.affectedRows > 0) {
                    favouriteQuotes();
                }
            }
        }
        server.open("DELETE", "http://127.0.0.1:9999/favourite/" + quote_id + "/" + id);
        server.send();
    }

    return (<>
        <Header />
        <div className="flex flex-row h-full m-3">
            <div className="grid grid-cols-3 gap-4">
                {fav.map((quote) => {
                    return (
                        <div className="border-1 rounded-xl p-3 shadow-xl">
                            <h2 className="text-2xl">{quote.text}</h2>
                            <h5 className="text-gray-400">- {quote.author}</h5>
                            <button onClick={() => { removeFromFav(quote.quote_id) }} className="bg-indigo-500 text-white h-7 w-24 text-sm rounded-lg hover:bg-indigo-700">Remove</button>
                        </div>
                    )
                })}
            </div>
        </div>
    </>);
}

export default FavouriteQuotes;