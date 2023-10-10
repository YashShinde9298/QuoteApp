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
        {fav.map((quote) => {
            return (
                <center>
                    <MDBCard className="m-3 w-50" key={quote.quote_id}>
                        <MDBCardHeader>{quote.quote_id}</MDBCardHeader>
                        <MDBCardBody>
                            <MDBTypography blockquote className='mb-0'>
                                <p>{quote.text}</p>
                                <footer className='blockquote-footer'>
                                    {quote.author}
                                </footer>
                            </MDBTypography>
                            <MDBBtn onClick={() => { removeFromFav(quote.quote_id) }}>Remove</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </center>
            )
        }
        )}
    </>);
}

export default FavouriteQuotes;