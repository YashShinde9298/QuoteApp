import { useEffect, useState } from "react";
import Header from "../Header";
import { ToastContainer, toast } from "react-toastify";

function MyQuotes() {
    const [myQuotes, setMyQuotes] = useState([]);
    var id = window.sessionStorage.getItem("user_id");
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
                    if (quote.text.length == "") {
                        toast.error("Quote text cannot be empty!");
                    }
                    else if (quote.author.length == "") {
                        toast.error("Author cannot be empty!");
                    }
                    else {
                        select();
                        setQuote({ text: "", author: "" })
                        setBtnDisable(false);
                    }
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
                if (responseReceived.affectedRows > 0) {
                    if (quote.text.length == "") {
                        toast.error("Quote text cannot be empty!")
                    }
                    else if (quote.author.length == "") {
                        toast.error("Author cannot be empty!");
                    }
                    else {
                        setMyQuotes(responseReceived);
                        select();
                        setQuote({ text: "", author: "", user_id: id })
                    }
                }
            }
        }
        server.open("POST", "http://127.0.0.1:9999/myquotes/" + id);
        server.setRequestHeader("Content-Type", "application/json");
        server.send(JSON.stringify(quote));
    }

    return (<>
        <Header />
        <div>
            <div className="grid items-center justify-center gap-4 pt-5">
                <div>
                    <input type="text" name="text" placeholder="Enter Quote" value={quote.text} onChange={OnTextChange} className="outline-none ps-2 w-[30rem] h-9 rounded-lg bg-gray-200" />
                </div>
                <div>
                    <input type="text" name="author" placeholder="Enter Author Name" value={quote.author} onChange={OnTextChange} className="outline-none ps-2 w-[30rem] h-9 rounded-lg bg-gray-200" />
                </div>
                <div className="flex items-center justify-center gap-5">
                    <button className="h-9 w-32 rounded-xl bg-green-500 text-white hover:bg-green-600" onClick={insert} disabled={btndisable == true}>Add Data</button>
                    <button className="h-9 w-32 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600" onClick={update} disabled={btndisable == false}>Update Data</button>
                </div>
            </div>

            <div className="grid pt-4">
                <table className="table-auto border-collapse border w-full border-slate-500">
                    <thead>
                        <tr className="h-12 text-center">
                            <th className="border border-slate-600">Quote Id</th>
                            <th className="border border-slate-600">Quotes</th>
                            <th className="border border-slate-600">Author</th>
                            <th colSpan={2} className="border border-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myQuotes.map((quote) => {
                                if (quote.user_id == id) {
                                    debugger;
                                    return (<tr key={quote.quote_id} className="h-12">
                                        <td className="border border-slate-600 ps-2 text-center">{quote.quote_id}</td>
                                        <td className="border border-slate-600 ps-2">{quote.text}</td>
                                        <td className="border border-slate-600 ps-2">{quote.author}</td>
                                        <td className="border border-slate-600  text-center">
                                            <button className="h-9 w-24 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600" onClick={() => { edit(quote.quote_id) }}>Edit</button>
                                        </td>
                                        <td className="border border-slate-600 text-center">
                                            <button className="h-9 w-24 rounded-xl bg-red-600 text-white hover:bg-red-700" onClick={() => { deleteQuote(quote.quote_id) }}>Delete</button>
                                        </td>
                                    </tr>)
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <ToastContainer />
    </>);
}

export default MyQuotes;