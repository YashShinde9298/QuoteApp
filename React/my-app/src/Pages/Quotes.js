import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import Header from "../Header";

function Quotes() {
    const history = useHistory();

    const [quotes, setQuotes] = useState([]);
    var id = window.sessionStorage.getItem("user_id");

    useEffect(() => {
        allQuotes();
    }, [])

    const allQuotes = () => {
        var server = new XMLHttpRequest();
        server.onreadystatechange = () => {
            if (server.readyState === 4 && server.status === 200) {
                setQuotes(JSON.parse(server.responseText));
                history.push("/home");
            }
        }
        server.open("GET", "http://127.0.0.1:9999/quotes");
        server.send();
    }

    const addToFav = (quote_id, user_id) => {
        var server = new XMLHttpRequest();
        server.onreadystatechange = () => {
            if (server.readyState === 4 && server.status === 200) {
                var responseText = JSON.parse(server.responseText);
                if (responseText.affectedRows > 0) {
                }
            }
        }
        server.open("POST", "http://127.0.0.1:9999/favourite/" + quote_id + "/" + id);
        server.send();
    }



    return (<>
        <Header />
        {quotes.map((quote) => {
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
                            <MDBBtn onClick={() => { addToFav(quote.quote_id) }} disabled={quote.user_id == id}>Add To Favourites</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </center>
            )
        }
        )}
    </>);
}

export default Quotes;