import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
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

    const addToFav = (quote_id) => {
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
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen overflow-auto">
            <Header />
            <div className="flex flex-row p-3">
                <div className="grid grid-cols-3 gap-4 ">
                    {quotes.map((quote) => {
                        return (
                            <div key={quote.quote_id} className="transition delay-150 border-1 rounded-xl p-3 shadow-xl hover:scale-105 duration-500 bg-white ">
                                <h2 className="text-2xl">{quote.text}</h2>
                                <h5 className="text-gray-400">- {quote.author}</h5>
                                <button onClick={() => { addToFav(quote.quote_id) }} disabled={quote.user_id == id} className="bg-indigo-500 text-white h-7 w-36 text-sm rounded-lg hover:bg-indigo-700">Add to Favourites</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </>);
}

export default Quotes;