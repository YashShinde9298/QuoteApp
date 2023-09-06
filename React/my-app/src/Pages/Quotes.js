import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Header from "../Header";

function Quotes() {
    const history = useHistory();

    const [quotes, setQuotes] = useState([]);
    var id = window.sessionStorage.getItem("user_id");

    useEffect(() => {
        var server = new XMLHttpRequest();
        server.onreadystatechange = () => {
            if (server.readyState === 4 && server.status === 200) {
                setQuotes(JSON.parse(server.responseText));
                history.push("/home");
            }
        }
        server.open("GET", "http://127.0.0.1:9999/quotes");
        server.send();
    }, [])

    return (<>
        <Header />
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Quotes</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        quotes.map((quote) => {
                            return <tr key={quote.quote_id}>
                                <td>{quote.quote_id}</td>
                                <td>{quote.text}</td>
                                <td>{quote.author}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>


    </>);
}

export default Quotes;