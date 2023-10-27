import Header from "../Header";

function NotFound() {
    return (<>
        <Header />
        <div className="grid place-items-center place-content-center mt-11">
            <img src={"../../img/404NotFound.jpg"} alt="404 Not Found" />
        </div>
    </>);
}

export default NotFound;