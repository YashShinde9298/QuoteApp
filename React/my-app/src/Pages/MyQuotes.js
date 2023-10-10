import { useEffect, useState } from "react";
import Header from "../Header";
import { MDBBtn, MDBBtnGroup } from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";

function MyQuotes() {
    const [myQuotes, setMyQuotes] = useState([]);
    var id = window.sessionStorage.getItem("user_id");
    console.log(id);
    const [quote, setQuote] = useState({ text: "", author: "", user_id: id });
    const [btndisable, setBtnDisable] = useState(false);


    useEffect(() => {
        select();
    }, [])

    const OnTextChange = (args) => {
        debugger;
        var copyOfQuote = { ...quote };
        copyOfQuote[args.target.name] = args.target.value;
        setQuote(copyOfQuote);
    }

    const select = () => {
        var server = new XMLHttpRequest();
        debugger;
        server.onreadystatechange = () => {
            if (server.readyState == 4 && server.status == 200) {
                setMyQuotes(JSON.parse(server.responseText));
            }
        }
        server.open("GET", "http://127.0.0.1:9999/myquotes/" + id);
        server.send();
    }

    const edit = (quote_id) => {
        myQuotes.map((quoteToEdit) => {
            if (quoteToEdit.quote_id == quote_id) {
                var copyOfQuoteToEdit = { ...quoteToEdit };
                setQuote(copyOfQuoteToEdit);
                setBtnDisable(true);
                return;
            }
        })
    }

    const update = () => {
        var server = new XMLHttpRequest();
        server.onreadystatechange = () => {
            if (server.readyState == 4 && server.status == 200) {
                var responseReceived = JSON.parse(server.responseText);
                if (responseReceived.affectedRows != undefined && responseReceived.affectedRows > 0) {
                    toast.warning("Quote Updated");
                    select();
                    setQuote({ text: "", author: "" })
                    setBtnDisable(false);
                }
            }
        }
        server.open("PUT", "http://127.0.0.1:9999/myquotes/" + quote.quote_id);
        server.setRequestHeader("Content-Type", "application/json");
        server.send(JSON.stringify(quote));
    }

    const deleteQuote = (quote_id) => {
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            if (helper.readyState == 3 && helper.status == 200) {
                var responseReceived = JSON.parse(helper.responseText);
                if (responseReceived.affectedRows != undefined && responseReceived.affectedRows > 0) {
                    toast.error("Quote Deleted");
                    select();
                }
            }
        }
        helper.open("DELETE", "http://127.0.0.1:9999/myquotes/" + quote_id);
        helper.send()
    }

    const insert = () => {
        var server = new XMLHttpRequest();
        debugger;
        server.onreadystatechange = () => {
            debugger;
            if (server.readyState == 4 && server.status == 200) {
                var responseReceived = JSON.parse(server.responseText);
                setMyQuotes(responseReceived);
                if (responseReceived.affectedRows > 0) {
                    select();
                    setQuote({ text: "", author: "", user_id: id })
                }
            }
        }
        server.open("POST", "http://127.0.0.1:9999/myquotes/" + id);
        server.setRequestHeader("Content-Type", "application/json");
        server.send(JSON.stringify(quote));
    }

    return (<>
        <Header />
        <center>
            <div>
                <div className='form-group'>
                    <input type="text" name="text" placeholder="Enter Quote" className="form-control m-3 w-50" value={quote.text} onChange={OnTextChange}></input>
                </div>
                <div className='form-group'>
                    <input type="text" name="author" placeholder="Enter Author" className="form-control m-3 w-50" value={quote.author} onChange={OnTextChange}></input>
                </div>
                <MDBBtnGroup aria-label='Basic example' className="m-2">
                    <MDBBtn onClick={insert} color="success" disabled={btndisable == true}>Add Quote</MDBBtn>
                    <MDBBtn onClick={update} color='warning' disabled={btndisable == false}>Update Quote</MDBBtn>
                </MDBBtnGroup>
            </div>
        </center>

        <div className="table-responsive m-2">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Quotes</th>
                        <th>Author</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myQuotes.map((quote) => {
                            if (quote.user_id == id) {
                                debugger;
                                return (<tr key={quote.quote_id}>
                                    <td>{quote.quote_id}</td>
                                    <td>{quote.text}</td>
                                    <td>{quote.author}</td>
                                    <td><MDBBtn onClick={() => { edit(quote.quote_id) }} color='info'>Edit</MDBBtn></td>
                                    <td><MDBBtn onClick={() => { deleteQuote(quote.quote_id) }} color='danger'>Delete</MDBBtn></td>
                                </tr>)
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
        <ToastContainer position='top-center' />

    </>);
}

export default MyQuotes;